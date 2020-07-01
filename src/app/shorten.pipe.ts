import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit?: number) {
    let name = value;
    if (value.length > limit) {
      name = value.substr(0, limit) + ' ...';
    }
    return name;
  }

}
