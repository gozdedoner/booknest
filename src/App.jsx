import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Read from "./pages/Read";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book/:title" element={<BookDetail />} />
        <Route path="/read/:title" element={<Read />} />
      </Routes>
    </BrowserRouter>
  );
}
