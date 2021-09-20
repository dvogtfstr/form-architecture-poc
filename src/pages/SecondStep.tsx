import Container from 'typedi';
import { Link } from 'react-router-dom';

import {
  AdditionalInfo,
  Address,
  FirstName,
  LastName,
  PhoneNumber,
} from 'fields';
import SubmitController from 'controllers/SubmitController';

const SubmitCtrl = Container.get<SubmitController>(SubmitController);

const SecondStep = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    SubmitCtrl.submit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="Row">
        <FirstName />
        <LastName.Condition>
          <LastName.Field />
        </LastName.Condition>
      </div>
      <PhoneNumber />
      <Address.Condition>
        <Address.Field />
      </Address.Condition>
      <AdditionalInfo.Condition>
        <AdditionalInfo.Field />
      </AdditionalInfo.Condition>
      <div className="Spacer">
        <Link to="/first-step">Back</Link>
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default SecondStep;
