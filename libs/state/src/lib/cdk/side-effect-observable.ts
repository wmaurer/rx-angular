import { merge, Observable, queueScheduler, Subject, Subscribable, Subscription, Observer } from 'rxjs';
import { mergeAll, observeOn } from 'rxjs/operators';

export function createSideEffectObservable<T>(
  stateObservables = new Subject<Observable<T>>()
): {
  effects$: Observable<T>;
  nextEffectObservable: (effect$: Observable<T>) => void;
  subscribe: () => Subscription;
} & Subscribable<T> {
  const effects$: Observable<T> = merge(
    stateObservables.pipe(mergeAll(), observeOn(queueScheduler))
  );

  function nextEffectObservable(effect$: Observable<T>): void {
    stateObservables.next(effect$);
  }

  function subscribe(): Subscription {
    return effects$.subscribe();
  }

  return {
    effects$,
    nextEffectObservable,
    subscribe
  };
}
