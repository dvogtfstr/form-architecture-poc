import Joi from 'joi';

import Observable from 'utils/Observable';
import { FormFieldMeta } from 'utils/types';

interface ValidationError extends Error {
  details?: Partial<Joi.ValidationErrorItem>[];
}

export interface FieldMeta {
  readonly name: string;
  readonly step: number;
  isValid?: boolean;
  error?: ValidationError;
}

export interface ValidationResult {
  isValid: boolean;
  value: any;
  error?: ValidationError;
}

export interface IField<TValue> extends Observable<FieldSubscriber<TValue>> {
  meta: FieldMeta;
  getValue(): TValue;
  changeValue(value: TValue, ...deps: any[]): FieldMeta;
  validate(value: TValue, ...deps: any[]): ValidationResult;
}

type FieldSubscriber<TValue> = (field: FormFieldMeta<TValue>) => any;

// Every field has to extend this class
class Field<TValue> extends Observable<FieldSubscriber<TValue>>
  implements IField<TValue> {
  protected value: TValue;
  public meta: FieldMeta;

  constructor(meta: FieldMeta, defaultValue: TValue) {
    super();
    const validated = this.validate(defaultValue);
    this.meta = {
      name: meta.name,
      step: meta.step,
      isValid: meta.isValid ?? validated.isValid,
      error: meta.error ?? validated.error,
    };
    this.value = defaultValue;
  }

  protected validateCommonRules(value: TValue): ValidationResult {
    return { isValid: true, value };
  }

  public validate(value: TValue, ...deps: any[]): ValidationResult {
    const validated = this.validateCommonRules(value);
    return validated;
  }

  public changeValue(value: TValue, ...deps: any[]): FieldMeta {
    const validated = this.validate(value, ...deps);
    this.value = value;
    this.meta = {
      ...this.meta,
      isValid: validated.isValid,
      error: validated.error,
    };
    this.notify({ ...this.meta, value: this.value });
    return this.meta;
  }

  public getValue(): TValue {
    return this.value;
  }
}

export default Field;
