// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import MatchFinder from "./components/MatchFinder";
import PostForm from "./components/PostForm";

function App() {
  const [page, setPage] = useState("home"); // home or post

  return (
    <div className="app">
      <Header onNavigate={setPage} />
      {page === "home" ? <MatchFinder /> : <PostForm />}
    </div>
  );
}

export default App;
