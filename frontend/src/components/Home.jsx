import Carousel from "@/components/ui/carousel";
export default function Home() {
  const slideData = [
    {
      title: "Recommended Books",
      button: "Explore Component",
      src: "https://i.pinimg.com/1200x/f9/50/a3/f950a3ffd621e46a6c3972831306e5fa.jpg",
      link: "#recommended"
    },
    {
      title: "Books by Language",
      button: "Explore Component",
      src: "https://i.pinimg.com/736x/d7/6a/4d/d76a4d816b13cb26db37ff789f63cf18.jpg",
      link: "#booksbyLanguage"
    },
    {
      title: "View More",
      button: "Explore Component",
      src: "https://i.pinimg.com/736x/06/70/c0/0670c038502df7edf5987211a050502f.jpg",
      link: "/"
    },
    {
      title: "Best Selling Books",
      button: "Explore Component",
      src: "https://i.pinimg.com/736x/7a/f9/2e/7af92eaf4dd0ae34044ad4fb83c4f15b.jpg",
      link: "#bestSelling"
    },
    
  ];
  return (
    <div id="home" className="bg-white relative overflow-hidden ">
      <Carousel slides={slideData} />
    </div>
  );
}