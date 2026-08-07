/* node modules */
import { jest } from '@jest/globals';

/* app imports */
import createMSWMockServer from '../../shared/msw-mock-server.js';
import { getCountryIsInfo } from '../index.js';
import {
  getCountryIsInfoHandler,
  getCountryIsInfoHandlerErr,
} from './msw-handlers.js';

/* suite */
describe('Get CountryIs Info', () => {
  let fetchSpy: jest.SpiedFunction<typeof global.fetch>;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  /* life-cycle */
  beforeAll(() => {
    mswServer = createMSWMockServer([getCountryIsInfoHandler]);
    mswServer.listen();
  });
  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy.mockRestore();
  });
  afterAll(() => mswServer.close());

  /* 1 */
  test('returns the payload for a successful 200 response', async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, 'fetch');
    const result = await getCountryIsInfo();

    expect(result).toEqual({
      code: 'api-ok',
      message: 'Success. Check Payload.',
      payload: {
        version: '1.1.1',
        dataSources: ['source-1', 'source-2'],
      },
    });
  });

  /* 2 */
  test('calls the info endpoint with a GET request', async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, 'fetch');
    await getCountryIsInfo();

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/info'),
      expect.objectContaining({ method: 'GET' }),
    );
  });

  /* 3 */
  test('returns a failed response payload for a non-ok response', async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, 'fetch');
    mswServer.use(getCountryIsInfoHandlerErr);
    const result = await getCountryIsInfo();

    expect(result).toEqual({
      code: 'api-fail',
      message: 'Something Went Wrong.',
      payload: null,
    });
  });
});
