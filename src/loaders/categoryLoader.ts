import { customFetch } from '../utils/customFetch';

export const filtersLoader = async () => {
  const response = await customFetch.get('/categories');
  const categoriesData = response.data;
  const categories = categoriesData.map((cat: any) => cat.name);
  
  // Optionally, you can also pass along any existing search/filter parameters.
  // For now, we just return the categories.
  return { categories, params: {} };
};