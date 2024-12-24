import { useEffect, useState } from "react";
import * as S from "./style";
import CreateTodo from "./CreateTodo";
import useFetch from "./useFetch";
import getRandomId from "./getRandomId";

interface TodoListType {
  id: string;
  text: string;
  check: boolean;
}

function TodoList() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState<TodoListType[]>([]);
  const [randomId, setRandomId] = useState(getRandomId());
  const { data } = useFetch<TodoListType[]>(
    `http://localhost:3000/todo`,
    "GET"
  );
  const { exeFetch: fetchPostTodo } = useFetch<TodoListType>(
    "http://localhost:3000/todo",
    "POST"
  );
  const { exeFetch: fetchDeleteTodo } = useFetch(
    "http://localhost:3000/todo",
    "DELETE"
  );

  const onChangeTodoText: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setTodo(value);
  };

  //todo추가
  const handleCreateTodo = async (text: string) => {
    const temp: TodoListType = {
      id: randomId,
      text,
      check: false,
    };
    fetchPostTodo(temp);
    //낙관적 업데이트
    setList((prev) => {
      return [
        ...prev,
        {
          id: randomId,
          text,
          check: false,
        },
      ];
    });
    setTodo("");
    setRandomId(getRandomId());
  };

  //todo 삭제
  const onClickDelete = (id: string) => {
    fetchDeleteTodo({}, `/${id}`);
    setList((prev) => {
      return prev.filter((ele) => ele.id !== id);
    });
  };

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

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

export default TodoList;
