import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from "@angular/common/http";
import {RequestBodyDto} from "./requestBodyDto.model";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private SpinnerService: NgxSpinnerService) { }

  public authFormData: User = new User();

  public requestBody = new RequestBodyDto();

  private _crudUrl = "/api/users/crud";

  refreshList() {
    this.SpinnerService.show();

    this.getAllUsers()
      .then(
        res => {
          this.requestBody = res as RequestBodyDto;

          setTimeout(() => {
            this.SpinnerService.hide();
          }, 500);

          this.clearFilters();
        }
      );
  }

  public getAllUsers() {
    return this.http.post(
      this._crudUrl + '/getAllUsers', this.requestBody)
      .toPromise();
  }

  getUser(id: number) {
    return this.http.get<User>(this._crudUrl + '/' + id);
  }

  createUser(user: User) {
    this.http.post<User>(this._crudUrl, user)
      .subscribe(
        res => {
          this.refreshList();
        },
        error => {
          alert(error);
        });
  }

  updateUser(user: User) {
    this.http.put<User>(this._crudUrl, user)
      .subscribe(
        res => {
          this.refreshList();

          return res;
        },
        error => {
          alert(error);
        });
  }

  deleteUser(id: number) {
    this.http.delete<User>(this._crudUrl + `/${id}`)
      .subscribe(
        res => {
          this.refreshList();
        },
        error => {
          alert(error);
        });
  }

  clearFilters() {
    this.requestBody.filterDto.filterExpr = [];
  }
}
