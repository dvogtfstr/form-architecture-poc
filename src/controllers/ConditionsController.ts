import { Container, Service } from 'typedi';

import { FormFieldMeta, FormValues } from 'utils/types';
import { Extra } from 'fields/Extras/controller';
import { FF_SERVICE_KEY, INQUIRY_TYPE_SERVICE_KEY } from 'repos/registerRepos';
import { AllFieldsNames } from 'fields/registry';

const FeatureFlags = Container.get(FF_SERVICE_KEY);
const InquiryType = Container.get(INQUIRY_TYPE_SERVICE_KEY);

const conditions = {
  isExtras(extras?: FormFieldMeta<Extra[]>): boolean {
    return Boolean(extras && extras.value.length > 0);
  },
  isFirstName(firstName?: FormFieldMeta<string>): boolean {
    return Boolean(firstName?.value && firstName.isValid);
  },
};

const ConditionsController = {
  canShowLastName(firstName?: FormFieldMeta<string>): boolean {
    return conditions.isFirstName(firstName);
  },
  canShowAdditionaInfo(extras?: FormFieldMeta<Extra[]>): boolean {
    const isFlag = FeatureFlags.getFlagByName('ADDITIONAL_INFO');
    return isFlag && conditions.isExtras(extras);
  },
  canShowExtras(): boolean {
    const isFlag = FeatureFlags.getFlagByName('EXTRAS');
    const isFancy = InquiryType.isType('FANCY');
    return isFlag && isFancy;
  },
  canShowAddress(): boolean {
    const isFlag = FeatureFlags.getFlagByName('ADDRESS');
    return isFlag;
  },
};
// This Service is equivalent to the object above ^
// @Service()
// class ConditionsController {
//   public static canShowLastName(firstName?: FormFieldMeta<string>): boolean {
//     return conditions.isFirstName(firstName);
//   }

//   public static canShowAdditionaInfo(extras?: FormFieldMeta<Extra[]>): boolean {
//     const isFlag = FeatureFlags.getFlagByName('ADDITIONAL_INFO');
//     return isFlag && conditions.isExtras(extras);
//   }

//   public static canShowExtras(): boolean {
//     const isFlag = FeatureFlags.getFlagByName('EXTRAS');
//     const isFancy = InquiryType.isType('FANCY');
//     return isFlag && isFancy;
//   }

//   public static canShowAddress(): boolean {
//     const isFlag = FeatureFlags.getFlagByName('ADDRESS');
//     return isFlag;
//   }
// }

type ConditionsMap = Partial<
  Record<AllFieldsNames, (formValus: FormValues) => boolean>
>;
const conditionsMap: ConditionsMap = {
  last_name: (formValues) =>
    ConditionsController.canShowLastName(formValues.first_name),
  additional_info: (formValues) =>
    ConditionsController.canShowAdditionaInfo(formValues.extras),
  extras: ConditionsController.canShowExtras,
  address: ConditionsController.canShowAddress,
};

export const canShowField = (name: AllFieldsNames, formValues: FormValues) => {
  return conditionsMap[name] ? conditionsMap[name]?.(formValues) : true;
};

export default ConditionsController;
