import { Service } from 'typedi';

import { StringField } from 'fields/common';

import registerField from '../registerField';

@Service()
class AddressFieldController extends StringField {}

export const ADDRESS_FIELD = registerField(AddressFieldController, {
  defaultValue: '',
  name: 'address',
  step: 2,
});
