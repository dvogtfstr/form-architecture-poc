import { Service } from 'typedi';

import { IFormValuesRepo } from './interface';

import { FormValue } from 'utils/types';

@Service()
export class FormValuesLocalRepo implements IFormValuesRepo {
  private history: FormValue[];
  private STORAGE_KEY = 'FORM_VALUES';
  constructor() {
    const stringValues = localStorage.getItem(this.STORAGE_KEY);
    const parsed = JSON.parse(stringValues || 'null');
    this.history = Array.isArray(parsed) ? parsed : [];
  }

  public getHistory(): FormValue[] {
    return this.history;
  }

  public save(...values: FormValue[]): void {
    this.history.push(...values);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.history));
  }

  public clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
