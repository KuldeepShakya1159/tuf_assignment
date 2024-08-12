import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/HomePage/Home";
import Admin from "./component/Admin/admin.jsx";
import { BannerProvider } from "./context/bannercontext.js";

function App() {
  return (
    <div>
      <BrowserRouter>
      <BannerProvider>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
        </BannerProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
