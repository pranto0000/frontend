import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../SwiperTwo.css";
const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Curjon_Hall.jpg", // Replace with actual image path
      title: "Welcome to Our School",
      subtitle: "Empowering the Future Through Quality Education",
    },
    {
      id: 2,
      image: "https://lp-cms-production.imgix.net/2019-06/fc09d33522052723c107a6d1fe5741b0-ahsan-manzil.jpg?fit=crop&ar=1%3A1&w=1200&auto=format&q=75",
      title: "A Place for Excellence",
      subtitle: "Providing the Best Learning Environment",
    },
    {
      id: 3,
      image: "https://admissionlearning.com/wp-content/uploads/2020/11/dhaka-university.jpg",
      title: "Shaping Bright Futures",
      subtitle: "Join Us for a Journey of Knowledge & Success",
    },
  ];

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] z-0">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6"
            >
              <h1 className="text-3xl md:text-5xl font-bold">{slide.title}</h1>
              <p className="mt-3 text-lg md:text-2xl">{slide.subtitle}</p>
            </div>
            <img
              src={slide.image}
              alt="Hero Slide"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
