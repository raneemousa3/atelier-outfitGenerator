import axios from 'axios';
import { searchImages } from './unsplash';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Unsplash Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch images successfully', async () => {
    const mockResponse = {
      data: {
        results: [
          {
            urls: { regular: 'https://example.com/image.jpg' },
            alt_description: 'Elegant fashion photo'
          }
        ]
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { url: 'https://api.unsplash.com/search/photos' }
    };
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await searchImages('black blazer');
    expect(result).toEqual({
      url: 'https://example.com/image.jpg',
      alt: 'Elegant fashion photo'
    });
  });

  it('should handle API errors gracefully', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'));

    const result = await searchImages('black blazer');
    expect(result).toEqual({
      url: 'https://via.placeholder.com/400x600/faf8f7/8b5a47?text=black%20blazer',
      alt: 'black blazer'
    });
  });
}); 