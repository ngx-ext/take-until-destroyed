# @ngx-ext/take-until-destroyed
With this RxJS operator you can forget about unsubscribing manually.

## Install
`npm install @ngx-ext/take-until-destroyed`

## Use

```ts
import { OnInit, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@ngx-ext/take-until-destroyed';

export class Example implements OnInit, OnDestroy {
  public ngOnInit(): void {
    // for example listen to click events  
    fromEvent(document, 'click')
      .pipe(
        takeUntilDestroyed(this),
      ).subscribe(() => console.log('clicked!'));
    // that's all, subscription will be removed along with class' instance destroy
  }

  public ngOnDestroy(): void {
    // error will be thrown if this method doesn't exist
    // can be empty but has to exist
  }
}
```
