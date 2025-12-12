import { Pagination } from "./pagination";

export class PaginatedResult<T> {
    pagination?: Pagination; // api's response pagintation values
    body?: T; // api's response body
}