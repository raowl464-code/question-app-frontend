import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import CreatePost from "./CreatePost";
import Home from "./Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />

          <Route path="/home" element={<Navigate to="/" />} />

          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />

          <Route
            path="/signup"
            element={
              <Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />

          <Route
            path={`/createpost`}
            element={
              <CreatePost
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
