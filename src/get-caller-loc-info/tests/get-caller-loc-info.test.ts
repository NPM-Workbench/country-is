/* node modules */
import { jest } from '@jest/globals';

/* app imports */
import createMSWMockServer from '../../shared/msw-mock-server.js';
import { getCallerLocInfo } from '../index.js';
import {
  getCallerLocInfoHandler,
  getCallerLocInfoHandlerErr,
} from './msw-handlers.js';

describe('Get Caller Loc Info', () => {
  let fetchSpy: jest.SpiedFunction<typeof global.fetch>;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  /* life-cycle */
  beforeAll(() => {
    mswServer = createMSWMockServer([getCallerLocInfoHandler]);
    mswServer.listen();
  });
  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy.mockRestore();
  });
  afterAll(() => mswServer.close());

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
