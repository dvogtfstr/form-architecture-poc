import Joi from 'joi';
import { Service } from 'typedi';

import { Field } from 'fields/common';

import registerField from '../registerField';

const schema = Joi.string().max(500).allow('').optional();

@Service()
class AdditionalInfoFieldController extends Field<string> {
  public validate(value: string) {
    const validated = schema.validate(value);
    return {
      isValid: !validated.error,
      error: validated.error,
      value,
    };
  }
}

export const ADDITIONAL_INFO_FIELD = registerField(
  AdditionalInfoFieldController,
  {
    defaultValue: '',
    name: 'additional_info',
    step: 2,
  },
);
