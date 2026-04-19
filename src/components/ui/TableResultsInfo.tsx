type TableResultsInfoProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
};

export function TableResultsInfo({
  currentPage,
  itemsPerPage,
  totalItems,
}: TableResultsInfoProps) {
  if (totalItems === 0) return null;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <p className="text-sm text-muted-foreground whitespace-nowrap">
      Showing {start} to {end} of {totalItems} results
    </p>
  );
}
