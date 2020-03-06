export function getFilteredNodes({ nodes, filters }) {
  if (!Object.keys(filters).length) {
    return nodes;
  }

  return Object.values(nodes).reduce((filteredNodes, node) => {
    for (const filter in filters) {
      if (!filters[filter].includes(node[filter])) {
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
