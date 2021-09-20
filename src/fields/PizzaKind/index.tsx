import { Container } from 'typedi';

import Radio from 'components/Radio';
import ConditionalSection from 'components/ConditionalSection';
import useField from 'hooks/useField';

import { PIZZA_KIND_FIELD } from './controller';
import { PIZZA_KIND_OPTIONS } from './meta';

const controller = Container.get(PIZZA_KIND_FIELD.token);

const PizzaKind = () => {
  const { meta, value, setValue } = useField(controller);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <fieldset>
      <legend>Pizza kind</legend>
      {PIZZA_KIND_OPTIONS.map((option) => (
        <Radio
          key={option.value}
          name={meta.name}
          value={option.value}
          onChange={handleChange}
          label={option.label}
          type="radio"
          checked={option.value === value}
        />
      ))}

      <ConditionalSection isVisible={!!meta.error}>
        <p className="Field__error">{meta.error?.message}</p>
      </ConditionalSection>
    </fieldset>
  );
};

export default PizzaKind;
