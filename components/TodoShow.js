import Pagination from "./Pagination";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const TodoShow = () => {
  const [dataTodos, setDataTodos] = useState([]);
  const [sortId, setSortId] = useState("asc");
  const [sortTitle, setSortTitle] = useState("asc");

  const loadDatatodos = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos`, {
        params: { _limit: 10 },
      })
      .then((res) => setDataTodos(res.data));
  };

  useEffect(() => {
    loadDatatodos();
  }, []);

  useEffect(() => {
    dataTodos.sort((a, b) => {
      if (sortId === "asc") {
        return a.id < b.id ? -1 : 1;
      } else {
        return a.id < b.id ? 1 : -1;
      }
    });
    setDataTodos(dataTodos);
  }, [sortId]);

  useEffect(() => {
    dataTodos.sort((a, b) => {
      if (sortTitle === "asc") {
        return a.title < b.title ? -1 : 1;
      } else {
        return a.title < b.title ? 1 : -1;
      }
    });
    setDataTodos(dataTodos);
  }, [sortTitle]);

  const handlerSortId = () => {
    if (sortId === "asc") {
      setSortId("desc");
    }

    if (sortId === "desc") {
      setSortId("asc");
    }
  };

  const handlerSortTitle = () => {
    if (sortTitle === "asc") {
      setSortTitle("desc");
    }

    if (sortTitle === "desc") {
      setSortTitle("asc");
    }
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
                <span>{/* {sortId ? <FaAngleUp /> : <FaAngleDown />} */}</span>
              </div>
            </th>
            <th>
              <div className="column-header">
                <span onClick={handlerSortTitle}>Title</span>
                <span>
                  {/* {sortTitle ? <FaAngleUp /> : <FaAngleDown />} */}
                </span>
              </div>
            </th>
            <th>Completed</th>
          </tr>
          {dataTodos.map((todo, i) => (
            <tr key={`todos-${todo.id}`}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed.toString()}</td>
            </tr>
          ))}
          {/* <tr>
            <td>Id</td>
            <td>Title</td>
            <td>Status</td>
          </tr> */}
        </tbody>
      </table>
      {/* <Pagination page={page} onChange={(index) => setPage(index)} /> */}
    </div>
  );
};

export default TodoShow;
