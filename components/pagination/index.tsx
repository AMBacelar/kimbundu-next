import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type Props = {
  numPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const getPageNumbers = (
  numPages: number,
  currentPage: number
): (number | "ellipsis")[] => {
  if (numPages <= 7) {
    return Array.from({ length: numPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (currentPage > 3) pages.push("ellipsis");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(numPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (currentPage < numPages - 2) pages.push("ellipsis");

  pages.push(numPages);
  return pages;
};

export const Pagination = ({ numPages, currentPage, onPageChange }: Props) => {
  if (numPages <= 1) return null;

  const pages = getPageNumbers(numPages, currentPage);

  return (
    <div className="mt-8 rounded-2xl border border-border/70 bg-card/70 p-3">
      <ShadcnPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={cn(currentPage <= 1 && "pointer-events-none opacity-50")}
            />
          </PaginationItem>

          {pages.map((page, i) =>
            page === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < numPages) onPageChange(currentPage + 1);
              }}
              className={cn(currentPage >= numPages && "pointer-events-none opacity-50")}
            />
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
    </div>
  );
};
