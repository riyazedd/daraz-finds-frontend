import axios from "axios";

export const fetchImage = async (productLink) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/scrape-image`, {
      params: { url: productLink },
    });

    if (response.data.imageUrl) {
      return { imageUrl: response.data.imageUrl, error: null };
    } else {
      return { imageUrl: "", error: "Image not found" };
    }
  } catch (err) {
    console.error(err);
    return { imageUrl: "", error: "Failed to fetch image" };
  }
};
