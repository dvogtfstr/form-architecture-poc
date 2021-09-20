import * as React from 'react';
import Container from 'typedi';

import FormValuesController from 'controllers/FormValuesController';

const FormValuesCtrl = Container.get<FormValuesController>(
  FormValuesController,
);

const useFormValues = () => {
  const defaultValues = FormValuesCtrl.getValues();
  const [values, setValues] = React.useState(defaultValues);

  React.useEffect(() => {
    const subscription = FormValuesCtrl.subscribe(setValues);
    return () => FormValuesCtrl.unsubscribe(subscription);
  }, []);

  return values;
};

export default useFormValues;
