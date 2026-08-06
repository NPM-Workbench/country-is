/* node modules */
import { HttpHandler } from 'msw';
import { setupServer } from 'msw/node';

/* types */
type TInput = HttpHandler[];
type TOutput = ReturnType<typeof setupServer>;

/* module */
function createMSWMockServer(handlers: TInput): TOutput {
  const mockMswServer = setupServer(...handlers);
  return mockMswServer;
}

/* exports */
export default createMSWMockServer;
