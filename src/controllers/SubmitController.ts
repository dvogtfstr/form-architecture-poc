import { Inject, Service } from 'typedi';

import { SendInquiry } from 'useCases/SendInquiry';
import FormValuesController from 'controllers/FormValuesController';
import FormValuesMapper from 'controllers/FormValuesMapper';

@Service()
class SubmitController {
  @Inject(() => SendInquiry)
  private sendInquiry: SendInquiry;
  @Inject(() => FormValuesController)
  private formValues: FormValuesController;

  public async submit() {
    const formValues = this.formValues.getValues();
    const isValid = FormValuesController.isValid(formValues);
    if (isValid) {
      try {
        const payload = FormValuesMapper.mapToInquiry(formValues);
        const response = await this.sendInquiry.execute(payload);
        if (response.error) {
          // fallback logic
        }
        if (response.ok) {
          // success logic
        }
      } catch (error) {
        // unexpected errors handler
        console.error(error);
      }
    }
  }
}

export default SubmitController;
