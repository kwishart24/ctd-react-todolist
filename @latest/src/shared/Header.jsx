import { NavLink } from 'react-router';
import styles from './Header.module.css';

function Header({ title }) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <nav className={styles.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => {
            if (isActive === true) {
              return styles.active;
            } else {
              return styles.inactive;
            }
          }}
        >
          Todo List
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => {
            if (isActive === true) {
              return styles.active;
            } else {
              return styles.inactive;
            }
          }}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
