export async function searchBooks(query) {
  if (!query) return [];

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );

  const data = await res.json();

  return (
    data.items?.map((item) => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.[0] || "Bilinmiyor",
      img:
        item.volumeInfo.imageLinks?.thumbnail ||
        "https://via.placeholder.com/128x180?text=No+Image",
    })) || []
  );
}
