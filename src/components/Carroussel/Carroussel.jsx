
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner1 from "../../Assets/CarrousselImages/Banner1.png";
import banner2 from "../../Assets/CarrousselImages/Banner2.png";
import banner3 from "../../Assets/CarrousselImages/Banner3.png";
import banner4 from "../../Assets/CarrousselImages/Banner4.png";
import banner5 from "../../Assets/CarrousselImages/Banner5.png";
import banner6 from "../../Assets/CarrousselImages/Banner6.png";

import './Carroussel.css'

const images = [
    { id: 1, image: banner1 },
    { id: 2, image: banner2 },
    { id: 3, image: banner3 },
    { id: 4, image: banner4 },
    { id: 5, image: banner5 },
    { id: 6, image: banner6 },
];

export default function Carroussel() {
    return (
        <section className="carroussel">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                centeredSlides={false}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 12,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                }}
            >
                {images.map((item) => (
                    <SwiperSlide key={item.id}>
                        <img
                            src={item.image}
                            alt={`Banner de oportunidades ${item.id}`}
                            className="banner-image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
