import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { environment } from "../environments/environment";
import {Observable, Subject} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  tokenUrl = 'https://accounts.spotify.com/api/token';
  searchUrl = 'https://api.spotify.com/v1/search';
  token = '';
  constructor(private httpClient: HttpClient) {
  }

  authenticate(): Observable<SpotifyTokenResponse> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic ' + btoa(`${environment.client_id}:${environment.client_secret}`))
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Accept', 'application/json')
    return this.httpClient.post<SpotifyTokenResponse>(`${this.tokenUrl}`,'grant_type=client_credentials', { headers } ).pipe(tap(res => {
      this.token = res.access_token;
    }))
  }

  searchMusic(input: string): Observable<any> {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.token}`)
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Accept', 'application/json')
    const params = new HttpParams()
      .append('q', input)
      .append('type', 'artist')
    return this.httpClient.get<any>(`${this.searchUrl}`, { headers, params } )
  }
}

export interface SpotifyTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}
