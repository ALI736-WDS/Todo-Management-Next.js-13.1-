import Link from "next/link";
import Head from "next/head";

function ProfileData({ data }) {
  return (
    <>
      <Head>
        <title> Profile </title>
      </Head>

      <div className="profile-data">
        <div>
          <span> Name: </span>
          <p> {data.name} </p>
        </div>
        <div>
          <span> Last Name: </span>
          <p> {data.lastName} </p>
        </div>
        <div>
          <span> Email: </span>
          <p> {data.email} </p>
        </div>

        <div className="add-form__button">
          <button>
            <Link href="/dashboard"> Edit </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileData;
