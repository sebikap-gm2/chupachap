// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Link } from 'react-router-dom';
import { Routes } from './router';

export function App() {
  return (
    <div style={styles}>
      <div role="navigation">
        <ul style={{ display: 'flex', listStyle: 'none'}}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes />
    </div>
  );
}

export default App;
