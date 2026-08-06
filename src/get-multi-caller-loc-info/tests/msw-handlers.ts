/* node modules */
import { http, HttpResponse, HttpHandler } from 'msw';
import { API_ROOT } from '../../shared/index.js';

/* mock: 200-ok: get-caller-loc-info */
const getMultiCallerLocInfoHandler: HttpHandler = http.post(
  `${API_ROOT}`,
  async ({ request }) => {
    const url = new URL(request.url);
    const qParams = url.searchParams.get('fields');
    const body = (await request.clone().json()) as string[];

    const ipRes = body?.map((ip: string) => {
      return { ip, country: 'mock-country' };
    });

    if (qParams !== 'default') {
      const split = qParams?.split(',') ?? [];
      const newIPRes = [];

      /* iterate and set mock values */
      for (let i = 0; i < ipRes.length; i++) {
        let ipObj = ipRes[i];
        for (const field of split) {
          ipObj = { ...ipObj, [field]: `mocked-${field}` };
        }
        newIPRes.push(ipObj);
      }
      return HttpResponse.json(newIPRes);
    } else {
      return HttpResponse.json(ipRes);
    }
  },
);

/* mock: 400-err: get-caller-loc-info */
const getMultiCallerLocInfoHandlerErr: HttpHandler = http.post(
  `${API_ROOT}`,
  async () => {
    return HttpResponse.json({}, { status: 400 });
  },
);

/* exports */
export { getMultiCallerLocInfoHandler, getMultiCallerLocInfoHandlerErr };
