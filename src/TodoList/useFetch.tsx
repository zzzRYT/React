import { useEffect, useState } from "react";

/**
 * @description 백엔드와 데이터통신을 할 때, 사용하는 hook 기존에는 view단에 작성했지만,
 * 이를 hook으로 분리하여 사용하면, 코드의 재사용성이 높아진다.
 *
 * @example
 * @GET
 * ```
 * const { data, error } = useFetch<TodoListType[]>("http://localhost:3000/todo", "GET");

 * useEffect(()=>{
 *  새로운 데이터 넣는 로직
 * },[data])
 * ```
 * @POST
 * ```
 * const { exeFetch: fetchPostTodo } = useFetch<TodoListType>("http://localhost:3000/todo", "POST");

 * const eventHandler = () => {
 *    exeFetch({id: "1", text: "text", check: false});
 * }
 * ```
 * @PATCH or @DELETE
 * ```
 * const { exeFetch: fetchDeleteTodo } = useFetch("http://localhost:3000/todo", "DELETE");

 * const eventHandler = () => {
 *  exeFetch({id: "1", text: "text", check: false}, "/1");
 * }
 * ```
 */
const useFetch = <T,>(
  url: string,
  method?: "GET" | "POST" | "PATCH" | "DELETE"
): {
  data: T | null;
  exeFetch: (body: T, query?: string) => void;
} => {
  const [data, setData] = useState<T | null>(null);

  const exeFetch = async (body: T, query: string = "") => {
    try {
      const response = await fetch(url + query, {
        method: method!,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result: T = await response.json();
      setData(result);
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("서버 에러");
      }
      const result: T = await response.json();
      setData(result);
    } catch (error) {
      alert((error as Error).message);
      return (location.href = "/");
    }
  };

  useEffect(() => {
    if (method === "GET") fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return { data, exeFetch };
};

export default useFetch;
