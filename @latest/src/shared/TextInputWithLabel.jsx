import { StyledTextInputWithLabel } from "./StyledTextInputWithLabel";

function TextInputWithLabel({ elementId, label, onChange, ref, value }) {
  return (
    <>
      <StyledTextInputWithLabel>
        <label htmlFor={elementId}>{label}</label>
        <input
          type="text"
          id={elementId}
          ref={ref}
          value={value}
          onChange={onChange}
        ></input>
      </StyledTextInputWithLabel>
    </>
  );
}

export default TextInputWithLabel;
