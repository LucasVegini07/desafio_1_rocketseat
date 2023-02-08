import styles from "./EmptyList.module.css";
import clipboard from "../assets/clipboard.svg";
import { Clipboard, ClipboardText } from "phosphor-react";

export function EmptyList() {
  return (
    <section className={styles.content}>
      <img src={clipboard} />
      <strong> Você ainda não tem tarefas cadastradas </strong>
      <span> Crie tarefas e organize seus itens a fazer </span>
    </section>
  );
}
