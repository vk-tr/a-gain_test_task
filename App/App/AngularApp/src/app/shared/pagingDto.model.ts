export class PagingDto {
  public pageSize: number;
  public pageNum: number;
  public pagesCount: number;
  public recordsCount: number;

  constructor() {
    this.pagesCount = 0;
    this.pageSize = 10;
    this.pageNum = 1;
    this.recordsCount = 0;
  }
}
