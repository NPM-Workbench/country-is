/* imports */
import { http, HttpResponse, HttpHandler } from 'msw';
import { API_ROOT } from '../../shared/index.js';

/* mock: 200-ok: get info */
const getCountryIsInfoHandler: HttpHandler = http.get(
  `${API_ROOT}/info`,
  () => {
    return HttpResponse.json({
      version: '1.1.1',
      dataSources: ['source-1', 'source-2'],
    });
  },
);

/* mock: 400-status: get info*/
const getCountryIsInfoHandlerErr: HttpHandler = http.get(
  `${API_ROOT}/info`,
  () => {
    return HttpResponse.json({}, { status: 400 });
  },
);

/* exports */
export { getCountryIsInfoHandler, getCountryIsInfoHandlerErr };
