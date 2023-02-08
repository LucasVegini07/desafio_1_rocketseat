import { Header } from "./components/Header";
import "./global.css";
import styles from "./App.module.css";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Task } from "./components/Task";
import { v4 as uuidv4 } from "uuid";
import { EmptyList } from "./components/EmptyList";

interface ITask {
  content: string;
  finished: boolean;
  id: string;
}

function App() {
  const [newTaskText, setNewTaskText] = useState("");

  const [tasks, setTasks] = useState<ITask[]>([
    {
      content:
        "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
      finished: true,
      id: uuidv4(),
    },
  ]);

  function changeFinishedStatus(taskId: string) {
    const tasksWithChangedStatus = tasks.map((task) => {
      if (task.id === taskId) {
        task.finished = !task.finished;
      }

      return task;
    });

    setTasks(tasksWithChangedStatus);
  }

  function deleteTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskId;
    });

    setTasks(tasksWithoutDeletedOne);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([
      ...tasks,
      { content: newTaskText, id: uuidv4(), finished: false },
    ]);

    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }

  function getFinishedNumber() {
    const finishedTasks = tasks.filter((task) => {
      return task.finished;
    });

    return finishedTasks.length;
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <form className={styles.form} onSubmit={handleCreateNewTask}>
            <input
              required
              placeholder="Adicione uma nova tarefa"
              className={styles.input}
              value={newTaskText}
              onChange={handleNewTaskChange}
              onInvalid={handleNewTaskInvalid}
            />
            <button className={styles.button}>
              Criar <PlusCircle weight="bold" size={16} />
            </button>
          </form>
          <section className={styles.infoSection}>
            <div className={styles.infoContainer}>
              <span>Tarefas criadas</span>
              <span className={styles.info}> {tasks.length} </span>
            </div>
            <div className={styles.infoContainer}>
              <span>Conluídas</span>
              <span className={styles.info}> {getFinishedNumber()} </span>
            </div>
          </section>

          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <Task
                  content={task.content}
                  finished={task.finished}
                  id={task.id}
                  onChangeFinishedStatus={changeFinishedStatus}
                  onDeleteTask={deleteTask}
                />
              );
            })
          ) : (
            <EmptyList />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
