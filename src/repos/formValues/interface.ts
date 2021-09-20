import { FormValues } from 'utils/types';

export interface IFormValuesRepo {
  getHistory(): FormValues[];
  save(values: FormValues): void;
  clear(): void;
}
