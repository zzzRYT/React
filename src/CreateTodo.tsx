import { useState } from "react";
import * as S from "./style";

interface CreateTodoProps {
  id: number;
  text: string;
  check: boolean;
  deleteTodo: (id: number) => void;
}

const CreateTodo = ({ id, text, check, deleteTodo }: CreateTodoProps) => {
  const [modifyTodo, setModifyTodo] = useState(false);
  const [todoText, setTodoText] = useState(text);
  const [isChecked, setIsChecked] = useState(check);

  const onChangeTodoText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setTodoText(value);
  };

  const onClickChecked = async () => {
    await fetch(`http://localhost:3000/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        check: !isChecked,
      }),
    });
    setIsChecked((prev) => !prev);
  };

  const onClickModifyText = async () => {
    await fetch(`http://localhost:3000/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: todoText,
      }),
    });
    setModifyTodo((prev) => !prev);
  };

  return (
    <S.CreateBoxWrapper>
      <input
        onClick={onClickChecked}
        type="checkbox"
        checked={isChecked}
        className="checkbox"
      />
      {modifyTodo ? (
        <input
          onChange={onChangeTodoText}
          type="text"
          value={todoText}
          id={`todo${id}`}
          className="inputText"
        />
      ) : (
        <S.BeforeModifyDiv>{todoText}</S.BeforeModifyDiv>
      )}
      <label htmlFor={`todo${id}`} />
      {modifyTodo ? (
        <button onClick={onClickModifyText}>완료</button>
      ) : (
        <button onClick={() => setModifyTodo((prev) => !prev)}>✏️</button>
      )}
      <button onClick={() => deleteTodo(id)}>🛢️</button>
    </S.CreateBoxWrapper>
  );
};

export default CreateTodo;
