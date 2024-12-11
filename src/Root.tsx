import { Link } from "react-router-dom";

const Root = () => {
  return (
    <>
      <h1>리액트 공부</h1>
      <ul>
        <li>
          <Link to="/todoList">TodoList</Link>
        </li>
      </ul>
    </>
  );
};
export default Root;
