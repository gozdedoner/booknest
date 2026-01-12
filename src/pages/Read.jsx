import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const dummyText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

`.repeat(30);

export default function Read() {
  const { title } = useParams();
  const navigate = useNavigate();

  const storageKey = `progress-${title}`;

  const [progress, setProgress] = useState(
    Number(localStorage.getItem(storageKey)) || 0
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("reader-theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem(storageKey, progress);
  }, [progress]);

  useEffect(() => {
    localStorage.setItem("reader-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen px-6 pt-6 pb-10 transition ${
        darkMode ? "bg-[#111] text-gray-200" : "bg-softWhite text-gray-800"
      }`}
    >
      {/* 🔝 FIXED HEADER */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50">
        <div
          className="
          flex items-center gap-4
          px-6 py-3 rounded-2xl
          bg-black/70 text-white
          backdrop-blur-xl shadow-xl
        "
        >
          <button
            onClick={() => navigate(-1)}
            className="hover:opacity-80 transition"
          >
            ←
          </button>

          <span className="font-medium">Okuma Modu</span>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hover:scale-110 transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* 📖 CONTENT */}
      <div
        onScroll={(e) => {
          const el = e.target;
          const percent =
            (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
          setProgress(Math.floor(percent));
        }}
        className="
          max-w-4xl mx-auto mt-20
          h-[70vh] overflow-y-scroll
          bg-white/60 dark:bg-black/40
          backdrop-blur-xl rounded-3xl
          p-10 shadow-xl
        "
      >
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {title.replace(/-/g, " ")}
        </h1>

        <p className="leading-relaxed whitespace-pre-line text-lg">
          {dummyText}
        </p>
      </div>

      {/* 📊 PROGRESS */}
      <div className="max-w-4xl mx-auto mt-6">
        <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-[#919682] transition-all duration-300"
          />
        </div>

        <p className="text-sm mt-2 text-center opacity-80">
          Okuma ilerlemesi: %{progress}
        </p>
      </div>
    </div>
  );
}
