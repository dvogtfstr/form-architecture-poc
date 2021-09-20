import Joi from 'joi';
import { Service } from 'typedi';

import { Field } from 'fields/common';

import registerField from '../registerField';
import { PizzaKindOptions } from './meta';

const schema = Joi.object({
  pizza_kind: Joi.valid(
    'Neapolitan',
    'Chicago',
    'New York-Style',
    'Sicilian',
    'Detroit',
  ).required(),
});

@Service()
class PizzaKindFieldController extends Field<PizzaKindOptions> {
  public validate(value: PizzaKindOptions) {
    const validated = schema.validate({ pizza_kind: value });
    return {
      isValid: !validated.error,
      error: validated.error,
      value,
    };
  }
}

export const PIZZA_KIND_FIELD = registerField(PizzaKindFieldController, {
  defaultValue: undefined,
  name: 'pizza_kind',
  step: 1,
});
