import { LoaderFunction } from 'react-router-dom';
import { customFetch, type ProductsResponse, type Product } from '../utils';

const productsUrl = '/products/';
const categoriesUrl = '/categories/';

export const productsLoader: LoaderFunction = async ({ request }): Promise<ProductsResponse> => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);

  try {
    // Fetch products and categories concurrently.
    const [productsResponse, categoriesResponse] = await Promise.all([
      customFetch<Product[]>(productsUrl, { params }),
      customFetch(categoriesUrl)
    ]);

    // Map categoriesResponse.data to an array of category names.
    const categories = Array.isArray(categoriesResponse.data)
      ? categoriesResponse.data.map((cat: any) => cat.name)
      : [];

    return { 
      data: productsResponse.data, 
      meta: { 
        pagination: { 
          total: productsResponse.data.length,  
          pageCount: 1,
          page: 1, 
          pageSize: productsResponse.data.length || 10
        }, 
        categories // now filled with category names
      }
    };
  } catch (error) {
    console.error('API Error:', error);
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