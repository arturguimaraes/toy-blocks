import React, { useState, useEffect } from "react";
import { Node as NodeType } from "../types/Node";
import Node from "../components/Node";
import { Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/configureStore";
import {
  checkLoadBlocks,
  checkNodesStatus,
  nodesActions,
  selectNodes,
} from "../reducers/nodes";

export const Nodes: React.FC = () => {
  const [expandedNodeURL, setExpandedNodeURL] = useState<null | string>(null);
  const dispatch = useDispatch();
  const nodes = useAppSelector(selectNodes);

  useEffect(() => {
    dispatch(checkNodesStatus(nodes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(checkLoadBlocks(nodes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedNodeURL]);

  function toggleNodeExpanded(node: NodeType) {
    //if true, expand and load blocks
    const loadBlocks = node.url !== expandedNodeURL;
    //action to set node.expaded true
    dispatch(nodesActions.setExpanded({ url: node.url, expanded: loadBlocks }));
    //then expand
    setExpandedNodeURL(loadBlocks ? node.url : null);
  }

  return (
    <Box paddingTop={7}>
      <Typography variant="h4" component="h1">
        <strong style={{ color: "#000" }}>Nodes</strong>
      </Typography>
      {nodes.map((node) => (
        <Node
          node={node}
          key={node.url}
          expanded={node.url === expandedNodeURL}
          toggleNodeExpanded={toggleNodeExpanded}
        />
      ))}
    </Box>
  );
};

export default Nodes;
