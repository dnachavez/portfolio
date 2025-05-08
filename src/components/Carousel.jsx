import React, { useEffect, useRef, useState } from "react";

export const Carousel = ({ images, path = "", type = "projects", link = "" }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef();
    const containerRef = useRef();
    let options = {
        root: carouselRef.current,
        rootMargin: "0px",
        threshold: 0.5,
    };

    const detectScroll = (entries) => {
        let nextSlide;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                nextSlide = parseInt(entry.target.getAttribute("data-index"));
                setCurrentSlide(nextSlide);
            }
        });
    };

    useEffect(() => {
        let observer = new IntersectionObserver(detectScroll, options);
        for (let i = 0; i < carouselRef.current.children.length; i++) {
            observer.observe(carouselRef.current.children[i]);
        }
    }, []);

    const changeSlide = (direction) => {
        let nextSlide =
            direction === "left" ? currentSlide - 1 : currentSlide + 1;
        if (nextSlide < 0) nextSlide = images.length - 1;
        else if (nextSlide >= images.length) nextSlide = 0;
        let containerWidth = containerRef.current.clientWidth;
        carouselRef.current.scroll(nextSlide * containerWidth, 0);
    };

    return (
        <div
            className="relative flex justify-center items-center w-full bg-black overflow-hidden"
            ref={containerRef}
        >
            <ul
                className="carousel-viewport flex gap-0 h-fit scroll-smooth snap-x snap-mandatory overflow-x-scroll overflow-y-hidden transition-all duration-200"
                ref={carouselRef}
            >
                {images.map((image, index) => (
                    <li
                        className="flex-shrink-0 flex-grow-0 snap-start snap-always gap-0 w-full"
                        key={image}
                        data-index={index}
                    >
                        {link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                <img
                                    className="w-full h-full"
                                    src={`/${type}/${path}/${image}`}
                                    alt=""
                                    loading="lazy"
                                />
                            </a>
                        ) : (
                            <img
                                className="w-full h-full"
                                src={`/${type}/${path}/${image}`}
                                alt=""
                                loading="lazy"
                            />
                        )}
                    </li>
                ))}
            </ul>
            {images.length > 1 && (
                <>
                    {currentSlide !== 0 && (
                        <button
                            className="absolute hidden sm:flex justify-center items-center h-[26px] w-[26px] border-0 rounded-full text-light-texto-secondary bg-[#fffb] left-2 pr-[2px] hover:bg-[#fffe] transition-colors"
                            onClick={() => changeSlide("left")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                                stroke="currentColor"
                                height="16"
                                width="16"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                        </button>
                    )}
                    {currentSlide !== images.length - 1 && (
                        <button
                            className="absolute hidden sm:flex justify-center items-center h-[26px] w-[26px] border-0 rounded-full text-light-texto-secondary bg-[#fffb] right-2 hover:bg-[#fffe] transition-colors"
                            onClick={() => changeSlide("right")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                                stroke="currentColor"
                                height="16"
                                width="16"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                    )}
                    <span className="absolute right-2 bottom-2 py-1 px-2 bg-[#fffb] rounded-md text-light-texto-secondary text-[0.75rem] font-bold">
                        {currentSlide + 1} / {images.length}
                    </span>
                </>
            )}
            {images.length === 1 && type === "certificates" && (
                <div className="absolute tooltip hidden">View</div>
            )}
        </div>
    );
};
