import * as React from 'react';

import { IField } from 'fields/common/Field';
import { FormFieldMeta } from 'utils/types';

function useFieldValue<TValue>(fieldController: IField<TValue>) {
  const defaultValues = fieldController.getValue();
  const defaultValidate = fieldController.validate(defaultValues);
  const [meta, setMeta] = React.useState<FormFieldMeta<TValue>>({
    ...fieldController.meta,
    value: defaultValues,
    isValid: defaultValidate.isValid,
  });

  React.useEffect(() => {
    const subsription = fieldController.subscribe(setMeta);
    return () => fieldController.unsubscribe(subsription);
  }, [fieldController]);

  return meta;
}

export default useFieldValue;
