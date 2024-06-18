import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};

export const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      name={props.name}
      label={props.label}
      type={props.type}
      InputLabelProps={{ style: { color: "white" } }}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 5,
          fontSize: 20,
          color: "white",
        },
      }}
    />
  );
};
