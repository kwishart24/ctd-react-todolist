import styles from './NotFound.module.css';
import { NavLink } from 'react-router';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h2>404 Not Found</h2>
      <NavLink to="/">
        <h4>Go back Home</h4>
      </NavLink>
    </div>
  );
}

export default NotFound;
