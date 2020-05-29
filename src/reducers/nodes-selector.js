export function getFilteredNodes({ nodes, filters }) {
  if (!Object.keys(filters).length) {
    return nodes;
  }

  return Object.values(nodes).reduce((filteredNodes, node) => {
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
  const groupNodes = Object.values(nodeDictionary).reduce((nodes, node) => {
    const tagValue = node.tags[tagId];

    if (nodes[tagValue]) {
      return nodes;
    }

    const relatedNodes = Object.values(nodeDictionary).filter((n) => n.tags[tagId] === tagValue);
    const status = Math.max(...relatedNodes.map((n) => n.status));
    const dependents = new Set();
    const dependencies = new Set();

    relatedNodes.forEach((n) => {
      n.dependents.forEach((dependent) => {
        dependents.add(nodeDictionary[dependent.id].tags[tagId]);
      });
      n.dependencies.forEach((dependency) => {
        dependencies.add(nodeDictionary[dependency.id].tags[tagId]);
      });
    });

    return {
      ...nodes,
      [tagValue]: {
        id: tagValue,
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
