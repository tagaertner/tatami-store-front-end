import { Form, useLoaderData, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ProductsResponseWithParams} from '../utils';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';

// 
function Filters() {
  const { meta, params = {} } = useLoaderData() as ProductsResponseWithParams;
  
  // Add default values for params
  const { 
    search = '', 
    category = 'all', 
    shipping = false, 
    order = 'a-z', 
    price = 100000 
  } = params;

  // Guard clause
  if (!meta?.categories) {
    return null;
  }

  return (
    <Form className='mt-1 border rounded-mt-4 boarder md px-8 py-4 grid gap-x-4 gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-1 items-center lg:sticky lg:top-20'>
      {/* search */}
      <FormInput
        type='search'
        label='search product'
        name='search'
        defaultValue={search}
      />
      {/* CATEGORIES */}
      <FormSelect
        label='select category'
        name='category'
        options={['all', ...meta.categories]} // Add 'all' as default option
        defaultValue={category}
      />
      {/* ORDER */}
      <FormSelect
        label='order by'
        name='order'
        options={['a-z', 'z-a', 'high', 'low']}
        defaultValue={order}
      />
      {/* PRICE*/}
      <FormRange 
        label='price' 
        name='price' 
        defaultValue={price}
      />
      {/* SHIPPING*/}
      <div>
        <FormCheckbox
          label='free shipping' 
          name='shipping' 
          defaultValue={shipping}
        />
      </div>

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