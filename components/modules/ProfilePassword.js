function ProfilePassword({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmNewPassword,
  setConfirmNewPassword,
  changePassHandler,
}) {
  return (
      <div className="profile-form-edit__input--password">
        <div>
          <label htmlFor="old-password"> Old Password: </label>
          <input
            id="old-password"
            type="password"
            placeholder="Enter Your Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="new-password"> New Password: </label>
          <input
            id="new-password"
            type="password"
            placeholder="Enter Your New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="confirm-New-password">Confirm New Password:</label>
          <input
            id="confirm-New-password"
            type="password"
            placeholder="Enter Your confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <div className="add-form__button">
          <button onClick={changePassHandler}> Change Password </button>
        </div>
      </div>
  );
}

export default ProfilePassword;
