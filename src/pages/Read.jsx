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

  const [note, setNote] = useState(localStorage.getItem(`note-${title}`) || "");

  useEffect(() => {
    localStorage.setItem(storageKey, progress);
  }, [progress, storageKey]);

  useEffect(() => {
    localStorage.setItem("reader-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem(`note-${title}`, note);
  }, [note, title]);

  return (
    <div
      className={`
        min-h-screen transition-colors duration-500
        px-3 sm:px-6
        pt-4 sm:pt-6
        pb-8 sm:pb-10
        ${
          darkMode ? "bg-[#0f0f0f] text-gray-200" : "bg-softWhite text-gray-800"
        }
      `}
    >
      {/* 🔝 FLOATING HEADER */}
      <div className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50">
        <div
          className="
            flex items-center gap-4 sm:gap-5
            px-4 sm:px-6 py-2.5 sm:py-3
            rounded-xl sm:rounded-2xl
            bg-black/70 text-white
            backdrop-blur-xl shadow-2xl
            text-sm sm:text-base
          "
        >
          <button
            onClick={() => navigate(-1)}
            className="hover:opacity-80 transition"
          >
            ←
          </button>

          <span className="font-medium tracking-wide whitespace-nowrap">
            Okuma Modu
          </span>

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
          max-w-4xl mx-auto
          mt-20 sm:mt-24
          h-[70vh] sm:h-[65vh]
          overflow-y-scroll
          bg-white/60 dark:bg-black/40
          backdrop-blur-xl
          rounded-2xl sm:rounded-3xl
          p-5 sm:p-8 md:p-10
          shadow-2xl
          leading-relaxed sm:leading-loose
        "
      >
        <h1
          className="
            text-xl sm:text-2xl md:text-3xl
            font-extrabold mb-4 sm:mb-6
            capitalize
          "
        >
          {title.replace(/-/g, " ")}
        </h1>

        <p className="whitespace-pre-line text-sm sm:text-base md:text-lg">
          {dummyText}
        </p>
      </div>

      {/* 📝 NOTE SECTION */}
      <div className="max-w-4xl mx-auto mt-6 sm:mt-8 px-1">
        <div
          className="
            bg-white/50 dark:bg-black/30
            backdrop-blur-xl
            border border-[#919682]/30
            rounded-xl sm:rounded-2xl
            p-4 sm:p-6
            shadow-lg
          "
        >
          <p className="text-xs sm:text-sm text-gray-500 mb-2">
            📝 Okurken not al
          </p>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Bu bölümle ilgili düşüncelerim..."
            className="
              w-full h-24 sm:h-28
              resize-none
              rounded-lg sm:rounded-xl
              p-3
              bg-white/70 dark:bg-black/50
              outline-none
              text-xs sm:text-sm
            "
          />
        </div>
      </div>

      {/* 📊 PROGRESS BAR */}
      <div className="max-w-4xl mx-auto mt-4 sm:mt-6 px-1">
        <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="
              h-full
              bg-gradient-to-r
              from-[#919682] to-[#595E48]
              transition-all duration-300
            "
          />
        </div>

        <p className="text-xs sm:text-sm mt-2 text-center opacity-80">
          Okuma ilerlemesi: %{progress}
        </p>
      </div>
    </div>
  );
}
