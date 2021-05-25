import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {SpotifyService} from "../../services/spotify.service";
import {TextToSpeechService} from "../../services/text-to-speech.service";
import {SpotifyAlbum} from "../../model/spotify-album.model";
import {SpotifyArtist} from "../../model/spotify-artist.model";
import {SpotifySong} from "../../model/spotify-song.model";

@Component({
  selector: 'app-speech-search',
  templateUrl: './speech-search.component.html',
  styleUrls: ['./speech-search.component.scss']
})
export class SpeechSearchComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  private recording: boolean;
  public albumList: SpotifyAlbum[];
  public artistList: SpotifyArtist[];
  public songList: SpotifySong[];
  constructor(private spotifyService: SpotifyService, private textToSpeechService: TextToSpeechService) {
    this.textToSpeechService.init();
  }

  ngOnInit() {
  }

  searchMusic($event: string) {
    this.spotifyService.searchMusicNew($event).pipe(takeUntil(this.destroy$)).subscribe((results) => {
      this.albumList = results.albumList
      this.artistList = results.artistList
      this.songList = results.songList
    })
  }

  triggerRecord() {
    this.recording = !this.recording;
    if(this.recording) {
      this.startSpeechToText();
    } else {
      this.stopSpeechToText();
    }
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startSpeechToText(): void{
    this.textToSpeechService.start()
  }

  stopSpeechToText(): void{
    this.textToSpeechService.stop()
    this.searchMusic(this.textToSpeechService.text);
  }

}
