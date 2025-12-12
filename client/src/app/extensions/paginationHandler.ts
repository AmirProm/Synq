import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { PaginatedResult } from "../models/helpers/paginatedResult";
import { inject } from "@angular/core";

export class PaginationHandler {
    private http = inject(HttpClient);

    /**
     * A reusable pagination method with generic type
     * @param url
     * @param params
     * @returns Observable<PaginatedResult<T>>
     */
    getPaginatedResult<T>(url: string, params: HttpParams): Observable<PaginatedResult<T>> {
        const paginatedResult = new PaginatedResult<T>();

        return this.http.get<T>(url, { observe: 'response', params })
            .pipe(
                map(response => {
                    // get the Pagination
                    const pagination: string | null = response.headers.get('Pagination');

                    if (pagination)
                        paginatedResult.pagination = JSON.parse(pagination); // api's response pagination values

                    // get the body 
                    if (response.body)
                        paginatedResult.body = response.body // api's response body

                    // return pagination + body
                    return paginatedResult;
                })
            );
    }
}
