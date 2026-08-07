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
import { getCallerLocInfo } from '../index.js';
import {
  getCallerLocInfoHandler,
  getCallerLocInfoHandlerErr,
} from './msw-handlers.js';

/* suite */
describe('Get Caller Loc Info', () => {
  let fetchSpy: jest.SpiedFunction<typeof global.fetch> | undefined;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  /* life-cycle */
  beforeAll(() => {
    mswServer = createMSWMockServer([getCallerLocInfoHandler]);
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
    const result = await getCallerLocInfo({ fields: 'default' });

    expect(result).toEqual({
      code: 'api-ok',
      message: 'Success. Check Payload.',
      payload: { ip: '1.1.1.1', country: 'AB' },
    });
  });

  /* 2 */
  test('returns 200-OK response when fields is an array', async () => {
    const result = await getCallerLocInfo({ fields: ['continent', 'asn'] });

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
  test('throws an error when fields is an invalid string', async () => {
    fetchSpy = jest.spyOn(global, 'fetch');

    await expect(
      getCallerLocInfo({ fields: 'invalid' as any }),
    ).rejects.toThrow(
      "[Bad Req]: Get Caller Loc Info - Needs to be either 'default' or array[] of acceptable fields",
    );
  });

  /* 4 */
  test('sends the expected GET request for caller location info', async () => {
    fetchSpy = jest.spyOn(global, 'fetch');
    await getCallerLocInfo({ fields: 'default' });

    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/'),
      expect.objectContaining({ method: 'GET' }),
    );
  });

  /* 5 */
  test('returns an error response for a non-ok HTTP response', async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, 'fetch');
    mswServer.use(getCallerLocInfoHandlerErr);
    const result = await getCallerLocInfo({ fields: 'default' });

    expect(result).toEqual({
      code: 'api-fail',
      message: 'Something Went Wrong.',
      payload: null,
    });
  });
});
