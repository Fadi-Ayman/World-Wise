import styles from "./Login.module.css";
import { useEffect, useRef, useState } from "react";
import PageNav from "./../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { isAuthenticated, error: AuthError, login } = useAuth();
  const navigate = useNavigate();
  const triesRef = useRef(0);

  function handleSubmit(e) {
    e.preventDefault();
    !login(email, password) && triesRef.current++;
  }

  useEffect(() => {
    isAuthenticated && navigate(`/applayout`, { replace: true });
    triesRef.current > 0 && AuthError && alert(AuthError);
  }, [AuthError, isAuthenticated, navigate, login]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className={`cta ${styles.btnLogin}`}>Login</button>
        </div>
      </form>
    </main>
  );
}
