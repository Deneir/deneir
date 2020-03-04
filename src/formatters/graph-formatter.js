export default function graphFormatter(nodeDictionary) {
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
    .map((node) => node.dependents.map((dependent) => ({
      source: node.id,
      target: dependent.id,
      type: dependent.type,
    })))
    .flat();

  return { nodes, links };
}
