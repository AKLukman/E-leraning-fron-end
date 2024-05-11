import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { cloud_front_url } from "../api/data";
import { axiosInstance } from "../api/axiosInstance";
import Loading from "../libs/Loading/Loading";

const BlogDetails = () => {
  const location = useLocation();
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const bolgData = location?.state?.data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check if bolgData is undefined or null before fetching
        if (!bolgData) {
          const res = await axiosInstance.get(`/courses/${params?.courseId}`);
          const data = res?.data;

          // Assuming data is an array
          setCourse(data);

          // Assuming data is an array and params?.blogId is a valid ID
          const finding = data?.blogs?.find(
            (obj) => obj._id === params?.blogId
          );

          if (finding) {
            setBlog(finding);
          } else {
            console.log("Blog not found"); // Handle the case when the blog is not found
          }
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bolgData, params?.courseId, params?.blogId]);

  if (loading) {
    return <Loading />;
  }
  return (
    // <>BlogDetails {data.blog.title}</>
    <div className="flex justify-center">
      <div className="w-3/4 glass bg-emerald-100">
        <figure className="border bg-blue-100">
          <img
            style={{ width: "50%", height: "300px", margin: "auto" }}
            src={`${cloud_front_url}/${bolgData?.image || course?.thumbnail}  `}
            alt="blog image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title mx-auto text-4xl">
            {bolgData?.blog.title || blog?.title}
          </h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">
              {bolgData?.category || course?.category}
            </button>
          </div>
          <p>{bolgData?.blog.description || blog?.description}</p>
          <Link to="/blogs">
            <button className="btn btn-primary mt-5">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
