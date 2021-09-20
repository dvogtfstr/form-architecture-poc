export interface UseCase<TResult> {
  execute(...args: any[]): TResult;
}
