export class User {
  public id: number;
  public firstName: string;
  public surname: string;
  public patronymic: string;
  public country: string;
  public city: string;
  public sex: number;
  public birthDate: Date;

  constructor() {
    this.id = 0;
    this.firstName = "";
    this.surname = "";
    this.patronymic = "";
    this.country = "";
    this.city = "";
    this.sex = 0;
    this.birthDate = new Date();
  }
}
