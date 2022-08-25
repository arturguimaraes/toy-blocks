const initialState = () => ({
  nodes: {
    list: [
      {
        url: "https://thawing-springs-53971.herokuapp.com",
        online: false,
        name: "Node 1",
        loading: false,
        expanded: false,
        blocks: [],
        loadingBlocks: false,
        loadingBlocksError: false,
      },
      {
        url: "https://secret-lowlands-62331.herokuapp.com",
        online: false,
        name: "Node 2",
        loading: false,
        expanded: false,
        blocks: [],
        loadingBlocks: false,
        loadingBlocksError: false,
      },
      {
        url: "https://calm-anchorage-82141.herokuapp.com",
        online: false,
        name: "Node 3",
        loading: false,
        expanded: false,
        blocks: [],
        loadingBlocks: false,
        loadingBlocksError: false,
      },
      {
        url: "http://localhost:3002",
        online: false,
        name: "Node 4",
        loading: false,
        expanded: false,
        blocks: [],
        loadingBlocks: false,
        loadingBlocksError: false,
      },
    ],
  },
});
export default initialState;
