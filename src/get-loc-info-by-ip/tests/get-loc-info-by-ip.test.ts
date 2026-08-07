/* node modules */
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';

/* app imports */
import createMSWMockServer from '../../shared/msw-mock-server.js';
import { getLocInfoByIP } from '../index.js';
import {
  getLocInfoByIPHandler,
  getLocInfoByIPHandlerErr,
} from './msw-handlers.js';

/* suite */
describe('Get Loc Info By IP', () => {
  let fetchSpy: jest.SpiedFunction<typeof global.fetch> | undefined;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  /* life-cycle */
  beforeAll(() => {
    mswServer = createMSWMockServer([getLocInfoByIPHandler]);
    mswServer.listen();
  });
  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy?.mockRestore();
  });
  afterAll(() => mswServer.close());

  /* 1 */
  test("returns 200-OK response when fields = 'default'", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, 'fetch');
    const result = await getLocInfoByIP({ ip: '1.1.1.1', fields: 'default' });

    expect(result).toEqual({
      code: 'api-ok',
      message: 'Success. Check Payload.',
      payload: { ip: '1.1.1.1', country: 'AB' },
    });
  });

  /* 2 */
  test('returns 200-OK response when fields is an array', async () => {
    const result = await getLocInfoByIP({
      ip: '1.1.1.1',
      fields: ['continent', 'asn'],
    });

    expect(result).toEqual({
      code: 'api-ok',
      message: 'Success. Check Payload.',
      payload: {
        ip: '1.1.1.1',
        country: 'AB',
        continent: 'mocked-continent',
        asn: 'mocked-asn',
      },
    });
  });

  /* 3 */
  test('throws an error when the ip address is empty', async () => {
    fetchSpy = jest.spyOn(global, 'fetch');
    await expect(getLocInfoByIP({ ip: '', fields: 'default' })).rejects.toThrow(
      "[Bad Req]: Get Loc Info By IP - Mandatory 'ip' field needs to have IPv4 or IPv6 address details",
    );
  });

  /* 4 */
  test('sends the expected GET request for a specific IP', async () => {
    fetchSpy = jest.spyOn(global, 'fetch');
    await getLocInfoByIP({ ip: '1.1.1.1', fields: 'default' });

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/1.1.1.1'),
      expect.objectContaining({ method: 'GET' }),
    );
  });

  /* 5 */
  test('returns an error response for a non-ok HTTP response', async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, 'fetch');
    mswServer.use(getLocInfoByIPHandlerErr);
    const result = await getLocInfoByIP({ ip: '1.1.1.1', fields: 'default' });

    expect(result).toEqual({
      code: 'api-fail',
      message: 'Something Went Wrong.',
      payload: null,
    });
  });
});
