import { create } from "zustand";
import { axiosInstance } from "../../api/axiosInstance";

export const useImageController = create((set) => ({
  isLoading: false,
  imageUrl: null,
  progress: null,
  uploadImage: async (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    if (name === "image" && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      set({ isLoading: true, progress: 0 });
      try {
        // Define uploadUrl with the appropriate URL to upload the image
        /*  const uploadUrl = `${
            import.meta.env.VITE_APP_SECRET_SERVER_SIDE
          }/upload-image`; */
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) => {
            set({ progress: Math.round((100 * data.loaded) / data.total) });
          },
        };
        const res = await axiosInstance.post("/upload-image", formData, config);
        set({ imageUrl: res.data?.url });
        set({ isLoading: false, progress: null }); // Fixed the typo here
        toast.success("Image uploaded successfully", {
          duration: 1500,
          position: "top-center",
        });
        return res.data?.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        set({ isLoading: false, progress: null });
        throw error;
      }
    }
  },

  removeImage: async (imageUrl) => {
    //   const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}`;
    try {
      set({ isLoading: true });
      const res = await axiosInstance.delete("/remove-image", {
        data: {
          imageURL: imageUrl, // Fixed the object property name here
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res?.data) {
        set({ imageUrl: null });
        toast.success(res?.data?.message, {
          duration: 1500,
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Error", {
        duration: 1500,
        position: "top-center",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
