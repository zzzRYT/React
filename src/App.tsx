import { useEffect, useState } from "react";
import * as S from "./style";
import CreateTodo from "./CreateTodo";
import useFetch from "./useFetch";

interface TodoListType {
  id: number;
  text: string;
  check: boolean;
}

function App() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState<TodoListType[]>([]);
  const { data, error } = useFetch<TodoListType[]>(
    `http://localhost:3000/todo`
  );

  const onChangeTodoText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setTodo(value);
  };

  const handleCreateTodo = async (text: string) => {
    const response = await fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        list.length !== 0
          ? { id: ++list[list.length - 1].id, text: text, check: false }
          : {
              id: 1,
              text,
              check: false,
            }
      ),
    });
    if (!response.ok) {
      throw new Error("서버 에러");
    }
    //낙관적 업데이트
    setList((prev) => {
      return [
        ...prev,
        prev.length !== 0
          ? { id: prev[prev.length - 1].id + 1, text, check: false }
          : { id: 1, text: text, check: false },
      ];
    });
    setTodo("");
  };

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const onClickDelete = (id: number) => {
    fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setList((prev) => {
      return prev.filter((ele) => ele.id !== id);
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <S.backgroundDiv>
      <S.BoxContainer>
        <S.Contents>
          <h1>To Do List</h1>
          <S.TextInputWrapper>
            <input
              onChange={onChangeTodoText}
              type="text"
              value={todo}
              id="todo"
            />
            <button onClick={() => handleCreateTodo(todo)}>+</button>
            <label htmlFor="todo"></label>
          </S.TextInputWrapper>
          {list.map((ele) => {
            return (
              <CreateTodo
                key={ele.id}
                id={ele.id}
                check={ele.check}
                text={ele.text}
                deleteTodo={onClickDelete}
              />
            );
          })}
        </S.Contents>
      </S.BoxContainer>
    </S.backgroundDiv>
  );
}

export default App;
