/* app imports */
import { API_ROOT } from "../shared/index.js";
import type { TAPIRes, TFields } from "../types/index.js";

/* types */
type TGetMultiCallerLocInfoRes = TAPIRes & {
  payload: null | Record<string, any>[]
};
type TInput = { ips: string[], fields: "default" | TFields[] };
type TOutput = TGetMultiCallerLocInfoRes;

/* module */
async function getMultiCallerLocInfo(props: TInput): Promise<TOutput> {
  /* props - destruct */
  const { ips, fields } = props;
  /* setup */
  let API_URL = API_ROOT;

  if (ips.length <= 0) {
    throw new Error("[Bad Req]: Get Multi Caller Loc Info - IPs array cannot be empty");
  } else {
    if (typeof fields === "string" && fields !== "default") {
      throw new Error("[Bad Req]: Get Multi Caller Loc Info - Needs to be either 'default' or array[] of acceptable fields");
    } else {
      /* check and add query param */
      if (typeof fields !== "string" && fields .length > 0) {
        let qParam = `fields=${fields.join(",")}`;
        API_URL = `${API_URL}?${qParam}`;
      }

      try {
        /* fetch */
        const body = JSON.stringify(ips);
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body
        });

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
}

/* exports */
export type { TGetMultiCallerLocInfoRes };
export { getMultiCallerLocInfo };
