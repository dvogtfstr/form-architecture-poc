import { Service } from 'typedi';

import { StringField } from 'fields/common';
import registerField from '../registerField';

@Service()
class FirstNameFieldController extends StringField {}

export const FIRST_NAME_FIELD = registerField(FirstNameFieldController, {
  defaultValue: '',
  name: 'first_name',
  step: 2,
});
