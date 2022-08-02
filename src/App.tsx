import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
// import Login from "./pages/Login";
import Login from "@/pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
