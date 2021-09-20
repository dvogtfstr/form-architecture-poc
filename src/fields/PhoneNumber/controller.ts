import Joi from 'joi';
import { Service } from 'typedi';

import { NumberField } from 'fields/common';

import registerField from '../registerField';

const schema = Joi.number().required();

@Service()
class PhoneNumberFieldController extends NumberField {
  public validate(value: number) {
    const validated = schema.validate(value);
    return {
      isValid: !validated.error,
      error: validated.error,
      value: validated.value,
    };
  }
}

export const PHONE_NUMBER_FIELD = registerField(PhoneNumberFieldController, {
  defaultValue: undefined,
  name: 'phone_number',
  step: 2,
});
