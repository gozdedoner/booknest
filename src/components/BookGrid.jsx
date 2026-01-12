import BookCard from "./BookCard";

export default function BookGrid({
  books,
  favorites,
  toggleFavorite,
  onSelect = () => {}, // 🛡️ default → undefined hatası ASLA olmaz
}) {
  return (
    <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 pb-16">
      {books.map((book, index) => (
        <BookCard
          key={index}
          book={book}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          onSelect={() => onSelect(book)} // 👉 sadece TIKLANINCA çalışır
        />
      ))}
    </div>
  );
}
