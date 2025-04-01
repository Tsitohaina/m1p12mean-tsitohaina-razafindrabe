import { MatPaginatorIntl } from '@angular/material/paginator';


export const API_CONFIG = {
    baseUrl: 'http://localhost:5000/'
};

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Nb par page:';
  customPaginatorIntl.nextPageLabel = 'suivant';
  customPaginatorIntl.lastPageLabel = 'dernière page';
  customPaginatorIntl.previousPageLabel = 'page précédente';
  customPaginatorIntl.firstPageLabel = 'première page';

  customPaginatorIntl.getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ) => {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' sur ' + length;
  };

  return customPaginatorIntl;
}
  