import { PIZZA_KIND_FIELD } from './PizzaKind/controller';
import { PizzaKindOptions } from './PizzaKind/meta';
import { FIRST_NAME_FIELD } from './FirstName/controller';
import { EXTRAS_FIELD, Extra } from './Extras/controller';
import { LAST_NAME_FIELD } from './LastName/controller';
import { PHONE_NUMBER_FIELD } from './PhoneNumber/controller';
import { ADDRESS_FIELD } from './Address/controller';
import { ADDITIONAL_INFO_FIELD } from './AdditionalInfo/controller';

type Reveal<T> = {
  [Key in keyof T]: T[Key];
};

export type FieldsRegistry = [
  {
    [PIZZA_KIND_FIELD.name]: PizzaKindOptions;
    [EXTRAS_FIELD.name]?: Extra[];
  },
  {
    [FIRST_NAME_FIELD.name]: string;
    [LAST_NAME_FIELD.name]: string;
    [PHONE_NUMBER_FIELD.name]: number;
    [ADDRESS_FIELD.name]: string;
    [ADDITIONAL_INFO_FIELD.name]?: string;
  },
];

export type FirstStepFields = FieldsRegistry[0];
export type SecondStepFields = FieldsRegistry[1];
export type AllFields = Reveal<FirstStepFields & SecondStepFields>;
export type AllFieldsNames = keyof AllFields;
