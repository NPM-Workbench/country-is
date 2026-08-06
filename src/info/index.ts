/* app imports */
import { API_ROOT } from "../shared/index.js";
import type { TAPIRes } from "../types/index.js";

/* types */
type TGetCountryIsInfoRes = TAPIRes & {
  payload: null | Record<string, any>
};
type TOutput = TGetCountryIsInfoRes;

/* module */
async function getCountryIsInfo(): Promise<TOutput> {
  /* setup */
  const API_URL = `${API_ROOT}/info`;

  try {
    /* fetch */
    const response = await fetch(API_URL, {method: "GET"});

    if (!response.ok) {
      return { code: "api-fail", message: "Something Went Wrong.", payload: null};
    } else {
      const data = await response.json();
      return { code: "api-ok", message: "Success. Check Payload.", payload: data };
    }
  } catch (error) {
    console.error(error);
    return { code: "api-fail", message: "Something Went Wrong.", payload: null};
  }
}

/* exports */
export type { TGetCountryIsInfoRes };
export { getCountryIsInfo };
