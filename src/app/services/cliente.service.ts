import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Cliente} from "../model/Cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  URL_API: string ='http://localhost:8080/api/clientes';
  constructor(private httpClient: HttpClient) { }
  getCliente(): Observable<Cliente[]>{
    return this.httpClient.get<Cliente[]>(this.URL_API).pipe(map(res => res));
  }
  saveCliente(request: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API, request).pipe(map(resp => resp));
  }
  updateCliente(request: any): Observable<any> {
    return this.httpClient.post<any>(this.URL_API , request).pipe(map(resp => resp));
  }
  deleteCliente(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.URL_API + '/' + id).pipe(map(resp => resp));
  }
}
