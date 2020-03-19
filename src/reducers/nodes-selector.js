export function getFilteredNodes({ nodes, filters }) {
  if (!Object.keys(filters).length) {
    return nodes;
  }

  return Object.values(nodes).reduce((filteredNodes, node) => {
    /* eslint-disable no-restricted-syntax */
    for (const filter in filters) {
      if (!filters[filter].includes(node.tags[filter])) {
        return filteredNodes;
      }
    }

    return { ...filteredNodes, [node.id]: node };
  }, {});
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
  return Object.values(nodeDictionary).reduce((nodes, node) => {
    const tagValue = node.tags[tagId];

    if (nodes[tagValue]) {
      return nodes;
    }

    return {
      ...nodes,
      [tagValue]: {
        id: tagValue,
        group: true,
        type: 'group',
        dependents: [],
        dependencies: [],
      },
    };
  }, {});
}
