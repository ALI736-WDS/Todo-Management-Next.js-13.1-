import { getSession } from "next-auth/react";

import EditTodoPage from "@/templates/EditTodoPage";

function todoInformation() {
  return <EditTodoPage />;
}

export default todoInformation;

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
