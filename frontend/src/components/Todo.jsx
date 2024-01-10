function Todo({ todo }) {
  return (
    <div className="Todo">
      <h2>{todo.title}</h2>
      <h2>{todo.description}</h2>
      <button
        onClick={async () => {
          await axiosInstance.put(
            `http://localhost:8088/completed`,
            {
              id: todo._id,
            },
            {
              headers: {
                "content-type": "application/json",
              },
              withCredentials: true,
            }
          );
          const res = await axiosInstance.get(`http://localhost:8088/todos`, {
            headers: {
              "content-type": "application/json",
            },
            withCredentials: true,
          });
          setTodos(res.data.todos);
          alert("Todo updated");
        }}
      >
        {todo.completed == true ? "Completed" : "Mark as Complete"}
      </button>
    </div>
  );
}

export default Todo;
