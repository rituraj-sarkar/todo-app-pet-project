import { useEffect } from "react";
import createAxiosInstance from "../api/axios";
import Todo from "./Todo";

export function Todos({ user, setUser, todos, setTodos }) {
  //object destructuring, can be passed as props too and fetched using props.todos
  const axiosInstance = createAxiosInstance({ user, setUser });
  useEffect(() => {
    const loadData = async () => {
      const res = await axiosInstance.get(`http://localhost:8088/todos`, {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res.data);
      setTodos(res.data.todos);
    };
    loadData();
  }, []);

  return (
    <div className="Todos">
      {todos.map((todo) => {
        return (
          <Todo key={todo._id} todo={todo} axiosInstance={axiosInstance}/>
        );
      })}
    </div>
  );
}
