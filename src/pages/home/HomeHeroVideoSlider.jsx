import React, { useRef } from "react";
import Slider from "react-slick";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  Award,
  MessageCircle,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/HomeHeroVideoSlider.css";
import angleGrinderVideo from "../../assets/video/Anglegrinder-web.mp4";
import concreteVibratorVideo from "../../assets/video/Concretevibrator-web.mp4";
import { useNavigate } from "react-router-dom";
const HomeHeroVideoSlider = () => {
  const sliderRef = useRef(null);
  const nav = useNavigate();
  const goToCategory = (slug) => {
    nav(`/category/${slug}`);
  };
  const slides = [
    {
      id: 1,
      title: "Cut Faster with Our Cordless Angle Grinder",
      subtitle: "No Cables • High Performance • Built for Tough Jobs",
      ctaText: "Shop Now",
      slug: "power-equipment",
      videoSrc: angleGrinderVideo,
    },
    {
      id: 2,
      title: "High-Performance Concrete Vibrator",
      subtitle: "Stronger Compaction • Smooth Concrete Finish • Site Ready",
      ctaText: "Shop Now",
      slug: "generators-machinery",
      videoSrc: concreteVibratorVideo,
    },
  ];

  const trustBadges = [
    {
      id: 1,
      icon: <Truck className="homeherovideoslider-trust-icon" />,
      title: "Nationwide Delivery",
    },
    {
      id: 2,
      icon: <Shield className="homeherovideoslider-trust-icon" />,
      title: "Secure Payment",
    },
    {
      id: 3,
      icon: <Award className="homeherovideoslider-trust-icon" />,
      title: "Quality Guarantee",
    },
    {
      id: 4,
      icon: <MessageCircle className="homeherovideoslider-trust-icon" />,
      title: "WhatsApp Support",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5002,
    pauseOnHover: true,
    swipe: true,
    swipeToSlide: true,
    arrows: false,
    fade: true,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    customPaging: () => (
      <div className="homeherovideoslider-dot-wrapper">
        <div className="homeherovideoslider-dot"></div>
      </div>
    ),
    dotsClass: "slick-dots homeherovideoslider-dots",
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="homeherovideoslider-wrapper">
      {/* Hero Video Slider Section */}
      <div className="homeherovideoslider-container">
        <Slider ref={sliderRef} {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="homeherovideoslider-slide">
              <div className="homeherovideoslider-slide-inner">
                {/* Video Background */}
                <div className="homeherovideoslider-video-container">
                  <div className="homeherovideoslider-video-overlay"></div>
                  <video
                    key={slide.id}
                    className="homeherovideoslider-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  >
                    <source src={slide.videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Content Overlay */}
                <div className="homeherovideoslider-content-wrapper">
                  <div className="homeherovideoslider-content">
                    <h1 className="homeherovideoslider-title">{slide.title}</h1>
                    <p className="homeherovideoslider-subtitle">
                      {slide.subtitle}
                    </p>
                    <button
                      className="homeherovideoslider-cta"
                      onClick={() => goToCategory(slide.slug)}
                    >
                      {slide.ctaText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Navigation Arrows - Desktop Only */}
        <button
          onClick={handlePrev}
          className="homeherovideoslider-arrow homeherovideoslider-arrow-left"
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="homeherovideoslider-arrow homeherovideoslider-arrow-right"
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Trust Badges Section */}
      <div className="homeherovideoslider-trust-section">
        <div className="homeherovideoslider-trust-container">
          <div className="homeherovideoslider-trust-grid">
            {trustBadges.map((badge) => (
              <div key={badge.id} className="homeherovideoslider-trust-card">
                {badge.icon}
                <h3 className="homeherovideoslider-trust-title">
                  {badge.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroVideoSlider;
