/**
 *
 */
export function getFilteredNodes({ nodes, filters, neighbourLevel = 0 }) {
  if (!Object.keys(filters).length) {
    return nodes;
  }

  const matchedNodesIds = Object.values(nodes).reduce((filteredNodes, node) => {
    const doesNodeMatchFilters = Object.keys(filters).every((filter) => {
      if (!node.tags[filter]) {
        return false;
      }
      if (!filters[filter].some((item) => node.tags[filter].includes(item))) {
        return false;
      }
      return true;
    });

    if (!doesNodeMatchFilters) {
      return filteredNodes;
    }

    return [...filteredNodes, node.id];
  }, []);

  const neighbourNodes = findNeighbourNodes(nodes, matchedNodesIds, neighbourLevel);

  return Object.values(nodes)
    .filter((node) => neighbourNodes.includes(node.id))
    .reduce((prev, node) => {
      return { ...prev, [node.id]: node };
    }, {});
}

export function findNeighbourNodes(allNodes, nodeIds, neighbourLevel = 0) {
  const searchedNodes = {};
  function findNeighbours(nodes, depth = 0) {
    if (depth <= 0) {
      return nodes;
    }
    const neighbourNodes = nodes.reduce((prev, node) => {
      if (searchedNodes[node] && searchedNodes[node] > depth) {
        return prev;
      }
      searchedNodes[node] = depth;
      const neighbours = [
        ...allNodes[node].dependencies.map((d) => d.id),
        ...allNodes[node].dependents.map((d) => d.id),
      ];
      return [...prev, node, ...findNeighbours(neighbours, depth - 1)];
    }, []);

    return [...new Set(neighbourNodes)];
  }

  const neighbourNodes = findNeighbours(nodeIds, neighbourLevel);

  return neighbourNodes;
}

export function graphFormatter(nodeDictionary) {
  const nodes = Object.values(nodeDictionary).map((node) => {
    const {
      id, type, status, tags,
    } = node;

    return {
      id,
      type,
      status,
      tags,
    };
  });
  const links = Object.values(nodeDictionary)
    .map((node) => node.dependents.reduce((nodeLinks, dependent) => {
      if (!nodeDictionary[dependent.id]) {
        return nodeLinks;
      }
      return [
        ...nodeLinks,
        {
          source: node.id,
          target: dependent.id,
          type: dependent.type,
        },
      ];
    }, []))
    .flat();

  return { nodes, links };
}

export function getNodeDetails(nodeDictionary, nodeId) {
  const selectedNode = nodeDictionary[nodeId];
  return {
    ...selectedNode,
    dependents: selectedNode.dependents.map((link) => ({ ...link, ...nodeDictionary[link.id] })),
    dependencies: selectedNode.dependencies.map((link) => ({
      ...link,
      ...nodeDictionary[link.id],
    })),
  };
}

export function getNodesGroupedByTag(nodeDictionary, tagId) {
  if (tagId === 'node') {
    return nodeDictionary;
  }

  const nodeTagValues = Object.values(nodeDictionary).reduce((nodes, node) => {
    return nodes.concat(...node.tags[tagId]);
  }, []);
  const newNodes = [...new Set(nodeTagValues)];

  const groupNodes = newNodes.reduce((nodes, nodeId) => {
    const relatedNodes = Object.values(nodeDictionary).filter((node) => {
      return node.tags[tagId].includes(nodeId);
    });
    const status = Math.max(...relatedNodes.map((node) => node.status));
    const dependents = new Set();
    const dependencies = new Set();

    relatedNodes.forEach((node) => {
      node.dependents.forEach((dependent) => {
        if (!nodeDictionary[dependent.id]) {
          return;
        }
        nodeDictionary[dependent.id].tags[tagId].forEach((tagValue) => {
          dependents.add(tagValue);
        });
      });
      node.dependencies.forEach((dependency) => {
        if (!nodeDictionary[dependency.id]) {
          return;
        }
        nodeDictionary[dependency.id].tags[tagId].forEach((tagValue) => {
          dependencies.add(tagValue);
        });
      });
    });

    return {
      ...nodes,
      [nodeId]: {
        id: nodeId,
        group: true,
        status,
        type: 'group',
        dependents: [...dependents].map((d) => ({ id: d })),
        dependencies: [...dependencies].map((d) => ({ id: d })),
      },
    };
  }, {});

  return groupNodes;
}
