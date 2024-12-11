import { useState } from "react";
import * as S from "./style";
import useFetch from "./useFetch";

interface CreateTodoProps {
  id: string;
  text: string;
  check: boolean;
  deleteTodo: (id: string) => void;
}
const CreateTodo = ({ id, text, check, deleteTodo }: CreateTodoProps) => {
  const [modifyTodo, setModifyTodo] = useState(false);
  const [todoText, setTodoText] = useState(text);
  const [isChecked, setIsChecked] = useState(check);
  const { exeFetch: fetchPatchTodo } = useFetch<
    { check: boolean } | { text: string }
  >(`http://localhost:3000/todo`, "PATCH");

  const onChangeTodoText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setTodoText(value);
  };

  //todo checkbox 체크
  const onClickChecked = async () => {
    fetchPatchTodo({ check: !isChecked }, `/${id}`);
    setIsChecked((prev) => !prev);
  };

  //todo 수정
  const onClickModifyText = async () => {
    fetchPatchTodo({ text: todoText }, `/${id}`);
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
        <S.BeforeModifyDiv isCheck={isChecked}>{todoText}</S.BeforeModifyDiv>
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
