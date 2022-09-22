import "../styles/SearchInput.scss";

function SearchInput(props: { value: string }) {
  return (
    <div className="Wrapper">
      <h1 className="Title">CSS Only Floated Labels!</h1>
      <div className="Input">
        <input
          type="text"
          id="input"
          className="Input-text"
          placeholder="Your first name, e.g. Nicholas"
          value={props.value}
        />
        <label htmlFor="input" className="Input-label">
          First name
        </label>
      </div>
    </div>
  );
}

export default SearchInput;
