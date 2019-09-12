import nodeConfig from './node-config';
import { getConfig } from '../../../services/read-config';

jest.mock('../../../services/read-config', () => ({
  getConfig: jest.fn().mockImplementation(() => [{
    name: 'http',
    shape: 'square',
    color: 'orange',
  }]),
}));

describe('nodeConfig', () => {
  it('should return the matching color', () => {
    const types = getConfig('types');
    const { color } = nodeConfig(types, 'http');
    expect(color).toEqual('orange');
  });
});
