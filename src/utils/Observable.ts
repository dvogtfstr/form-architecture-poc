export interface IObservable<TCallback extends (...args: any) => any> {
  subscribe(callback: TCallback): number;
  unsubscribe(index: number): void;
}

abstract class Observable<TCallback extends (...args: any) => any>
  implements IObservable<TCallback> {
  private subscriptions: TCallback[] = [];

  public subscribe(callback: TCallback): number {
    this.subscriptions.push(callback);
    const subscriptionIndex = this.subscriptions.length - 1;
    return subscriptionIndex;
  }

  public unsubscribe(index: number) {
    this.subscriptions.splice(index, 1);
  }

  protected notify(...args: Parameters<TCallback>) {
    this.subscriptions.forEach((callback) => {
      callback(...args);
    });
  }
}

export default Observable;
