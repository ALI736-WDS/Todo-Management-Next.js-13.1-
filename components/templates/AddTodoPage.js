import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

//element
import RadioButton from "components/element/RadioButton";

//toast
import { toast } from "react-toastify";

//svg
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";

function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState("todo");

  const router = useRouter();

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, caption, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      // console.log(data);
      setTitle("");
      setCaption("");
      setStatus("todo");
      toast.success(data.message);
      router.push("/");
    } else if (title === "" || caption === "") {
      toast.error(data.message);
      // console.log(data.message);
    }
  };

  return (
    <>
      <Head>
        <title> Create New Todo </title>
      </Head>

      <div className="add-form">
        <h2> Add New Todo </h2>
        <div className="add-form__input">
          <div className="add-form__input--first">
            <label htmlFor="title"> Title: </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="add-form__Caption--first">
              <label htmlFor="title"> Caption: </label>
              <textarea
                id="caption"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
          </div>
          <div className="add-form__input--second">
            <RadioButton
              status={status} //checked
              setStatus={setStatus} //onchange
              value="todo" //value & id
              title="Todo" //title todo(Todo, InProgress, Review, Done)
            >
              <BsAlignStart /> {/* svg */}
            </RadioButton>

            <RadioButton
              status={status}
              setStatus={setStatus}
              value="inProgress"
              title="In Progress"
            >
              <FiSettings />
            </RadioButton>

            <RadioButton
              status={status}
              setStatus={setStatus}
              value="review"
              title="Review"
            >
              <AiOutlineFileSearch />
            </RadioButton>

            <RadioButton
              status={status}
              setStatus={setStatus}
              value="done"
              title="Done"
            >
              <MdDoneAll />
            </RadioButton>
          </div>

          <div className="add-form__button">
            <button onClick={addHandler}> Add Todo </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTodoPage;
