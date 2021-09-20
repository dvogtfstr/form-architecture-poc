import { Service } from 'typedi';

import { InquiryBody } from 'api/types';
import { FormValues } from 'utils/types';
import FormValuesController from 'controllers/FormValuesController';

@Service()
class FormValuesMapper {
  public static mapToInquiry(formValues: FormValues): InquiryBody {
    const availableFields = FormValuesController.filterAvailableFields(
      formValues,
    );
    const fields = availableFields.reduce<InquiryBody>(
      (acc, [name, meta]) => ({
        ...acc,
        [name]: meta.value,
      }),
      {} as InquiryBody,
    );
    return fields;
  }
}

export default FormValuesMapper;
