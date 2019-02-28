import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

import { QUOTES, IQuote } from './quotes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(+100%)',  opacity: 0}),
        animate('300ms ease-in', style({transform: 'translateX(0%)',  opacity: 1}))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(-100%)',  opacity: 0}))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  quote: IQuote;
  show = false;
  swipeIndicator = true;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getQuote();

  }

  animationDone(e) {
    if (e.toState === 'void') {
      this.getQuote();
    }
  }

  fadeQuoteOut() {
    this.show = false;
    this.swipeIndicator = false;
    this.cdr.detectChanges();
  }

  getQuote(): void {
    const newQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

    if (this.quote && newQuote.text === this.quote.text) {
      return this.getQuote();
    }

    this.quote = newQuote;
    this.show = true;
    this.cdr.detectChanges();
  }
}
