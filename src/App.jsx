import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Osake from "./Osake.jsx";
import Otsumami from "./Otsumami.jsx";

export default function App() {
  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />} />
            <Route path='/Osake' element={<Osake />} />
            <Route path='/Otsumami' element={<Otsumami />} />
          </Routes>
        <Footer />
    </BrowserRouter>
  );
}