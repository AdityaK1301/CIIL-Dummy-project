import BookDetails from "@/components/BookDetails";

type Book = {
  id: number
  title: string
  category: string
  actual_price: number
  coverpage: string
  descr: string
  editor: string
  language: string
  stock: number
  subject: string
  isbn: string
  pages: number
  publisher_year: number
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const book: Book = await fetch(
    `http://127.0.0.1:5006/api/bookData/${id}`
  ).then(res => res.json())

  return <BookDetails book={book} />
}