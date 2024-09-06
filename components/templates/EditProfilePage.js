import Head from "next/head";

//Components
import ProfileForm from "@/modules/ProfileForm";
import ProfilePassword from "@/modules/ProfilePassword";

//svg
import { toast } from "react-toastify";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiLeftArrow } from "react-icons/bi";


function EditProfilePage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [data, setData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    // console.log(data);

    if (data.status === "success" && data.data.name && data.data.lastName) {
      setData(data.data);
      setName(data.data.name);
      setLastName(data.data.lastName);
    }
  };

  const submitHandler = async () => {
    const res = await fetch("/api/update/profile/edit-profile", {
      method: "PATCH",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);

    if (data.status === "success") {
      toast.success(data.message);
      router.push("/profile");
    } else {
      toast.error(data.message);
      // console.log(data.message);
    }
  };

  const changePasswordHandler = async () => {
    const res = await fetch("/api/update/profile/change-password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword, confirmNewPassword }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);

    if (data.status === "success") {
      toast.success(data.message);
      router.push("/profile");
    } else {
      toast.error(data.message);
      // console.log(data.message);
    }
  };

  return (
    <>
      <Head>
        <title> Edit Profile and Password </title>
      </Head>

      <div className="profile-form-edit">
        <ProfileForm
          name={name}
          lastName={lastName}
          password={password}
          setName={setName}
          setLastName={setLastName}
          setPassword={setPassword}
          submitHandler={submitHandler}
        />

        <ProfilePassword
          oldPassword={oldPassword}
          setOldPassword={setOldPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmNewPassword={confirmNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
          changePassHandler={changePasswordHandler}
        />
      </div>
      <div className="add-form__button">
        <button onClick={() => router.back()}>{<BiLeftArrow />} back </button>
      </div>
    </>
  );
}

export default EditProfilePage;
