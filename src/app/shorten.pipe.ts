import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any) {
    let name = value;
    if (value.length > 10) {
      name = value.substr(0, 10) + ' ...';
    }
    return name;
  }

}
