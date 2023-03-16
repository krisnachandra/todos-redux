import TodoAppAdd from "@/components/TodoAppAdd";
import TodoAppShow from "@/components/TodoAppShow";
import styles from "../styles/Home.module.css";

const HomeIndex = () => {
  return (
    <>
      <div className={styles.titlewrapper}>
        <h1>Todo App</h1>
      </div>
      <div className={styles.wrapperContainer}>
        <TodoAppAdd />
        <TodoAppShow />
      </div>
    </>
  );
};

export default HomeIndex;
