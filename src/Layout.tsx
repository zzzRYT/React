import { useEffect } from "react";
import { Link } from "react-router-dom";

const Layout = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/todoList"}>TodoList</Link>
        </li>
        <li>
          <Link to={"/chatting"}>Chatting</Link>
        </li>
      </ul>
    </div>
  );
};
export default Layout;
