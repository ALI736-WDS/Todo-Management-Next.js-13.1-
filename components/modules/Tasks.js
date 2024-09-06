import Link from "next/link";

//toast
import { toast } from "react-toastify";

//svg
import {
  RiMastodonLine,
  RiDeleteBin5Fill,
  RiDeleteBin5Line,
} from "react-icons/ri";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

function Tasks({ data, back, next, fetchTodos }) {
  const DeleteHandler = async (id) => {
    // console.log(id);
    const res = await fetch(`/api/update/todo/edit-todo/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.status === "success") {
      fetchTodos();
      // console.log(data);
      toast.success("Todo Deleted!");
    }
  };

  const changeStatus = async (id, status) => {
    const res = await fetch(`/api/update/todo/change-status/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      fetchTodos();
      toast.success(`Todo Status Updated To ${status}!`);
      // console.log(data);
    } else {
      toast.success(`Todo Status not Updated To ${status}!`);
      // console.log(data);
    }
  };

  return (
    <div className="tasks">
      {data?.map((i) => (
        <div key={i._id} className="tasks__card">
          <span className={i.status}></span>
          <RiMastodonLine />
          <h4> {i.title} </h4>
          <h3> {i.caption} </h3>

          <div>
            <button className="button-edit">
              <Link
                href={`edit-todo?id=${i._id}&status=${i.status}`}
                // href={`edit-todo?id=${i._id}&status=${i.status}&title=${i.title},&caption=${i.caption}`}
              >
                Edit
              </Link>
            </button>
            <button
              className="button-delete"
              onClick={() => DeleteHandler(i._id)}
            >
              Delete <RiDeleteBin5Line />
            </button>
          </div>

          <div>
            {back ? (
              <button
                className="button-back"
                onClick={() => changeStatus(i._id, back)}
              >
                {<BiLeftArrow />} Back
              </button>
            ) : null}

            {next ? (
              <button
                className="button-next"
                onClick={() => changeStatus(i._id, next)}
              >
                Next {<BiRightArrow />}
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
