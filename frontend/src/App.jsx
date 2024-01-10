import { useEffect, useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Logout from "./components/Logout";
import { refreshAccessToken } from "./api/axios";
import axios from "axios";
import AuthRoutes from "./AuthRoutes";

axios.defaults.withCredentials = true;

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const persistedUser = async () => {
      try {
        const res = await refreshAccessToken();
        setUser(res);
      } catch (err) {
        console.log(err);
      }
    };

    persistedUser();
  }, [todos]);

  if (user === undefined || user === null) {
    return (
      <Routes>
        <Route path="/*" element={<AuthRoutes setUser={setUser} />} />
        {/* <Route path="/login" element={<Login setLoggedInUser={setUser} />} /> */}
      </Routes>
    );
  } else {
    return (
      <div className='AppComponents'>
        <CreateTodo user={user} setTodos={setTodos} />
        <Todos
          {...{
            user: user,
            setUser: setUser,
            todos: todos,
            setTodos: setTodos,
          }}
        />
        <Logout setLoggedInUser={setUser} />
      </div>
    );
  }
}

export default App;
