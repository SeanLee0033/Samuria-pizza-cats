import ReactDOM from 'react-dom';
import App from './App';
import { Providers } from './Providers';

require('dotenv').config();

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('root')
);
