import { BehaviorSubject, interval, Observable } from 'rxjs';
import { throttle, map } from 'rxjs/operators';

export class Stopwatch {
  readonly clock$: Observable<number>;

  private interval: NodeJS.Timer;
  private offset: number;
  private delay: number;
  private clock: number;
  private _clock$: BehaviorSubject<number>;
  private startTime: number;

  constructor(startTimeInSec = 0, throttleInMs = 1000, delayInMs = 10, countDown = true) {
    this.delay = delayInMs;
    this.startTime = startTimeInSec * 1000;
    this.clock = this.startTime;
    this._clock$ = new BehaviorSubject<number>(this.startTime);
    this.clock$ = this._clock$.pipe(
      throttle((v) => interval(throttleInMs)),
      map((v) => Math.round(v / 1000)),
    );

    if (countDown) {
      this.update = function() {
        this.clock -= this.delta();
        this._clock$.next(this.clock);
      };
    }
  }

  start() {
    if (!this.interval) {
      this.offset = Date.now();
      this.interval = setInterval(this.update.bind(this), this.delay);
    }
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset() {
    this.clock = this.startTime;
  }

  private update() {
    this.clock += this.delta();
    this._clock$.next(this.clock);
  }

  private delta() {
    const now = Date.now();
    const delta = now - this.offset;

    this.offset = now;
    return delta;
  }
}
