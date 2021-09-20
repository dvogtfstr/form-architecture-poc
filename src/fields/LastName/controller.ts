import { Service } from 'typedi';

import { StringField } from 'fields/common';

import registerField from '../registerField';

@Service()
class LastNameFieldController extends StringField {}

export const LAST_NAME_FIELD = registerField(LastNameFieldController, {
  defaultValue: '',
  name: 'last_name',
  step: 2,
});
