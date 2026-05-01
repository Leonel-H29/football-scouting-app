import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationMeta } from '@/shared/types/domain';
import { Button } from '@/ui/components/common/Button';
import { Select } from '@/ui/components/common/Select';

export type PlayerPageSize = 5 | 10 | 20 | 'ALL';

interface Props {
  pagination: PaginationMeta | null;
  pageSize: PlayerPageSize;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: PlayerPageSize) => void;
}

const PAGE_SIZE_OPTIONS: PlayerPageSize[] = [5, 10, 20, 'ALL'];

const buildPageWindow = (
  currentPage: number,
  totalPages: number
): Array<number | '…'> => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const visible = new Set<number>([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ]);
  const sorted = Array.from(visible)
    .filter((page) => page > 0 && page <= totalPages)
    .sort((a, b) => a - b);

  const items: Array<number | '…'> = [];
  let previous: number | null = null;

  for (const page of sorted) {
    if (previous !== null && page - previous > 1) {
      items.push('…');
    }
    items.push(page);
    previous = page;
  }

  return items;
};

export const PlayersPagination = ({
  pagination,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: Props) => {
  const currentPage = pagination?.page ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const totalItems = pagination?.totalItems ?? 0;
  const pages = buildPageWindow(currentPage, totalPages);

  return (
    <section className="pagination-bar" aria-label="Players pagination">
      <div className="pagination-bar__meta">
        <div>
          <strong>{totalItems}</strong>
          <span>players found</span>
        </div>
        <div>
          <strong>
            Page {currentPage} of {totalPages}
          </strong>
          <span>
            {pageSize === 'ALL'
              ? 'All mode requested'
              : `Page size ${pageSize}`}
          </span>
        </div>
      </div>

      <div className="pagination-bar__controls">
        <Select
          label="Page size"
          value={String(pageSize)}
          onChange={(event) =>
            onPageSizeChange(
              event.target.value === 'ALL'
                ? 'ALL'
                : (Number(event.target.value) as 5 | 10 | 20)
            )
          }
        >
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option key={String(option)} value={option}>
              {option}
            </option>
          ))}
        </Select>

        <div
          className="pagination-bar__nav"
          role="navigation"
          aria-label="Pagination buttons"
        >
          <Button
            type="button"
            variant="secondary"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={!pagination?.hasPreviousPage}
          >
            <ChevronLeft size={16} /> Prev
          </Button>
          {pages.map((page, index) =>
            page === '…' ? (
              <span
                key={`ellipsis-${index}`}
                className="pagination-bar__ellipsis"
                aria-hidden="true"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                className={`pagination-bar__page${page === currentPage ? ' pagination-bar__page--active' : ''}`}
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )
          )}
          <Button
            type="button"
            variant="secondary"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={!pagination?.hasNextPage}
          >
            Next <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};
