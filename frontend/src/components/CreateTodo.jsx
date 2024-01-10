import { useState } from "react";

export function CreateTodo({ user, setTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="CreateTodo">
      <input
        type="text"
        placeholder="Tite"
        onChange={function (e) {
          setTitle(e.target.value);
        }}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="Description"
        onChange={function (e) {
          setDescription(e.target.value);
        }}
      />{" "}
      <br />
      <button
        onClick={async () => {
          await fetch(`https://todo-app-backend-tf51.onrender.com/todo`, { // Can be modified, this endpoint can return the particular todo created and same will be appended in the current set, we can avoid 1 network call
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "content-type": "application/json",
              "Authorization": `Bearer ${user}`
            },
          });
          const res = await fetch(`https://todo-app-backend-tf51.onrender.com/todos`, {
            method:"GET",
            headers: {
              "content-type": "application/json",
              "Authorization": `Bearer ${user}`
            },
          });
          const json = await res.json();
          setTodos(json.todos);
          // alert('Todo created');
        }}
      >
        Add a Todo
      </button>
    </div>
  );
}
