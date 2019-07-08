export class Pagination<PaginationObject> {
  constructor(
    public readonly items: PaginationObject[] = [],
    public readonly pageCount: number = 0,
    public readonly totalItems: number = 0,
  ) {}
}
