import { TestBed } from '@angular/core/testing';

import { TexttospeechService } from './tts.service';

describe('TtsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TexttospeechService = TestBed.get(TexttospeechService);
    expect(service).toBeTruthy();
  });
});
