import { Form, useLoaderData, Link } from 'react-router-dom';
import { Button } from './ui/button';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';

// Filters component
function Filters() {
  // The loader returns an object with "data" and "meta" properties.
  // We extract meta and params (if available) from the loader data.
  const { meta, params = {} } = useLoaderData() as {
    meta: { categories: any[]; pagination: any },
    params?: any
  };
  console.log("meta in Filters", meta);
  console.log("params in Filters", params);

  // Set default filter values from params
  const { 
    search = '', 
    category = '', 
    order = 'a-z', 
    price = 100000 
  } = params;

  // Guard clause: if meta.categories is not defined, return a loading indicator or null.
  if (!meta?.categories) {
    return null;
  }

  // Determine whether meta.categories is an array of objects or strings.
  const categoryOptions = Array.isArray(meta.categories) &&
    meta.categories.length > 0 &&
    typeof meta.categories[0] === 'object'
    ? meta.categories.map((cat: any) => cat.name) // map objects to their name
    : meta.categories; // if already strings, use as is

  return (
    <Form className='mt-1 border rounded-mt-4 boarder md:px-8 py-4 grid gap-x-4 gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-1 items-center lg:sticky lg:top-20'>
      {/* Search input */}
      <FormInput
        type='search'
        label='search product'
        name='search'
        defaultValue={search}
        placeholder='Type here...'
      />
      {/* Categories dropdown */}
      <FormSelect
        label='select category'
        name='category'
        options={['all', ...categoryOptions]} // now using meta.categories correctly
        defaultValue={category}
      />
      {/* Order by select */}
      <FormSelect
        label='order by'
        name='order'
        options={['a-z', 'z-a', 'high', 'low']}
        defaultValue={order}
      />
      {/* Price range */}
      <FormRange 
        label='price'
        name='price'
        defaultValue={price}
      />

      <Button type='submit' size='sm' className='self-end mb-2'>
        search
      </Button>
      <Button
        type='button'
        asChild
        size='sm'
        variant='outline'
        className='self-end mb-2'
      >
        <Link to='/products'>reset</Link>
      </Button>
    </Form>
  );
}

export default Filters;