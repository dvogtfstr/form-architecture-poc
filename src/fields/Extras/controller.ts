import Joi from 'joi';
import { Service } from 'typedi';

import { Field } from 'fields/common';
import { ValidationResult } from 'fields/common/Field';
import { PizzaKindOptions } from 'fields/PizzaKind/meta';
import registerField from '../registerField';

export interface Extra {
  name: string;
  amount: number;
}

const schema = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    amount: Joi.number().positive().required(),
  }),
);

@Service()
class ExtrasFieldController extends Field<Extra[]> {
  validate(value: Extra[], pizzaKind: PizzaKindOptions) {
    const validatioResult: ValidationResult = {
      isValid: false,
      value,
    };
    const validated = schema.validate(value, { abortEarly: false });
    validatioResult.isValid = !validated.error;
    validatioResult.error = validated.error;

    // Some complicated validation rules
    const isNeapolitan = pizzaKind === 'Neapolitan';
    if (isNeapolitan) {
      const ketchupIndexes = value
        .map((extra, index) => (/ketchup/i.test(extra.name) ? index : -1))
        .filter((index) => index > -1);
      ketchupIndexes.forEach((ketchupIndex) => {
        const error = {
          type: 'ValidationError',
          message: 'Are you kidding me? Neapolitan pizza with ketchup?',
          path: [ketchupIndex, 'name'],
        };
        if (validatioResult.error?.details) {
          validatioResult.error = {
            ...validatioResult.error,
            details: [...validatioResult.error?.details, error],
          };
        } else {
          validatioResult.error = {
            name: error.type,
            message: error.message,
            details: [error],
          };
        }
        validatioResult.isValid = false;
      });
    }
    return validatioResult;
  }
}

export const EXTRAS_FIELD = registerField(ExtrasFieldController, {
  defaultValue: [],
  name: 'extras',
  step: 1,
});
