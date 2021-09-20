import * as React from 'react';

import { IField } from 'fields/common/Field';

function useField<TValue>(
  controller: IField<TValue>,
  subscriptions: any[] = [],
) {
  const defaultValue = controller.getValue();
  const [value, setValue] = React.useState(defaultValue);
  const [meta, setMeta] = React.useState(controller.meta);

  const handleChange = React.useCallback((value: any) => {
    setValue(value);
    const validated = controller.changeValue(value, ...subscriptions);
    setMeta((meta) => ({
      ...meta,
      error: validated.error,
      isValid: validated.isValid,
    }));
  }, subscriptions);

  React.useEffect(() => {
    const validated = controller.validate(value, ...subscriptions);
    setMeta((meta) => ({
      ...meta,
      error: validated.error,
      isValid: validated.isValid,
    }));
  }, subscriptions);

  return { meta, value, setValue: handleChange };
}

export default useField;
