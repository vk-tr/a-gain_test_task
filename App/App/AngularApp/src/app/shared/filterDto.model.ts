export class FilterDto {
  public filterExpr: FilterExpr[];

  constructor() {
    this.filterExpr = [];
  }
}

export class FilterExpr {
  public property: string;
  public operator: string;
  public value: string;
  public type: string;

  constructor(
    property: string,
    operator: string,
    value: string,
    type: string) {
    this.property = property;
    this.operator = operator;
    this.value = value;
    this.type = type;
  }
}
