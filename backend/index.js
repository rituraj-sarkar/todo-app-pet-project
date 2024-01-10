const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { register } = require("./authService/register");
const { login } = require("./authService/login");
const { refresh } = require("./authService/refresh");
const { verifyJwt } = require("./middlewares/verifyCredentials");
const { logout } = require("./authService/logout");
const { completeTodo } = require("./appService/modifyTodo");
const { getTodos } = require("./appService/getTodos");
const { createTodoEntry } = require("./appService/createTodo");
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://yourfrontenddomain.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // Other CORS options...
};

app.use(
  cors({
    origin: `${process.env.ORIGIN}`,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

/*
body = {
    title : string,
    description: string
}
*/

app.post("/register", register);
app.post("/login", login);
app.get("/refreshAccesToken", refresh);
app.get("/logout", logout);

// app.use(verifyJwt);

app.post("/todo", verifyJwt, createTodoEntry);
app.get("/todos", verifyJwt, getTodos);
app.put("/completed", verifyJwt, completeTodo);


app.listen(process.env.PORT, () => {
  console.log(`Backend server running on port ${process.env.PORT}`);
});
