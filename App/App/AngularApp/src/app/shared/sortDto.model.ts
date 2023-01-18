export class SortDto {
  public direction: string;
  public property: string;
  public isChangeDirection: boolean;

  constructor() {
    this.direction = 'desc';
    this.property = '';
    this.isChangeDirection = false;
  }
}
