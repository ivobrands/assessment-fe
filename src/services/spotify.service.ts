import { environment } from "../environments/environment";
import { Observable, Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {SpotifyTokenResponse} from "../model/spotify-token-response.model";
import {SpotifyAlbum} from "../model/spotify-album.model";
import {SpotifyArtist} from "../model/spotify-artist.model";
import {SpotifySong} from "../model/spotify-song.model";

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
