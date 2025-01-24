import { useRouteError, Link, isRouteErrorResponse } from 'react-router-dom';
import { Button } from '../components/ui/button';
import four from '../assets/images/four.gif';

const Error = () => {
  // type:unknown
  const error = useRouteError();
  console.log(error);
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className='grid min-h-[100vh] place-items-center px-8 '>
        <div className='text-center'>
          <p className='text-9xl font-semibold text-primary'>404</p>
          <h1 className='mt-4 text-3xl font-bold tracking-tight sm:text-5xl'>
            Page not found
          </h1>

    <div className="flex flex-col items-center gap-4 pt-8"> {/* Center content */}
        <img 
          src={four}
          alt="error"
          className="w-full h-full object-cover rounded-lg aspect-video"
        />
    </div>
          <p className='mt-6 text-lg leading-7'>
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className='mt-10 '>
            <Button asChild size='lg' variant='secondary'>
              <Link to='/'>Go back home</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='grid min-h-[100vh] place-items-center px-8 '>
      <h4 className='text-center font-bold text-4xl'>there was an error... </h4>
    </main>
  );
};
export default Error;