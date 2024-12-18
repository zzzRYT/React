import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./TodoList/TodoList";
import Root from "./Root";
import Chatting from "./Chatting/client/Chatting";
import Layout from "./Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/chatting" element={<Chatting />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
