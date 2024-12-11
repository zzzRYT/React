import { useEffect, useState } from "react";

/**
 * @description 백엔드와 데이터통신을 할 때, 사용하는 hook 기존에는 view단에 작성했지만,
 * 이를 hook으로 분리하여 사용하면, 코드의 재사용성이 높아진다.
 *
 * @example
 * const { data } = useFetch<TodoListType[]>("http://localhost:3000/todos");
 */
const useFetch = <T,>(
  url: string
): { data: T | null; error: string | null } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("서버 에러");
        }
        const result: T = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchData();
  }, [url]);
  return { data, error };
};

export default useFetch;
