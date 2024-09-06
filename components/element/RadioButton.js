function RadioButton({ status, setStatus, value, title, children }) {
  return (
    <div className={value}>
      <label htmlFor={value}>
        {children} {/* title svg */}
        {title} {/* title status */}
      </label>
      <input
        type="radio"
        id={value}
        value={value}
        onChange={(e) => setStatus(e.target.value)}
        checked={status === value} //vaghti onChage taghir kard, checked marbut be har input faal mishe va tik mikhore
      />
    </div>
  );
}

export default RadioButton;
