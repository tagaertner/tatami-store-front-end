import { LoaderFunction } from 'react-router-dom';
// import axios from 'axios';
import { customFetch, type ProductsResponse, type ProductsResponseWithParams } from '../utils';

const url = '/api/products'; // Make sure to include /api

export const productsLoader: LoaderFunction = async ({
  request
}): Promise<ProductsResponseWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ]);

  try {
    console.log('Making request to products API with params:', params);
    const response = await customFetch<ProductsResponse>(url, {
      params: {
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        search: params.search,
        category: params.category,
        company: params.company,
      },
    });

    return { ...response.data, params };
  } catch (error) {
    console.error('API Error:', error);
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
       
      },
      params
    };
  }
};