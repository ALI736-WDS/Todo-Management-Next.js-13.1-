import { useEffect, useState } from "react";
import Head from "next/head";

//Tasks
import Tasks from "@/modules/Tasks";

function HomePage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    // console.log(data);
    if (data.status === "success") setTodos(data.data.todos);
  };

  return (
    <>
      <Head>
        <title> Todo Page </title>
      </Head>

      <div className="home-page">
        <div className="home-page--todo">
          <p> Todo </p>
          {/* vaghti status back ya next shodm dobare fetchTodos beshe va dobare component render beshge */}
          <Tasks data={todos.todo} fetchTodos={fetchTodos} next="inProgress" />
        </div>
        <div className="home-page--inProgress">
          <p> In Progress </p>
          <Tasks
            data={todos.inProgress}
            fetchTodos={fetchTodos}
            back="todo"
            next="review"
          />
        </div>
        <div className="home-page--review">
          <p> Review </p>
          <Tasks
            data={todos.review}
            fetchTodos={fetchTodos}
            back="inProgress"
            next="done"
          />
        </div>
        <div className="home-page--done">
          <p> Done </p>
          <Tasks data={todos.done} fetchTodos={fetchTodos} back="review" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
