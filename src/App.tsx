import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
// import Login from "./pages/Login";
import Login from "@/pages/Login";
import { AuthRoute } from "./components/AuthRoute";
import "./App.css";

import Home from "./pages/Home";
import Article from "./pages/Article";
import Publish from "./pages/Publish";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <Layout />
              </AuthRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/Article" element={<Article />} />
            <Route path="/Publish" element={<Publish />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
