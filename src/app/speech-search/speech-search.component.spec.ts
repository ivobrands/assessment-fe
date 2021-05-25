import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechSearchComponent } from './speech-search.component';

describe('SpeechSearchComponent', () => {
  let component: SpeechSearchComponent;
  let fixture: ComponentFixture<SpeechSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
