import { FieldMeta } from 'fields/common/Field';
import { AllFieldsNames } from 'fields/registry';

export interface FormFieldMeta<TValue = any> extends FieldMeta {
  value: TValue;
}

export type FormValues = {
  [FieldName in AllFieldsNames]?: FormFieldMeta;
};
