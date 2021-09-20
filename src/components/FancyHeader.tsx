import ConditionsController from 'controllers/ConditionsController';

const FancyHeader = () => {
  const isExtras = ConditionsController.canShowExtras();
  return (
    <div>
      <h1>Form header</h1>
      {isExtras && <p>Order with extras</p>}
    </div>
  );
};

export default FancyHeader;
