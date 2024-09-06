import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//toast
import { toast } from "react-toastify";

//svg
import { BiLeftArrow } from "react-icons/bi";


function EditTodoPage() {
  const router = useRouter();
  // console.log(router.query);
  // const { id, status, title } = router.query;

  const {
    query: { id, status },
    isReady,
  } = router;

  const [newTitle, setNewTitle] = useState("");
  const [newCaption, setNewCaption] = useState("");

  useEffect(() => {
    //agar INF kamel gerefte shode bud fetch kon
    if (isReady) {
      fetchTodos();
    }
  }, [id, isReady]);

  const fetchTodos = async () => {
    const res = await fetch(`/api/todos`);
    const data = await res.json();

    if (data.status === "success") {
      // console.log(data);

      const findTodo = data.data.todos[status].find((todo) => todo._id === id);
      // console.log({ findTodo });

      if (findTodo) {
        setNewTitle(findTodo.title);
        setNewCaption(findTodo.caption);
        // console.log({ findTodo });
      }

      //of router.query
      // setNewTitle(title);
      // setNewCaption(caption);
    }
  };

  const editHandler = async () => {
    // //Validation in client
    // if (
    //   (newTitle.trim() === "" && newCaption.trim() === "") ||
    //   (newTitle.trim() === "" && newCaption.trim() === newCaption) ||
    //   (newTitle.trim() === newTitle && newCaption.trim() === "")
    // ) {
    //   toast.error("Please Enter a Valid New Title or New Caption!");
    //   return;
    // }

    ///////////////////////////////////////////////////////////////////////////////
    const res = await fetch(`/api/update/todo/edit-todo/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ id, title: newTitle, caption: newCaption }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);

    ///////////////////////////////////////////////////////////////////////////////
    if (data.status === "success") {
      setNewTitle("");
      setNewCaption("");
      toast.success(data.message);
      router.push("/");
    } else {
      toast.error(data.message);
      // console.log(data.message);
    }
  };

  return (
    <>
      <Head>
        <title> Edit Todo </title>
      </Head>

      <div className="add-form">
        <h2> Update Todo </h2>
        <div className="add-form__input">
          <div className="add-form__input--first">
            <label htmlFor="title"> Title: </label>
            <input
              id="title"
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="add-form__Caption--first">
            <label htmlFor="caption"> Caption: </label>
            <textarea
              id="caption"
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
            />
          </div>
          <button onClick={editHandler}> Change </button>
        </div>
      </div>
      <div className="add-form__button">
        <button onClick={() => router.back()}>{<BiLeftArrow />} back </button>
      </div>
    </>
  );
}

export default EditTodoPage;
