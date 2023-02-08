import styles from "./Header.module.css";
import iginiteLogo from "../assets/logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={iginiteLogo} alt="Logotipo do Ignite" />
    </header>
  );
}
