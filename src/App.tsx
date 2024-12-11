import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./TodoList/TodoList";
import Root from "./Root";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/todoList" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
