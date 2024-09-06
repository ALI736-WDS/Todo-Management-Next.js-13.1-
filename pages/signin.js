import { getSession } from "next-auth/react";

import SignInPage from "@/templates/signinPage";

function signIn() {
  return <SignInPage />;
}

export default signIn;

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