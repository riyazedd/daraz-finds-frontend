import axios from "axios";

export const fetchImage = async (productLink) => {
  try {
    // Double encode the URL for proper transmission
    const encodedURL = encodeURIComponent(encodeURIComponent(productLink));
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/scrape-image?url=${encodedURL}`
    );
    
    // Handle empty responses
    if (!response.data.imageUrl) {
      throw new Error('Image URL not found in response');
    }
    
    return { 
      imageUrl: response.data.imageUrl, 
      error: null 
    };
    
  } catch (err) {
    console.error('Fetch Error:', err);
    return { 
      imageUrl: "", 
      error: err.response?.data?.error || 'Failed to fetch image' 
    };
  }
};