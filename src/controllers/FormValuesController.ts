import { Inject, Service } from 'typedi';

import Observable from 'utils/Observable';
import { FormFieldMeta, FormValues } from 'utils/types';
import { IFormValuesRepo } from 'repos/formValues/interface';
import { FORM_STORE_SERVICE_KEY } from 'repos/registerRepos';
import { AllFieldsNames } from 'fields/registry';
import { canShowField } from './ConditionsController';

type FormValuesSubscribeFunc = (values: FormValues) => any;

@Service()
class FormValuesController extends Observable<FormValuesSubscribeFunc> {
  @Inject(FORM_STORE_SERVICE_KEY)
  private formValuesRepo: IFormValuesRepo;

  public getValues(): FormValues {
    const history = this.formValuesRepo.getHistory();
    return Object.assign({}, ...history);
  }

  public getValueByName(name: AllFieldsNames): FormFieldMeta | undefined {
    const values = this.getValues();
    return values[name];
  }
  
  public getValuesByStep(step: number): FormValues {
    const values = this.getValues();
    const fields = Object.entries(values) as [name: AllFieldsNames, meta: FormFieldMeta][]
    return fields.reduce<FormValues>((acc, [name, meta]) => {
      if (meta.step === step) {
        return {
          ...acc,
          [name]: meta,
        }
      } else {
        return acc;
      }
    }, {});
  }

  public save(values: FormValues): void {
    this.formValuesRepo.save(values);
    this.notify(this.getValues());
  }

  public clear(): void {
    this.formValuesRepo.clear();
  }

  public static isValid(values: FormValues): boolean {
    return FormValuesController.filterAvailableFields(values).every(
      ([_, meta]) => meta.isValid,
    );
  }
  
  public static transformToArray(values: FormValues) {
    return Object.entries(values) as [name: AllFieldsNames, meta: FormFieldMeta][];
  }

  public static filterAvailableFields(values: FormValues) {
    return FormValuesController.transformToArray(values)
      .filter(([name]) => canShowField(name, values));
  }
}

export default FormValuesController;
