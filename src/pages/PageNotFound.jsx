import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <>
      <div className={styles.face}>
        <div className={styles.band}>
          <div className={styles.red}></div>
          <div className={styles.white}></div>
          <div className={styles.blue}></div>
        </div>
        <div className={styles.eyes}></div>
        <div className={styles.dimples}></div>
        <div className={styles.mouth}></div>
      </div>

      <h1 className={styles.text}> Page Not Found !</h1>
      <Link to={"/"} className={styles.btn}>
        Return to Home
      </Link>
    </>
  );
}
