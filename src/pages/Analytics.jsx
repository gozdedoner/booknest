import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/analytics/StatCard";
import ProgressChart from "../components/analytics/ProgressChart";

export default function Analytics() {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [progressData, setProgressData] = useState([]);
  const [topBook, setTopBook] = useState(null);
  const [lowestBook, setLowestBook] = useState(null);

  useEffect(() => {
    // ⭐ Favoriler
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritesCount(favorites.length);

    // 📚 Toplam kitap (şimdilik statik)
    const books = ["1984", "Simyacı", "Hayvan Çiftliği", "Küçük Prens"];
    setBookCount(books.length);

    // 📊 Okuma verileri
    const progressEntries = Object.keys(localStorage)
      .filter((k) => k.startsWith("progress-"))
      .map((k) => ({
        title: k.replace("progress-", "").replace(/-/g, " "),
        value: Number(localStorage.getItem(k)),
      }));

    setProgressData(progressEntries.map((p) => p.value).slice(0, 5));

    if (progressEntries.length > 0) {
      const sorted = [...progressEntries].sort((a, b) => b.value - a.value);

      setTopBook(sorted[0]);
      setLowestBook(sorted[sorted.length - 1]);

      const avg = sorted.reduce((sum, b) => sum + b.value, 0) / sorted.length;
      setReadingProgress(Math.round(avg));
    }
  }, []);

  return (
    <div className="min-h-screen bg-softWhite">
      {/* NAVBAR */}
      <Navbar variant="detail" />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-[#595E48] mb-2">
          📊 Okuma Analizi
        </h1>
        <p className="text-gray-600 mb-10">
          Okuma alışkanlıklarının genel görünümü
        </p>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Favori Kitaplar" value={favoritesCount} icon="⭐" />
          <StatCard title="Toplam Kitap" value={bookCount} icon="📚" />
          <StatCard
            title="Ortalama Okuma"
            value={`%${readingProgress}`}
            icon="📖"
          />
        </div>

        {/* CHART */}
        <div
          className="
            mt-12 p-8
            bg-white/60 backdrop-blur-xl
            border border-[#919682]/30
            rounded-3xl shadow-lg
          "
        >
          <h2 className="text-xl font-semibold text-[#595E48] mb-6">
            📈 Okuma İlerlemesi
          </h2>

          <ProgressChart data={progressData} />

          {/* PREMIUM INSIGHTS */}
          {topBook && (
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                🏆
                <span>
                  En çok okunan:{" "}
                  <strong className="text-[#595E48]">
                    {topBook.title} (%{topBook.value})
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                ⏳
                <span>
                  Yarım kalan:{" "}
                  <strong className="text-[#595E48]">
                    {lowestBook.title} (%{lowestBook.value})
                  </strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* INSIGHT CARD */}
        {topBook && (
          <div
            className="
              mt-12 p-8
              bg-white/50 backdrop-blur-xl
              border border-[#919682]/30
              rounded-3xl shadow-lg
            "
          >
            <h2 className="text-xl font-semibold text-[#595E48] mb-2">
              🧠 Okuma İçgörüsü
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Favorilerine eklediğin kitapların büyük bir kısmını gerçekten
              okumaya devam ediyorsun. Özellikle{" "}
              <strong className="text-[#595E48]">{topBook.title}</strong>{" "}
              kitabındaki ilerlemen, seçici ve istikrarlı bir okuyucu olduğunu
              gösteriyor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
