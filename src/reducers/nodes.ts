import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { Node } from "../types/Node";
import { RootState } from "../store/configureStore";
import fetch from "cross-fetch";
import { Block } from "../types/Block";

export interface NodesState {
  list: Node[];
}

export interface OriginalNode {
  id: string;
  attributes: {
    index: number;
    data: string;
  };
}

export const checkNodeStatus = createAsyncThunk(
  "nodes/checkNodeStatus",
  async (node: Node) => {
    const response = await fetch(`${node.url}/api/v1/status`);
    const data: { node_name: string } = await response.json();
    return data;
  }
);

export const checkNodesStatus = createAsyncThunk(
  "nodes/checkNodesStatus",
  async (nodes: Node[], thunkAPI) => {
    const { dispatch } = thunkAPI;
    nodes.forEach((node) => {
      dispatch(checkNodeStatus(node));
    });
  }
);

export const loadBlocks = createAsyncThunk(
  "nodes/loadBlocks",
  async (node: Node) => {
    const response = await fetch(`${node.url}/api/v1/blocks`);
    let data = await response.json();
    const blocks = [] as Block[];
    if (data.data) {
      data = data.data;
      data.forEach((originalNode: OriginalNode) => {
        const block = {
          id: originalNode.id,
          nodeUrl: node.url,
          index: originalNode.attributes.index,
          data: originalNode.attributes.data,
        } as Block;
        blocks.push(block);
      });
    }
    return blocks;
  }
);

export const checkLoadBlocks = createAsyncThunk(
  "nodes/checkLoadBlocks",
  async (nodes: Node[], thunkAPI) => {
    const { dispatch } = thunkAPI;
    nodes.forEach((node) => {
      if (node.expanded) {
        dispatch(loadBlocks(node));
      }
    });
  }
);

export const nodesSlice = createSlice({
  name: "nodes",
  initialState: initialState().nodes as NodesState,
  reducers: {
    setExpanded(state, action) {
      const nodes = state.list;
      nodes.map((node) => {
        //Set as parameter
        if (node.url === action.payload.url) {
          node.expanded = action.payload.expanded;
        } else {
          node.expanded = false;
        }
        return node;
      });
    },
  },
  extraReducers: (builder) => {
    //checkNodeStatus
    builder.addCase(checkNodeStatus.pending, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) node.loading = true;
    });
    builder.addCase(checkNodeStatus.fulfilled, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        node.online = true;
        node.loading = false;
        node.name = action.payload.node_name;
      }
    });
    builder.addCase(checkNodeStatus.rejected, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        node.online = false;
        node.loading = false;
      }
    });
    //loadBlocks
    builder.addCase(loadBlocks.pending, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        //node.blocks = [];
        node.loadingBlocks = true;
        node.loadingBlocksError = false;
      }
    });
    builder.addCase(loadBlocks.fulfilled, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        node.blocks = action.payload;
        node.loadingBlocks = false;
        node.loadingBlocksError = false;
      }
    });
    builder.addCase(loadBlocks.rejected, (state, action) => {
      const node = state.list.find((n) => n.url === action.meta.arg.url);
      if (node) {
        node.blocks = [];
        node.loadingBlocks = false;
        node.loadingBlocksError = true;
      }
    });
  },
});

export const nodesActions = nodesSlice.actions;
export const selectNodes = (state: RootState) => state.nodes.list;
export default nodesSlice.reducer;
