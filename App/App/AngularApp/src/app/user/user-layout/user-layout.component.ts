import {Component, Inject, LOCALE_ID} from '@angular/core';
import { User } from '../../shared/user.model';
import { UserService } from "../../shared/user.service";
import {NgForm} from "@angular/forms";
import {FilterExpr} from "../../shared/filterDto.model";
import {formatDate} from '@angular/common';
import {SearchForm} from "../../shared/searchForm";

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent {
  show: boolean = false;

  user: User = new User();

  pageSizes: number[] = [1, 5, 25, 50, 100];

  selectedPageSize: string = '10';

  searchFormData: SearchForm = new SearchForm();

  goToPageVal: number = 1;

  isExactMatch: boolean = false;

  validationMsg: string = '';

  searchBirthDate: Date = new Date('0001-01-01');

  defaultDate: Date = this.searchBirthDate;

  constructor(
    public service: UserService,
    @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  public fillRow(selectedRecord: User) {
    this.service.authFormData = Object.assign({},selectedRecord);
  }

  public onShowForm() {
    this.user = new User();

    this.show = true;
  }

  public onHideForm() {
    this.show = false;
  }

  onDeleteButtonPress(id: number) {
    this.service.deleteUser(id);
  }

  onEditButtonPress(user: User) {
    this.service.getUser(user.id)
      .subscribe(res => {
        this.user = res;
      });

    this.onShowForm();
  }

  onSubmitButtonPressed() {
    this.validateForm();

    if (this.validationMsg !== '') {
      alert (this.validationMsg);
      this.validationMsg = '';
    } else {
      if (this.user.id === 0) {
        this.service.createUser(this.user);
      } else {
        this.service.updateUser(this.user);
      }

      this.onHideForm();
    }
  }

  validateForm() {
    for (let i = 1; i < Object.keys(this.user).length; i++) {
      let objVal = Object.values(this.user)[i];
      let objKey = Object.keys(this.user)[i];

      if (objKey !== 'sex'
        && objKey !== 'patronymic'
        && !(typeof objVal!=='undefined' && objVal)) {
        this.validationMsg += 'Field '
          + Object.keys(this.user)[i]
          + ' filled incorrect!\n';
      }
    }
  }

  onCloseButtonPressed() {
    this.onHideForm();
  }

  onSearchButtonPressed() {
    let operator = this.isExactMatch
      ? 'Equals'
      : 'Contains';

    for (let i = 0; i < Object.keys(this.searchFormData).length; i++) {
      let objKey = Object.keys(this.searchFormData)[i];
      let objVal = Object.values(this.searchFormData)[i];

      this.service.requestBody.filterDto.filterExpr.push(
        new FilterExpr(
          objKey,
          operator,
          objVal,
          '')
      );
    }

    if (this.searchBirthDate !== this.defaultDate) {
      this.service.requestBody.filterDto.filterExpr.push(
        new FilterExpr(
          'BirthDate',
          'Equals',
          new Date(this.searchBirthDate).toUTCString(),
          'date')
      );
    }

    this.service.refreshList();
  }

  onResetButtonPressed(form: NgForm) {
    this.searchFormData = new User();

    this.service.clearFilters();

    this.service.refreshList();

    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    form.form.reset();
  }

  onSortButtonPressed(sortCol: keyof User) {
    this.service.requestBody.sortDto.isChangeDirection = true;

    this.service.requestBody.sortDto.property = sortCol;

    this.service.refreshList();
  }

  onResetSortButtonPressed() {
    this.service.requestBody.sortDto.property = '';

    this.service.refreshList();
  }

  onChangePageSize() {
    this.service.requestBody.sortDto.isChangeDirection = false;

    this.service.requestBody.pagingDto.pageSize = parseInt(this.selectedPageSize);

    this.service.requestBody.pagingDto.pageNum = 1;

    this.service.refreshList();
  }

  onPrevPage(page: number) {
    this.service.requestBody.sortDto.isChangeDirection = false;

    if (page === 0) {
      this.service.requestBody.pagingDto.pageNum = 1;
    } else {
      this.service.requestBody.pagingDto.pageNum -= page;
    }

    this.service.refreshList();
  }

  onNextPage(page: number) {
    this.service.requestBody.sortDto.isChangeDirection = false;

    if (page === 0) {
      this.service.requestBody.pagingDto.pageNum = this.service.requestBody.pagingDto.pagesCount;
    } else {
      this.service.requestBody.pagingDto.pageNum += page;
    }

    this.service.refreshList();
  }

  goToPage() {
    this.service.requestBody.sortDto.isChangeDirection = false;

    if (this.goToPageVal > 0
      && this.goToPageVal <= this.service.requestBody.pagingDto.pagesCount) {
      this.service.requestBody.pagingDto.pageNum = this.goToPageVal;

      this.service.refreshList();
    } else {
      this.goToPageVal = 1;
    }
  }

  dateFormat(date: Date) {
    return formatDate(date,'dd.MM.yyyy', this.locale);
  }

  sexFormat(sex: number) {
    switch (sex) {
      case 1: return 'Female';
      default: return 'Male';
    }
  }

  // THIS IS ONLY FOR USERS WHICH DSN'T HAVE ANY USERS AND WANT TO FILL DB WITH SAMPLE VALUES //
  fillSampleUsers() {
    let u1 = new User();
    u1.firstName = 'Ali';
    u1.surname = 'Baba';
    u1.patronymic = 'Duch';
    u1.country = 'China';
    u1.city = 'Honk Kong';
    u1.sex = 0;
    u1.birthDate = new Date('01.05.1997');
    this.service.createUser(u1);

    setTimeout(() => {

    }, 2000);

    let u2 = new User();
    u2.firstName = 'Chon';
    u2.surname = 'Xi';
    u2.patronymic = 'Wei';
    u2.country = 'China';
    u2.city = 'Honk Kong';
    u2.sex = 0;
    u2.birthDate = new Date('06.02.1967');
    this.service.createUser(u2);

    setTimeout(() => {

    }, 2000);

    let u3 = new User();
    u3.firstName = 'Ung';
    u3.surname = 'Ho';
    u3.patronymic = 'Min';
    u3.country = 'China';
    u3.city = 'Honk Kong';
    u3.sex = 0;
    u3.birthDate = new Date('06.04.1976');
    this.service.createUser(u3);

    setTimeout(() => {

    }, 2000);

    let u4 = new User();
    u4.firstName = 'Lei';
    u4.surname = 'Wa';
    u4.patronymic = 'Kun';
    u4.country = 'Japan';
    u4.city = 'Tokyo';
    u4.sex = 1;
    u4.birthDate = new Date('10.12.2001');
    this.service.createUser(u4);

    setTimeout(() => {

    }, 2000);

    let u5 = new User();
    u5.firstName = 'Andrew';
    u5.surname = 'Petrov';
    u5.patronymic = 'Vasilyevich';
    u5.country = 'Kazakhstan';
    u5.city = 'Almaty';
    u5.sex = 0;
    u5.birthDate = new Date('03.04.2002');
    this.service.createUser(u5);

    setTimeout(() => {

    }, 2000);

    let u6 = new User();
    u6.firstName = 'Alisa';
    u6.surname = 'Samatova';
    u6.patronymic = 'Ermanovna';
    u6.country = 'Kazakhstan';
    u6.city = 'Tashkent';
    u6.sex = 1;
    u6.birthDate = new Date('05.08.1969');
    this.service.createUser(u6);

    setTimeout(() => {

    }, 2000);
  }
}
