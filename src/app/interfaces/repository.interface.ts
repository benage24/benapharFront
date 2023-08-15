import { Observable } from "rxjs";

export interface IRepository<T>{
    save$(data: T, query: string | undefined): Observable<T>;
	update$(t: T, query: string | undefined): Observable<T>;
	find$(query: string | undefined): Observable<T[] | T>;
	delete$(query: string | undefined): Observable<T>;
}