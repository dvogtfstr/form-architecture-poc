import { Container } from 'typedi';

import FormValuesController from '../controllers/FormValuesController';

const formValuesCtrl = Container.get<FormValuesController>(
  FormValuesController,
);

const ClearButton = () => {
  const handleClear = () => {
    formValuesCtrl.clear();
  };

  return (
    <button type="button" onClick={handleClear}>
      Clear values
    </button>
  );
};

export default ClearButton;
