import { render, screen } from "@testing-library/react";
import Chatting from "./Chatting";
import "@testing-library/jest-dom";

beforeAll(() => {
  global.alert = jest.fn(); // alert를 빈 함수로 모킹
});

test("render TodoList", () => {
  render(<Chatting />);
  expect(screen.getByText("채팅")).toBeInTheDocument();
});
