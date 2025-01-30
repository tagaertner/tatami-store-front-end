// 
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';
import { type ProductsResponseWithParams } from '../utils';
import { constructUrl, constructPrevOrNextUrl } from '../utils';
import { useLoaderData, useLocation } from 'react-router-dom';

function PaginationContainer() {
  // Move all hooks to the top of the component
  const { meta } = useLoaderData() as ProductsResponseWithParams;
  const { search, pathname } = useLocation();

  // Then add your conditional checks
  if (!meta?.pagination) {
    return null;
  }

  const { pageCount, page } = meta.pagination;

  if (pageCount < 2) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const renderPagination = pages.map((pageNumber) => {
    const isActive = pageNumber === page;
    const url = constructUrl({ pageNumber, search, pathname });

    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    );
  });

  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname,
  });

  return (
    <Pagination className='mt-16'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={prevUrl} />
        </PaginationItem>
        {renderPagination}
        <PaginationItem>
          <PaginationNext to={nextUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationContainer;