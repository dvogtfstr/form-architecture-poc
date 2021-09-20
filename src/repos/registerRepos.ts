import { Container, Token } from 'typedi';

import { FeatureFlagsRepo } from './featureFlags/FeatureFlagsRepo';
import { InquiryTypeRepo } from './inquiryType/InquiryTypeRepo';
// import { FormValuesLocalRepo } from './formValues/FormValuesLocalRepo';
import { FormValuesSessionRepo } from './formValues/FormValuesSessionRepo';
import { IFormValuesRepo } from './formValues/interface';

export const INQUIRY_TYPE_SERVICE_KEY = new Token<InquiryTypeRepo>(
  'InquiryTypeRepo',
);
Container.set(INQUIRY_TYPE_SERVICE_KEY, new InquiryTypeRepo());

export const FF_SERVICE_KEY = new Token<FeatureFlagsRepo>('FeatureFlagsRepo');
Container.set(FF_SERVICE_KEY, new FeatureFlagsRepo());

// export const FORM_STORE_SERVICE_KEY = new Token<
//   IFormValuesRepo
// >('FormValuesRepo');
export const FORM_STORE_SERVICE_KEY = new Token<IFormValuesRepo>(
  'FormValuesRepo',
);
// Container.set(FORM_STORE_SERVICE_KEY, new FormValuesLocalRepo());
Container.set(FORM_STORE_SERVICE_KEY, new FormValuesSessionRepo());
