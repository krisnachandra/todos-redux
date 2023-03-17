import { useState } from "react";
import axios from "axios";

const TodoAppAdd = () => {
  const [title, setTitle] = useState({ title: "" });
  const [errorTitle, setErrorTitle] = useState({
    isError: false,
    errorMessage: "",
  });

  const regTitle = /[0-9a-zA-Z]{6,}/;

  const validate = () => {
    if (title === "") {
      return setErrorTitle({ isError: true, errorMessage: "Title is empty!" });
    } else if (!regTitle.test(title)) {
      return setErrorTitle({
        isError: true,
        errorMessage: "Title minimum 6 character!",
      });
    } else {
      return setErrorTitle({
        isError: false,
        errorMessage: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createTodo = {
      title: title,
    };
    axios
      .post("https://jsonplaceholder.typicode.com/todos", createTodo)
      .then((response) => {
        console.log(response.status, response.data.token);
      });
  };

  return (
    <div className="container-submit">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <div>
            <input
              placeholder="Input title"
              type="text"
              id="title"
              name="title"
              value={title.title}
              onChange={(e) => setTitle(e.target.value, title)}
              onBlur={validate}
              className="input-title"
            />
            <div>
              {errorTitle.isError && (
                <span style={{ color: "red" }} className="error">
                  {errorTitle.errorMessage}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="container-button">
          <button
            onClick={() => {
              if (errorTitle.isError) return;
              alert(`Title added ${title}`);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoAppAdd;
