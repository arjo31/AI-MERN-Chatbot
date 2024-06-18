import { Box } from "@mui/material";
import { Footer } from "../components/footer/Footer";
import TypingAnimation from "../components/typer/TypingAnimation";

const home = () => {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          mx: "auto",
          mt: "3",
        }}
      >
        <Box>
          <TypingAnimation />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src="robot.png"
            alt="robot"
            style={{ width: "150px", margin: "auto" }}
          />
          <img
            className="image-inverted rotate"
            src="openai.png"
            alt="openai"
            style={{ width: "150px", margin: "auto" }}
          />
        </Box>
        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
          <img
            src="chat.png"
            alt="chat"
            style={{
              display: "flex",
              margin: "auto",
              width: "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #64f3d5",
              marginTop: 20,
              marginBottom: 60,
            }}
          />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default home;
