import 'reflect-metadata';
import { render } from 'react-dom';

import './repos/registerRepos';
import App from './App';

const rootElement = document.getElementById('root');
render(<App />, rootElement);
