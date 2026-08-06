/* node modules */
import { http, HttpResponse, HttpHandler } from 'msw';
import { API_ROOT } from '../../shared/index.js';

/* mock: 200-ok: get-caller-loc-info */
const getLocInfoByIPHandler: HttpHandler = http.get<{ ip: string }>(
  `${API_ROOT}/:ip`,
  ({ request, params }) => {
    const { ip } = params;
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
        { ip, country: 'AB' },
      );
      return HttpResponse.json(composedRes);
    } else {
      return HttpResponse.json({ ip, country: 'AB' });
    }
  },
);

/* mock: 400-err: get-caller-loc-info */
const getLocInfoByIPHandlerErr: HttpHandler = http.get<{ ip: string }>(
  `${API_ROOT}/:ip`,
  () => {
    return HttpResponse.json({}, { status: 400 });
  },
);

/* exports */
export { getLocInfoByIPHandler, getLocInfoByIPHandlerErr };
