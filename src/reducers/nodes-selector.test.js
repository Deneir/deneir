import {findNeighbourNodes} from './nodes-selector';

describe('nodes-selector', () => {
  describe('findNeighbourNodes', () => {


    const allNodes = {
      'test': {
        'dependencies':[{'id':'lol'}],
        'dependents': [{'id': 'oui'}],
        'id': 'test',
      },
      'oui':{
        'dependencies':[{'id':'test'}],
        'dependents': [{'id': 'non'}],
        'id': 'oui',
      },
      'non': {
        'dependencies':[{'id': 'oui'}],
        'dependents': [{'id': 'lol'}],
        'id': 'non',
      },
      'lol':{
        'dependencies':[{'id': 'non'}],
        'dependents': [{'id': 'test'}],
        'id': 'lol',
      }
    };

    it('should return just the base nodes if neighbourLevel is 0', () => {
      expect(findNeighbourNodes(allNodes, ['test'],0)).toEqual(['test']);
    }); 

    it('should return the base nodes and the first level neighbours if neighbourLevel is 1', () => {
      expect(findNeighbourNodes(allNodes, ['test'],1)).toEqual(['test', 'lol','oui']);
    }); 

    it('should return the base nodes, the first and the second level neighbours if neighbourLevel is 2', () => {
      expect(findNeighbourNodes(allNodes, ['test'],2)).toEqual(['test', 'lol', 'non','oui']);
    }); 

    it('should return all nodes under 2 levels with starting nodes neighbours', () => {
      const baseGraph= {
        'A': {
          'id': "A",
            'dependencies': [],
            'dependents': [{
              'id': 'B',
              }, {
                'id': 'C'
              }]
        },
        'B': {
          'id':'B',
          'dependencies': [{
            'id': 'A'
          }],
          'dependents': [],
        },
        'C':{
          'id': 'C',
          'dependencies': [
            {
              'id': 'A'
            }
          ],
          'dependents': [
            {
              'id': 'D'
            }
          ]
        },
        'D':{
          'id': 'D',
          'dependencies':[{
            'id':'E'
          }],
          'dependents': [{
            'id':'C'
          }]
        },
        'E':{
          'id': 'E',
          'dependencies':[{
            'id':'D'
          }],
          'dependents': [{
            'id':'F'
          }]
        },
        'F': {
          'id': 'F',
          'dependencies':[{
            'id':'E'
          }],
          'dependents': []
        },
        'G': {
          'id': 'G',
          'dependencies':[{
            'id':'F'
          }],
          'dependents': []
        }

      }

      expect(findNeighbourNodes(baseGraph, ['A','D'], 2)).toEqual(['A','B','C','D','E', 'F'])
    });

    it('should return all nodes under levels 2 with 2 different entry points', ()=> {
      const baseGraph = {
        'A':{
          'id': 'A',
          'dependencies':[],
          'dependents': [
            {'id': 'B'}
          ]
        },
        'B':{
          'id': 'B',
          'dependencies':[{
            'id': 'A'
          }],
          'dependents': [
            {'id': 'D'}
          ]
        },
        'C':{
          'id': 'C',
          'dependencies':[],
          'dependents': [
            {'id': 'D'}
          ]
        },
        'D':{
          'id': 'D',
          'dependencies':[{
            'id':'B'
          },{
            'id':'C'
          }],
          'dependents': [
            {'id': 'E'}
          ]
        },
        'E':{
          'id': 'E',
          'dependencies':[{'id':'D'}],
          'dependents': [
          ]
        },
      };

      expect(findNeighbourNodes( baseGraph, ['A','C'],2)).toEqual(['A','B','D','C','E'])
    })
  })
})