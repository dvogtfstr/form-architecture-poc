import * as React from 'react';

import ProgressController, { Progress } from 'controllers/ProgressController';

import useFormValues from './useFormValues';

const useProgress = () => {
  const [progress, setProgress] = React.useState<Progress[]>([]);
  const formValues = useFormValues();

  React.useEffect(() => {
    setProgress(ProgressController.recalcProgress(formValues));
  }, [formValues]);

  return progress;
};

export default useProgress;
