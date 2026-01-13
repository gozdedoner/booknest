import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Read from "./pages/Read";
import Favorites from "./pages/Favorites";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book/:title" element={<BookDetail />} />
        <Route path="/read/:title" element={<Read />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}
