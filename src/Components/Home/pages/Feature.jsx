import React, { useEffect } from "react";
import { storeCourses } from "../../api/store";
import Slider from "react-slick";
import { cloud_front_url } from "../../api/data";
import { Link } from "react-router-dom";
import Loading from "../../libs/Loading/Loading";

const Feature = () => {
  const { isLoading, courses, getCourses } = storeCourses();
  useEffect(() => {
    if (courses?.length === 0) {
      getCourses();
    }
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  // Common settings for Slider
  const commonSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  // Settings for mobile devices
  const mobileSettings = {
    ...commonSettings,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Settings for desktop devices
  const desktopSettings = {
    ...commonSettings,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="p-6">
      <p className="text-4xl font-semibold font-poppins text-center lg:text-left">
        Featured Courses
      </p>

      {courses?.length <= 3 && (
        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {courses?.map((item, index) => (
                <div
                  key={index}
                  className="group space-y-6 border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800 px-8 py-12 text-center shadow-2xl shadow-gray-600/10 dark:shadow-none"
                >
                  <img
                    className="mx-auto w-full rounded-lg"
                    src={`${cloud_front_url}/${item?.thumbnail}`}
                    alt={item?.title}
                    loading="lazy"
                  />
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    {item?.title}
                  </h3>
                  <p>{item?.description}</p>
                  <Link
                    to={`/courses/${item?._id}`}
                    state={{
                      data: item,
                      from: "course",
                    }}
                    className="relative mx-auto flex h-10 w-10 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-100 dark:before:border-gray-600 before:transition before:duration-300 group-hover:before:scale-125"
                  >
                    <span className="text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {courses?.length > 3 && (
        <div className="mt-12">
          {/* Render courses for mobile devices */}
          <div className="lg:hidden">
            <Slider {...mobileSettings}>
              {courses?.map((item, index) => (
                <div key={index} className="px-4">
                  <div className="group space-y-6 border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800 px-8 py-12 text-center shadow-2xl shadow-gray-600/10 dark:shadow-none">
                    <img
                      className="mx-auto  h-64  w-full rounded-lg"
                      src={`${cloud_front_url}/${item?.thumbnail}`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {item?.title}
                    </h3>
                    <p>{item?.description}</p>
                    <Link
                      to={`/courses/${item?._id}`}
                      state={{
                        data: item,
                        from: "course",
                      }}
                      className="relative mx-auto flex h-10 w-10 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-100 dark:before:border-gray-600 before:transition before:duration-300 group-hover:before:scale-125"
                    >
                      <span className="text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Render courses for desktop devices */}
          <div className="hidden lg:block">
            <Slider {...desktopSettings}>
              {courses?.map((item, index) => (
                <div key={index} className="px-4">
                  <div className="group space-y-6 border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800 px-8 py-12 text-center shadow-2xl shadow-gray-600/10 dark:shadow-none">
                    <img
                      className="mx-auto  h-64  w-full rounded-lg"
                      src={`${cloud_front_url}/${item?.thumbnail}`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {item?.title}
                    </h3>
                    <p>{item?.description}</p>
                    <Link
                      to={`/courses/${item?._id}`}
                      state={{
                        data: item,
                        from: "course",
                      }}
                      className="relative mx-auto flex h-10 w-10 items-center justify-center before:absolute before:inset-0 before:rounded-full before:border before:border-gray-100 dark:before:border-gray-600 before:transition before:duration-300 group-hover:before:scale-125"
                    >
                      <span className="text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feature;
