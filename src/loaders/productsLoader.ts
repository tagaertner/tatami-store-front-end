// // // src/loaders/productsLoader.ts
// import { LoaderFunction } from 'react-router-dom';
// import { customFetch, type ProductsResponse, type ProductsResponseWithParams } from '../utils';

// const url = '/api/products';

// export const productsLoader: LoaderFunction = async ({
//   request
// }): Promise<ProductsResponseWithParams> => {
//   const params = Object.fromEntries([
//     ...new URL(request.url).searchParams.entries()
//   ]);

//   try {
//     const response = await customFetch<ProductsResponse>(url, {
//       params: {
//         page: params.page || 1,
//         pageSize: params.pageSize || 10,
//         search: params.search,
//         category: params.category,
//         company: params.company,
//       },
//     });

//     // Add console.log to debug the response
//     console.log('API Response:', response.data);

//     return { ...response.data, params };
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return {
//       data: [],
//       meta: {
//         pagination: {
//           page: 1,
//           pageSize: 10,
//           pageCount: 0,
//           total: 0
//         },
//         categories: [],
//         companies: []
//       },
//       params
//     };
//   }
// };

import { LoaderFunction } from 'react-router-dom';
import axios from 'axios';
import { customFetch, type ProductsResponse, type ProductsResponseWithParams } from '../utils';

const url = '/products';

export const productsLoader: LoaderFunction = async ({
  request
}): Promise<ProductsResponseWithParams> => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ]);

  try {
    console.log('Fetching with params:', params);
    const response = await customFetch<ProductsResponse>(url, {
      params: {
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        search: params.search,
        category: params.category,
        company: params.company,
      },
    });

    console.log('API Response:', response.data);

    if (!response.data) {
      throw new Error('No data received from API');
    }

    return { ...response.data, params };
  } catch (error) {
    console.error('Error fetching products:', error);
    if (axios.isAxiosError(error)) {
      console.log('Error details:', {
        message: error.message,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        status: error.response?.status
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
      },
      params
    };
  }
};