import {Component, OnDestroy} from '@angular/core';
import {SpotifyService} from "../services/spotify.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'assessment-fe';
  destroy$ = new Subject();

  constructor(private spotifyService: SpotifyService) {
    this.spotifyService.authenticate().pipe(takeUntil(this.destroy$)).subscribe(() => {
        console.log('Do you feel the music!?')
      }
    )
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchMusic($event: string) {
    this.spotifyService.searchMusic($event).pipe(takeUntil(this.destroy$)).subscribe((results) => {
      console.log(results)
    })
  }
}

