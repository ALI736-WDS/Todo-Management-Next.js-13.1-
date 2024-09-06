import { getSession } from "next-auth/react";

import SignUpPage from "@/templates/SignupPage";

function signUp() {
  return <SignUpPage />;
}

export default signUp;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}