import { Component } from '@angular/core';
import { State } from './state.enum';
import { Hints } from './hints.enum';
import { Stopwatch } from './stopwatch';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly State = State;
  hint = Hints.PICK_TOPIC;
  state = State.TOPIC_PICKING;
  topic: string;
  time = 60;
  counting: boolean;
  timeColor = 'green';
  stopwatch: Stopwatch;
  clock$: Observable<number>;
  started: boolean;
  structure: string;

  pickATopic(): void {
    const topics = [
      'sex',
      'fight',
      'the police',
      'Budapest',
      'role playing',
      'hobby',
      'sports',
      'dreaming',
      'imagination',
      'stupidity',
      'drinks',
      'bad luck',
      'god fortune',
      'gratitude',
      'envy',
      'breaking the law',
      'lesson',
    ];
    this.topic = topics[Math.floor(topics.length * Math.random())];

    this.state = State.TOPIC_PICKED;
    this.hint = Hints.TAP_TO_ADVANCE;
  }

  goToStructure(): void {
    this.state = State.STRUCTURE_PICKING;
    this.hint = Hints.PICK_STRUCTURE;
  }

  pickAStructure(): void {
    const structures = [
      'Good, Better, Best',
      'Bad, Worse, Worst',
      'Past, Present, Future',
      'One, Two, Three',
      'Pros & Cons',
    ];
    this.structure = structures[Math.floor(structures.length * Math.random())];

    this.state = State.STRUCTURE_PICKED;
    this.hint = Hints.TAP_TO_ADVANCE;
  }

  goToTimer(): void {
    this.state = State.TIMING;
    this.hint = Hints.START_TIMER;
    this.started = false;
    this.stopwatch = new Stopwatch(60);
    this.clock$ = this.stopwatch.clock$.pipe(
      tap((v) => {
        if (v < 0) {
          this.timeColor = 'red';
        } else if (v > 10) {
          this.timeColor = 'green';
        } else {
          this.timeColor = 'yellow';
        }
      }),
    );
  }

  toggleTimer(): void {
    this.started = true;
    this.counting ? this.stopwatch.stop() : this.stopwatch.start();

    this.counting = !this.counting;
    this.hint = this.counting ? Hints.STOP_TIMER : Hints.RESUME_TIMER;
  }

  done(): void {
    this.state = State.TOPIC_PICKING;
    this.hint = Hints.PICK_TOPIC;
  }
}
