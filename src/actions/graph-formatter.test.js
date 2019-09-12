import graphFormatter from './graph-formatter';

describe('graphFormatter', () => {
  it('should return nodes and links', () => {
    const graphData = [
      {
        nodes: [
          {
            id: 'biniou-zelastic',
            type: 'elasticsearch',
            status: 0,
            tags: {},
          },
          {
            id: 'saiyajin',
            type: 'service',
            status: 0,
            tags: {},
          },
        ],
        edges: [
          {
            source: 'falafel',
            target: 'consul',
            type: '',
          },
          {
            source: 'saiyajin',
            target: 'biniou-zelastic',
            type: '',
          },
        ],
      },
    ];

    const expected = [{
      edges: [{
        source: 'falafel',
        target: 'consul',
        type: '',
      }, {
        source: 'saiyajin',
        target: 'biniou-zelastic',
        type: '',
      }],
      nodes: [{
        id: 'biniou-zelastic',
        status: 0,
        tags: {},
        type: 'elasticsearch',
      }, {
        id: 'saiyajin',
        status: 0,
        tags: {},
        type: 'service',
      }],
    }];

    expect(graphFormatter(graphData)).toEqual(expected);
  });
});
