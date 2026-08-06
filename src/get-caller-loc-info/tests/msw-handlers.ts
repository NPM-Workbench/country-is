/* node modules */
import { http, HttpResponse, HttpHandler } from 'msw';
import { API_ROOT } from '../../shared/index.js';

/* mock: 200-ok: get-caller-loc-info */
const getCallerLocInfoHandler: HttpHandler = http.get(
  `${API_ROOT}`,
  ({ request }) => {
    const url = new URL(request.url);
    const qParams = url.searchParams.get('fields');

    if (qParams !== 'default') {
      const split = qParams?.split(',') ?? [];
      const composedRes = split.reduce(
        (acc, field) => {
          acc = {
            ...acc,
            [field]: `mocked-${field}`,
          };
          return acc;
        },
        { ip: '1.1.1.1', country: 'AB' },
      );
      return HttpResponse.json(composedRes);
    } else {
      return HttpResponse.json({ ip: '1.1.1.1', country: 'AB' });
    }
  },
);

/* mock: 400-err: get-caller-loc-info */
const getCallerLocInfoHandlerErr: HttpHandler = http.get(`${API_ROOT}`, () => {
  return HttpResponse.json({}, { status: 400 });
});

/* exports */
export { getCallerLocInfoHandler, getCallerLocInfoHandlerErr };
