
import { type LoaderFunction } from 'react-router-dom';
import { customFetch, type ProductsResponse } from '../utils';

const url = 'api/products?featured=true';

export const landingLoader: LoaderFunction = async (): Promise<ProductsResponse> => {
  try {
    console.log('Attempting to fetch featured products from:', url);
    const response = await customFetch<ProductsResponse>(url);
    
    if (!response.data) {
      throw new Error('No data received from API');
    }

    return { ...response.data };
  } catch (error) {
    console.error('Error loading featured products:', error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 0,
          total: 0
        },
        categories: []
      }
    };
  }
};