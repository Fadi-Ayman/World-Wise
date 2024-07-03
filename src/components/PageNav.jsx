import { NavLink, Link } from "react-router-dom";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <div>
        <Link to="/"> <img className="navImage" src="../../public/logo.png" alt="Logo" /></Link>
      </div>
      <ul>
        <li>
          <NavLink to="/pricing" className="ctaLink">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product" className="ctaLink">Product</NavLink>
        </li>
        <li >
          <NavLink to="/login" className={`cta ${styles.loginLink}`}>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
