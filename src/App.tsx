import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import FirstStep from 'pages/FirstStep';
import SecondStep from 'pages/SecondStep';
import FancyHeader from 'components/FancyHeader';
import ProgressBar from 'components/ProgressBar';
import ClearButton from 'components/ClearButton';

import './styles.css';

export default function App() {
  return (
    <div className="App">
      <FancyHeader />
      <div className="Spacer">
        <ProgressBar />
      </div>
      <Router>
        <Switch>
          <Route path="/first-step">
            <FirstStep />
          </Route>
          <Route path="/second-step">
            <SecondStep />
          </Route>
          <Redirect to="/first-step" />
        </Switch>
      </Router>
      <div className="Spacer">
        <ClearButton />
      </div>
    </div>
  );
}
