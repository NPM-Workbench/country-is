/* app imports */
import { API_ROOT } from "../shared/index.js";
import type { TAPIRes, TFields } from "../types/index.js";

/* types */
type TGetCallerLocInfo = TAPIRes & {
  payload: Record<string, any> | null
};
type TInput = { fields: "default" | TFields[] };
type TOutput = TGetCallerLocInfo;

/* module */
async function getCallerLocInfo(props: TInput): Promise<TOutput> {
  /* props - destruct */
  const { fields } = props;

  /* setup */
  let API_URL = API_ROOT;

  if (typeof fields === "string" && fields !== "default") {
    throw new Error("[Bad Req]: Get Caller Loc Info - Needs to be either 'default' or array[] of acceptable fields");
  } else {
    /* check and add query param */
    if (typeof fields !== "string" && fields .length > 0) {
      let qParam = `fields=${fields.join(",")}`;
      API_URL = `${API_URL}?${qParam}`;
    }

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
}

/* exports */
export type { TGetCallerLocInfo };
export { getCallerLocInfo };
