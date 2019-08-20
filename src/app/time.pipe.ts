import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  pure: true,
})
export class TimePipe implements PipeTransform {
  transform(timeInSec: number | string): string {
    let isNegative = false;
    if (timeInSec < 0) {
      isNegative = true;
      timeInSec = +timeInSec * -1;
    }

    const hours = Math.floor(+timeInSec / 3600);
    const minutes = Math.floor(+timeInSec / 60) % 60;
    const seconds = Math.floor(+timeInSec % 60);

    return (
      (isNegative ? '-' : '') +
      [hours, minutes, seconds]
        .filter((time, i) => i > 0 || time !== 0)
        .map((time) => (time < 10 ? '0' + time : time))
        .join(':')
    );
  }
}
