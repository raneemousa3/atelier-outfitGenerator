import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

/**
 * Searches for sophisticated fashion photos using the Unsplash API.
 * @param item - The clothing item name to search for (e.g., "white sneakers", "black blazer").
 * @returns A promise that resolves to an image object with url and alt text.
 * @throws Error if the API call fails or the API key is missing.
 */
export async function searchImages(item: string): Promise<{ url: string; alt: string }> {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error('Unsplash API key is missing. Please check your environment variables.');
  }

  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos`,
      {
        params: {
          query: `${item} fashion elegant style`,
          orientation: 'portrait',
          content_filter: 'high',
          per_page: 1
        },
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    const data = response.data as { results: Array<{ urls: { regular: string }; alt_description: string }> };

    if (data.results.length > 0) {
      const image = data.results[0];
      return {
        url: image.urls.regular,
        alt: image.alt_description || item
      };
    } else {
      // Fallback to placeholder image with mahogany color scheme
      return {
        url: `https://via.placeholder.com/400x600/faf8f7/8b5a47?text=${encodeURIComponent(item)}`,
        alt: item
      };
    }
  } catch (error) {
    // Handle API rate limits and other errors gracefully
    console.error('Error fetching images from Unsplash:', error);
    return {
      url: `https://via.placeholder.com/400x600/faf8f7/8b5a47?text=${encodeURIComponent(item)}`,
      alt: item
    };
  }
} 