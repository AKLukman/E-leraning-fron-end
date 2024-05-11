import React, { useEffect } from "react";
import { storeCourses } from "../api/store";
import Loading from "../libs/Loading/Loading";
import { cloud_front_url } from "../api/data";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { isLoading: CourseLoading, courses, getCourses } = storeCourses();
  useEffect(() => {
    getCourses();
  }, []);
  if (CourseLoading) {
    return <Loading />;
  }
  return (
    <div classNameName="h-screen">
      <div className="py-12">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="mb-12 space-y-2 text-center">
            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">
              BLOGS
            </h2>
            <p className="text-gray-600 dark:text-gray-300 lg:mx-auto lg:w-6/12">
              Exploring the intersection of creativity and technology, our blog
              dives into the latest trends, tips, and insights to inspire and
              inform your digital journey
            </p>
          </div>

          <div className="lg:w-3/4 xl:w-2/4 lg:mx-auto">
            {courses?.map((item, index) => (
              <div key={index}>
                {item.blogs.map((blog, i) => (
                  <div
                    key={i}
                    className="group relative hover:z-10 md:-mx-4 -mx-8 md:p-6 p-8 rounded-3xl bg-white dark:bg-transparent border border-transparent hover:border-gray-100 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-2xl shadow-transparent hover:shadow-gray-600/10 gap-8 flex transition duration-300"
                  >
                    <div className="w-2/6 rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-xl">
                      <img
                        src={`${cloud_front_url}/${item?.thumbnail}`}
                        alt={blog?.title}
                        loading="lazy"
                        className="md:h-56 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-2 pl-0 w-4/6">
                      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                        {blog?.title}
                      </h3>
                      <p className="my-6 text-gray-600 dark:text-gray-300 text-ellipsis">
                        {blog?.description.slice(0, 200)}......
                      </p>
                      <Link
                        to={`/blogs-details/course/${item._id}/blog/${blog._id}`}
                        state={{
                          data: {
                            blog: blog,
                            image: item?.thumbnail,
                            category: item?.category,
                            title: item?.title,
                          },
                        }}
                        className="btn btn-warning btn-sm rounded-full my-3"
                      >
                        Read More
                      </Link>
                      <div className="flex gap-4">
                        <a
                          href="#"
                          className="px-3 py-1 rounded-full border border-gray-100 text-sm font-medium text-primary transition duration-300 hover:border-transparent hover:bg-primary hover:text-white dark:border-gray-700 dark:text-gray-300"
                        >
                          {item.title}
                        </a>
                        <a
                          href="#"
                          className="px-3 py-1 rounded-full border border-gray-100 text-sm font-medium text-primary transition duration-300 hover:border-transparent hover:bg-primary hover:text-white dark:border-gray-700 dark:text-gray-300"
                        >
                          {item.category}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
