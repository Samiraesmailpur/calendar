import { TextField } from "@mui/material";

const InputTextField = ({ label, name, type, error }) => {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id={name}
        label={label}
        name={name}
        type={type}
        autoComplete={name}
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </>
  );
};

export default InputTextField;
