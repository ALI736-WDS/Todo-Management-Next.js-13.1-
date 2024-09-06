import Head from "next/head";

function ProfileForm({
  name,
  lastName,
  password,
  setName,
  setLastName,
  setPassword,
  submitHandler,
}) {
  return (
    <>
      <Head>
        <title> Dashboard </title>
      </Head>

      <div>
        <div className="profile-form-edit__input">
          <div>
            <label htmlFor="name"> Name: </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="last-name"> Last Name: </label>
            <input
              id="last-name"
              type="text"
              placeholder="Enter Your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password"> Password: </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="add-form__button">
          <button onClick={submitHandler}> Edit Profile </button>
        </div>
      </div>
    </>
  );
}

export default ProfileForm;
