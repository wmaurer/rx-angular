// tslint:disable:no-unused-expression

import { Component, Input } from '@angular/core';
import { isObservable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';
import { toBoolean } from '../utils';
import { TestItem } from '../model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rxa-value-native',
  template: `
    <mat-icon class="item" [ngClass]="{red:!value, green:value}">{{value ? 'check' : 'highlight_off'}}</mat-icon>`,
  styles: [`
    .item.red {
      color: red;
    }
    .item.green {
      color: green;
    }
    .value.number {
    }
    .value.string {
    }
    .value.object {
    }
    .value.array {
    }
  `],
})
export class ValueNativeComponent {

  @Input()
  value



}
