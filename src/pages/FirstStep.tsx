import * as React from 'react';
import { Container } from 'typedi';
import { useHistory } from 'react-router';

import { PizzaKind, Extras } from 'fields';
import FormValuesController from 'controllers/FormValuesController';

const FormValues = Container.get<FormValuesController>(FormValuesController);

const FirstStep = () => {
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // It shouldn't be here. It should be extracted to a separate controller.
    const values = FormValues.getValuesByStep(1);
    const isValid = FormValuesController.isValid(values);
    if (isValid) {
      history.push('/second-step');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Choose your pizza</h2>
      <PizzaKind />
      <Extras.Condition>
        <Extras.Field />
      </Extras.Condition>
      <div className="Spacer">
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default FirstStep;
