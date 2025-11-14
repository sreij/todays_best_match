import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Home from "./Home.jsx";

export default function App() {
  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />} />
          </Routes>
        <Footer />
    </BrowserRouter>
  );
}