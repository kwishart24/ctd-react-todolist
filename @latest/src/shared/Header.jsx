import { NavLink } from 'react-router';
import styles from './Header.module.css';

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
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
          Home
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
