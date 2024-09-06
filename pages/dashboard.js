import { getSession } from "next-auth/react";

import EditProfilePage from "@/templates/EditProfilePage";

function EditProfile() {
  return <EditProfilePage />;
}

export default EditProfile;

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
