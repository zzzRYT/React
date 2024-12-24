import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import "@testing-library/jest-dom";

beforeAll(() => {
  global.alert = jest.fn(); // alert를 빈 함수로 모킹
});

test("render TodoList", () => {
  render(<TodoList />);
  expect(screen.getByText("To Do List")).toBeInTheDocument();
});
