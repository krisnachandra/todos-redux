import Pagination from "./Pagination";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setTodos,
  setSortId,
  setSortTitle,
  setPagination,
} from "@/features/todoSlice";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const TodoShow = () => {
  const [textSearch, setTextSearch] = useState("");
  const dispatch = useDispatch();
  const { sortId, sortTitle, pagination, showedTodos } = useSelector(
    (store) => store.todos
  );

  const loadDatatodos = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos`, {
        params: { _limit: 100 },
      })
      .then((res) => dispatch(setTodos(res.data)));
  };

  useEffect(() => {
    loadDatatodos();
  }, []);

  const handlerSortId = () => {
    dispatch(setSortId(sortId));
  };

  const handlerSortTitle = () => {
    dispatch(setSortTitle(sortTitle));
  };

  return (
    <div className={styles.boxtodoshow}>
      <div className={styles.containerSearch}>
        <input
          type="text"
          placeholder="Search"
          // value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          className="input-search"
        />
      </div>

      <table>
        <tbody>
          <tr>
            <th>
              <div className="column-header">
                <span onClick={handlerSortId}>Id</span>
                <span>{handlerSortId ? <FaAngleUp /> : <FaAngleDown />}</span>
              </div>
            </th>
            <th>
              <div className="column-header">
                <span onClick={handlerSortTitle}>Title</span>
                <span>
                  {handlerSortTitle ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </div>
            </th>
            <th>Completed</th>
          </tr>
          {showedTodos.map((todo, i) => (
            <tr key={`todos-${todo.id}`}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pagination={pagination}
        onChange={(index) => {
          dispatch(setPagination(index));
        }}
      />
    </div>
  );
};

export default TodoShow;
