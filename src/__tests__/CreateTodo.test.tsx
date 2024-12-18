import { render, screen } from "@testing-library/react";
import TodoList from "../TodoList/TodoList";

test("todoList 정보 불러오는 테스트", () => {
  render(<TodoList />);
  const listElement = screen.queryByRole("listitem");
  expect(listElement).not.toBeInTheDocument();
});
