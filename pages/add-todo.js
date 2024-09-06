import { getSession } from "next-auth/react";

import AddTodoPage from "@/templates/AddTodoPage";

function AddTodo() {
  return (
    <div>
      <AddTodoPage />
    </div>
  );
}

export default AddTodo;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
