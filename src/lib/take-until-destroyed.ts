import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const subjectName = '__takeUntilDestroyed$';

function isFunction(value: any): boolean {
  return typeof value === 'function';
}

/**
 *
 * https://github.com/NetanelBasal/ngx-take-until-destroy
 *
 */
export const takeUntilDestroyed = (
  componentInstance: any,
  destroyMethodName = 'ngOnDestroy'
) => <T>(source: Observable<T>) => {
  const originalDestroy = componentInstance[destroyMethodName];
  if (!isFunction(originalDestroy)) {
    throw new Error(
      `${componentInstance.constructor.name} is using takeUntilDestroyed but doesn't implement
            ${destroyMethodName}()`
    );
  }
  if (!componentInstance[subjectName]) {
    componentInstance[subjectName] = new Subject();
    componentInstance[destroyMethodName] = function(): any {
      if (isFunction(originalDestroy)) {
        originalDestroy.apply(this, arguments);
      }
      componentInstance[subjectName].next(true);
      componentInstance[subjectName].complete();
    };
  }
  return source.pipe(takeUntil<T>(componentInstance[subjectName]));
};
