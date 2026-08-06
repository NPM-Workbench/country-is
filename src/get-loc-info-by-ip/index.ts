/* app imports */
import { API_ROOT } from '../shared/index.js';
import type { TAPIRes, TFields } from '../types/index.js';

/* types */
type TGetLocInfoByIPRes = TAPIRes & {
  payload: null | Record<string, any>;
};
type TInput = { ip: string; fields: 'default' | TFields[] };
type TOutput = TGetLocInfoByIPRes;

/* module */
async function getLocInfoByIP(props: TInput): Promise<TOutput> {
  /* props - destruct */
  const { ip, fields } = props;

  if (ip.length <= 0) {
    throw new Error(
      "[Bad Req]: Get Loc Info By IP - Mandatory 'ip' field needs to have IPv4 or IPv6 address details",
    );
  } else {
    /* setup */
    let API_URL = `${API_ROOT}/${ip}`;

    if (typeof fields === 'string' && fields !== 'default') {
      throw new Error(
        "[Bad Req]: Get Loc Info By IP - Needs to be either 'default' or array[] of acceptable fields",
      );
    } else {
      /* check and add query param */
      if (typeof fields !== 'string' && fields.length > 0) {
        let qParam = `fields=${fields.join(',')}`;
        API_URL = `${API_URL}?${qParam}`;
      }

      try {
        /* fetch */
        const response = await fetch(API_URL, { method: 'GET' });

        if (!response.ok) {
          return {
            code: 'api-fail',
            message: 'Something Went Wrong.',
            payload: null,
          };
        } else {
          const data = await response.json();
          return {
            code: 'api-ok',
            message: 'Success. Check Payload.',
            payload: data,
          };
        }
      } catch (error) {
        console.error(error);
        return {
          code: 'api-fail',
          message: 'Something Went Wrong.',
          payload: null,
        };
      }
    }
  }
}

/* exports */
export type { TGetLocInfoByIPRes };
export { getLocInfoByIP };
