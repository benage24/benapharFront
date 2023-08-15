import { StatusResponse } from "./status-response";

export class HttpDataResponse<T> {
  status: StatusResponse = new StatusResponse();
  response: T | undefined;
}
