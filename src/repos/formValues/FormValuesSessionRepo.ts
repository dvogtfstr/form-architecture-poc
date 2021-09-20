import { Service } from 'typedi';

import { FormValues } from 'utils/types';

import { IFormValuesRepo } from './interface';

@Service()
export class FormValuesSessionRepo implements IFormValuesRepo {
  private history: FormValues[];
  private STORAGE_KEY = 'FORM_VALUES';
  constructor() {
    const stringValues = sessionStorage.getItem(this.STORAGE_KEY);
    const parsed = JSON.parse(stringValues || 'null');
    this.history = Array.isArray(parsed) ? parsed : [];
  }

  public getHistory(): FormValues[] {
    return this.history;
  }

  public save(values: FormValues): void {
    // This is non-optimized solution. It saves empty entries.
    this.history.push(values);
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.history));
  }

  public clear(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}
