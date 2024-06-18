import { AppBar, Toolbar } from "@mui/material";
import { UseAuth } from "../context/AuthContext";
import Logo from "./shared/Logo";
import { NavigationLink } from "./shared/NavigationLink";

const Header = () => {
  const auth = UseAuth();
  return (
    <div>
      <AppBar
        sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
      >
        <Toolbar sx={{ display: "flex" }}>
          <Logo />
          <div>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink
                  bg="#00fffc"
                  to="/chat"
                  text="Go To Chat"
                  textColor="black"
                />
                <NavigationLink
                  bg="#51538f"
                  textColor="white"
                  to="/"
                  text="logout"
                  onClick={auth.logout}
                />
              </>
            ) : (
              <>
                <NavigationLink
                  bg="#00fffc"
                  to="/login"
                  text="Login"
                  textColor="black"
                />
                <NavigationLink
                  bg="#51538f"
                  textColor="white"
                  to="/signup"
                  text="Signup"
                />
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
