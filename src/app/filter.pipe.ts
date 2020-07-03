import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterValue: string, searchField: string) {
    const filterResult = [];
    if (!value.length || !filterValue) {
      return value;
    }
    for (const item of value) {
      if (item[searchField].includes(filterValue)) {
        filterResult.push(item);
      }
    }
    return filterResult;
  }
}
