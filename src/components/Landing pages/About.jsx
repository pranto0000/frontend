import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import "../../SwiperOne.css";

const About = () => {
  return (
    <section id="about" className="py-12 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold">Welcome To Hatibandha SS High School</h2>
          <p className="mt-4 text-gray-600">
            Our school is committed to providing high-quality education and fostering a nurturing learning environment. 
            We emphasize academic excellence, creativity, and character development.
          </p>

          <Swiper
           className="swiper-one z-0"
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
      >
        <SwiperSlide><img src="https://tfe-bd.sgp1.cdn.digitaloceanspaces.com/posts/64421/du-fe.jpg" className="w-full h-full" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://smapse.com/storage/2018/12/95a260dc1a7b309eaf053c2d0a223997.jpg" className="w-full h-full" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://www.du.ac.bd/fontView/assets/img/others/du_library.jpg" className="w-full h-full" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://www.tbsnews.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2020/07/18/_oor7838.jpg" className="w-full h-full" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://www.tbsnews.net/sites/default/files/styles/big_3/public/images/2019/07/21/dhaka-university-tbs.jpg" className="w-full h-full" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://studybarta.com/wp-content/uploads/2019/08/du-admission-test-2019-2020.jpg" className="w-full h-full" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://tds-images.thedailystar.net/sites/default/files/styles/big_202/public/feature/images/2021/06/29/pre-du.jpg" className="w-full h-full" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://cs.du.ac.in/files/images/1.jpg"  className="w-full h-full"alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/Dhaka_University_03710.JPG" className="w-full h-full" alt="" /></SwiperSlide>
      </Swiper>

        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img src="https://d2u0ktu8omkpf6.cloudfront.net/acb46b4a059afde8cb6a66f8999a4591ec34c2d21ee5ed3e.jpg" alt="School Building" className="w-full rounded-lg shadow-md" />
        </div>
      </div>
    </section>
  );
};

export default About;
