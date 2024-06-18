import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
// import { useAuth } from "./context/AuthContext";
import { UseAuth } from "./context/AuthContext";
import Chat from "./pages/chat";
import Home from "./pages/home";
import Login from "./pages/login";
import Notfound from "./pages/notfound";
import Signup from "./pages/signup";

function App() {
  // console.log(useAuth()?.isLoggedIn);
  const auth = UseAuth();
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </main>
  );
}

export default App;
