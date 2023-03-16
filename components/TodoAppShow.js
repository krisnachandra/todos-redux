import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Home.module.css";
import { setTodos } from "../features/todoSlice";
import { useEffect } from "react";
import axios from "axios";
import { useState, useMemo } from "react";
import Pagination from "./Pagination";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const TodoAppShow = () => {
  const [textSearch, setTextSearch] = useState("");
  const [sortTitle, setSortTitle] = useState(false);
  const [sortId, setSortId] = useState(false);
  const [page, setPage] = useState(0);

  const getDataTodos = (page) => {
    const start = page * 10;
    axios
      .get(
        `https://jsonplaceholder.typicode.com/todos?_start=${start}&_limit=10`
      )
      .then((res) => dispatch(setTodos(res.data)));
  };

  const dispatch = useDispatch();
  const { todos } = useSelector((store) => store.todos);

  useEffect(() => {
    getDataTodos(page);
  }, [dispatch, page]);

  const list = useMemo(() => {
    if (todos.length > 0) {
      const newTodos = todos
        .filter((t) => t.title.includes(textSearch))
        .sort((a, b) => {
          if (sortId) {
            return a.id < b.id ? 1 : -1;
          } else {
            return a.id < b.id ? -1 : 1;
          }
        });
      return newTodos;
    }
    return [];
  }, [todos, textSearch, sortId]);

  // const filtered = useMemo(() => {
  //   if (list.length > 0) {
  //     return list.sort((a, b) => {
  //       if (sortTitle) {
  //         return a.title < b.title ? 1 : -1;
  //       } else {
  //         return a.title < b.title ? -1 : 1;
  //       }
  //     });
  //   }
  //   return [];
  // }, [list, sortTitle]);

  // const filtered = useMemo(() => {
  //   if (list.length > 0) {
  //     return list.sort((a, b) => {
  //       if (sortTitle) {
  //         return a.title < b.title ? 1 : -1;
  //       } else {
  //         return a.title < b.title ? -1 : 1;
  //       }
  //     });
  //   }
  //   return [];
  // }, [list, sortTitle]);

  // console.log(list, "Id");
  // console.log(filtered, "title");

  return (
    <div className={styles.boxtodoshow}>
      <div className={styles.containerSearch}>
        <input
          type="text"
          placeholder="Search"
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          className="input-search"
        />
      </div>

      <table>
        <tbody>
          <tr>
            <th>
              <div className="column-header">
                <span>Id</span>
                <span onClick={() => setSortId((prev) => !prev)}>
                  {sortId ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </div>
            </th>
            <th>
              <div className="column-header">
                <span onClic>Title</span>
                <span onClick={() => setSortTitle((prev) => !prev)}>
                  {sortTitle ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </div>
            </th>
            <th>Completed</th>
          </tr>
          {list.map((todo, i) => (
            <tr key={`todos-${todo.id}`}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} onChange={(index) => setPage(index)} />
    </div>
  );
};

export default TodoAppShow;
