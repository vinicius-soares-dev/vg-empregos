import { useState, useEffect } from "react";
import JobCard from "../JobCard/JobCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function JobOfTheDayPage() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:3333/vagas");
      const data = await response.json();

      if (response.ok) {
        setJobs(data);
      }
    } catch (error) {
      console.error("Erro ao buscar vagas da API: ", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <section
      style={{
        width: "100%",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        centeredSlides={false}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {jobs.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <JobCard infoCard={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
