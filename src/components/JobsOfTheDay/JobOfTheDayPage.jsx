import JobCard from "../JobCard/JobCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function JobOfTheDayPage() {
    const jobs = [
        {
            id: 1,
            title: "Desenvolvedor Front End",
            salary: "15.000",
            location: "Home Office",
            enterprise: "VG Academy",
        },
        {
            id: 2,
            title: "Operador de câmera",
            salary: "15.000",
            location: "Brasília",
            enterprise: "SBT",
        },
        {
            id: 3,
            title: "Desenvolvedor Full Stack",
            salary: "18.000",
            location: "Rio de Janeiro",
            enterprise: "GLOBO TV",
        },
        {
            id: 4,
            title: "Desenvolvedor Back End",
            salary: "16.000",
            location: "São Paulo",
            enterprise: "Nubank",
        },
        {
            id: 5,
            title: "Analista de Dados Sr",
            salary: "12.000",
            location: "Home Office",
            enterprise: "iFood",
        },
    ];

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
                pagination={{
                    clickable: true,
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