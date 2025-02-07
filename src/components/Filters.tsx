import { Form, useLoaderData, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from './ui/button';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';

function Filters() {
  // Extract meta and params from loader data
  const { meta, params = {} } = useLoaderData() as {
    meta: { categories: any[]; pagination: any },
    params?: any
  };

  // Initialize local state with the current filter parameters
  const [search, setSearch] = useState(params.search || '');
  const [category, setCategory] = useState(params.category || '');
  const [order, setOrder] = useState(params.order || 'a-z');
  const [price, setPrice] = useState(params.price || 1000);

  // Guard clause: if no categories data, render nothing
  if (!meta?.categories) {
    return null;
  }

  // Map categories appropriately (if they are objects, extract name)
  const categoryOptions =
    Array.isArray(meta.categories) &&
    meta.categories.length > 0 &&
    typeof meta.categories[0] === 'object'
      ? meta.categories.map((cat: any) => cat.name)
      : meta.categories;

  return (
    <Form
      className='mt-1 border rounded-mt-4 boarder md:px-8 py-4 grid gap-x-4 gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-1 items-center lg:sticky lg:top-20'
      // When the form is submitted, it will use the current state values.
    >
      {/* Search input as a controlled component */}
      <FormInput
        type='search'
        label='search product'
        name='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Type here...'
      />
      {/* Categories dropdown */}
      <FormSelect
        label='select category'
        name='category'
        options={['all', ...categoryOptions]}
        value={category}
        onChange={(value: string) => setCategory(value)}
      />
      {/* Order select */}
      <FormSelect
        label='order by'
        name='order'
        options={['a-z', 'z-a', 'high', 'low']}
        value={order}
        onChange={(value: string) => setOrder(value)}
      />
      {/* Price range */}
      <FormRange
        label='price'
        name='price'
        value={price}
        onChange={(value: number) => setPrice(value)}
      />

      <Button type='submit' size='sm' className='self-end mb-2'>
        search
      </Button>
      <Button type='button' asChild size='sm' variant='outline' className='self-end mb-2'>
        <Link to='/products'>reset</Link>
      </Button>
    </Form>
  );
}

export default Filters;