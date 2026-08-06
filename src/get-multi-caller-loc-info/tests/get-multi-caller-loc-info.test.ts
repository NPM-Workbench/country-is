/* node modules */
import { jest, test } from '@jest/globals';

/* app imports */
import createMSWMockServer from '../../shared/msw-mock-server.js';
import { getMultiCallerLocInfo } from '../index.js';
import {
  getMultiCallerLocInfoHandler,
  getMultiCallerLocInfoHandlerErr,
} from './msw-handlers.js';

describe('Get Loc Info By IP', () => {
  let fetchSpy: jest.SpiedFunction<typeof global.fetch>;
  let mswServer: ReturnType<typeof createMSWMockServer>;

  /* life-cycle */
  beforeAll(() => {
    mswServer = createMSWMockServer([getMultiCallerLocInfoHandler]);
    mswServer.listen();
  });
  afterEach(() => {
    mswServer.resetHandlers();
    fetchSpy.mockRestore();
  });
  afterAll(() => mswServer.close());

  /* 1 */
  test("returns 200-OK response when fields = 'default'", async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, 'fetch');
    const result = await getMultiCallerLocInfo({
      ips: ['1.1.1.1', '2.2.2.2'],
      fields: 'default',
    });

    expect(result).toEqual({
      code: 'api-ok',
      message: 'Success. Check Payload.',
      payload: [
        { ip: '1.1.1.1', country: 'mock-country' },
        { ip: '2.2.2.2', country: 'mock-country' },
      ],
    });
  });

  /* 2 */
  test('returns 200-OK response when fields is an array', async () => {
    const result = await getMultiCallerLocInfo({
      ips: ['1.1.1.1', '2.2.2.2'],
      fields: ['continent', 'asn'],
    });

    expect(result).toEqual({
      code: 'api-ok',
      message: 'Success. Check Payload.',
      payload: [
        {
          ip: '1.1.1.1',
          country: 'mock-country',
          continent: 'mocked-continent',
          asn: 'mocked-asn',
        },
        {
          ip: '2.2.2.2',
          country: 'mock-country',
          continent: 'mocked-continent',
          asn: 'mocked-asn',
        },
      ],
    });
  });

  /* 3 */
  test('returns an error response for a non-ok HTTP response', async () => {
    /* setup */
    fetchSpy = jest.spyOn(global, 'fetch');
    mswServer.use(getMultiCallerLocInfoHandlerErr);
    const result = await getMultiCallerLocInfo({
      ips: ['1.1.1.1', '2.2.2.2'],
      fields: 'default',
    });

    expect(result).toEqual({
      code: 'api-fail',
      message: 'Something Went Wrong.',
      payload: null,
    });
  });
});
