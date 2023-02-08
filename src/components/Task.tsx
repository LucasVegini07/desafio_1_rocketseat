import styles from "./Task.module.css";
import { Trash } from "phosphor-react";

interface ToDoProps {
  content: string;
  finished: boolean;
  id: string;
  onDeleteTask: (ToDoId: string) => void;
  onChangeFinishedStatus: (TodoId: string) => void;
}

export function Task({
  content,
  finished,
  id,
  onDeleteTask,
  onChangeFinishedStatus,
}: ToDoProps) {
  return (
    <article className={styles.article}>
      <div className={styles.content}>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id={id}
            className={styles.checkbox}
            checked={finished}
            onChange={() => onChangeFinishedStatus(id)}
          />
          <label onClick={(e) => e.preventDefault()} htmlFor={id}>
            {content}
          </label>
        </div>
      </div>
      <Trash size={16} onClick={() => onDeleteTask(id)} />
    </article>
  );
}
