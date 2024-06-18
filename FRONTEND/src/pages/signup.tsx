/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CustomizedInput } from "../components/shared/CustomizedInput";
import { UseAuth } from "../context/AuthContext";

const signup = () => {
  const navigate = useNavigate();
  const auth = UseAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Registering user", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Registered successfully", { id: "signup" });
    } catch (e) {
      toast.error("Sign in failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  });

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "flex", xs: "none" }}>
        <img src="airobot.png" alt="airobot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ sx: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={-5}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
              color="white"
            >
              Sign Up
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />

            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "100px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                color: "black",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default signup;
