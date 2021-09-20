import { Service } from 'typedi';

import { FormValues } from 'utils/types';
import FormValuesController from './FormValuesController';

export interface Progress {
  allFields: number;
  validFields: number;
}

@Service()
class ProgressController {
  private static progress: Progress[] = [];

  public static getProgress() {
    return this.progress;
  }

  public static recalcProgress(formValues: FormValues) {
    const updatedProgress = [...this.progress];
    const availableFields = FormValuesController.filterAvailableFields(
      formValues,
    );
    [1, 2].forEach((step) => {
      const stepFields = availableFields.filter(
        ([_, meta]) => meta?.step === step,
      );
      const validFields = stepFields.filter(([_, meta]) => meta?.isValid);
      updatedProgress[step - 1] = {
        allFields: stepFields.length,
        validFields: validFields.length,
      };
    });
    this.progress = updatedProgress;
    return this.progress;
  }
}

export default ProgressController;
