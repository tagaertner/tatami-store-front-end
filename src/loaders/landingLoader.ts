// src/loaders/landingLoader.ts
import { type LoaderFunction } from 'react-router-dom';
import axios from 'axios';
import { customFetch, type ProductsResponse } from '../utils';

const url = '/api/products?featured=true';

export const landingLoader: LoaderFunction = async (): Promise<ProductsResponse> => {
  try {
    console.log('Fetching featured products...');
    const response = await customFetch<ProductsResponse>(url);
    console.log('Featured products response:', response.data);
    
    return { ...response.data };
  } catch (error) {
    console.error('Error loading featured products:', error);
    if (axios.isAxiosError(error)) {
      console.log('Error details:', {
        message: error.message,
        url: error.config?.url,
        baseURL: error.config?.baseURL
      });
    }
    
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 0,
          total: 0
        },
        categories: [],
        companies: []
      }
    };
  }
};