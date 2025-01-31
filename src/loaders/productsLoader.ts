import { LoaderFunction } from 'react-router-dom';
// import axios from 'axios';
import { customFetch, type ProductsResponse, type Product } from '../utils';

const url = '/products';

export const productsLoader: LoaderFunction = async ({
  request
}): Promise<ProductsResponse> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ]);

  try {
    console.log('Making request to products API with params:', params);
    const response = await customFetch<Product[]>(url, { params });
    console.log('API Response:', response.data);
    
    return { 
      data: response.data, 
      meta: { 
        pagination: { 
          total: response.data.length,  // Assuming total items are the length of the array
          pageCount: 1, // Default to 1 since pagination isn't implemented in API
          page: 1, 
          pageSize: response.data.length || 10 // Fallback to 10 if empty
        }, 
        categories: [] 
      }
    };
  } catch (error) {
    console.error('API Error:', error);

    // Return an empty response with default meta structure to avoid breaking UI
    return {
      data: [],
      meta: {
        pagination: {
          total: 0,
          pageCount: 0,
          page: 1,
          pageSize: 10,
        },
        categories: [],
      },
    };
  }
};