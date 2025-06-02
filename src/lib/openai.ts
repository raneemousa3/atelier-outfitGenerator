import axios from 'axios';
import { OutfitSuggestion } from '../types';

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

/**
 * Analyzes an uploaded clothing image using GPT-4 Vision.
 * @param base64Image - The base64 encoded image string.
 * @returns A promise that resolves to the analysis result as a string.
 * @throws Error if the API call fails or the API key is missing.
 */
export async function analyzeImage(base64Image: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing. Please check your environment variables.');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Analyze this clothing item and describe its style, color, and potential outfit pairings.' },
              { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
            ]
          }
        ],
        max_tokens: 300
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to analyze the image. Please try again later.');
  }
}

/**
 * Generates sophisticated outfit suggestions based on the provided analysis.
 * @param analysis - The analysis result from the image or text prompt.
 * @returns A promise that resolves to an array of OutfitSuggestion objects.
 * @throws Error if the API call fails or the API key is missing.
 */
export async function generateOutfits(analysis: string): Promise<OutfitSuggestion[]> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing. Please check your environment variables.');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Based on the following analysis, suggest three sophisticated outfit ideas: casual elegance, refined day wear, and elevated evening. Analysis: ${analysis}`
          }
        ],
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const suggestions = response.data.choices[0].message.content.split('\n\n').map((suggestion: string) => {
      const [title, description, items, tips, images] = suggestion.split('\n');
      return {
        title,
        description,
        items: items.split(',').map((item: string) => item.trim()),
        tips,
        images: images.split(',').map((image: string) => ({ url: image.trim(), alt: title }))
      };
    });

    return suggestions;
  } catch (error) {
    throw new Error('Failed to generate outfit suggestions. Please try again later.');
  }
} 