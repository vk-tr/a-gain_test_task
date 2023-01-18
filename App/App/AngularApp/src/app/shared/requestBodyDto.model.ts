import {PagingDto} from "./pagingDto.model";
import {User} from "./user.model";
import {SortDto} from "./sortDto.model";
import {FilterDto} from "./filterDto.model";

export class RequestBodyDto {
  public pagingDto: PagingDto;
  public body: User[];
  public sortDto: SortDto;
  public filterDto: FilterDto;

  constructor() {
    this.body = [];
    this.pagingDto = new PagingDto();
    this.sortDto = new SortDto();
    this.filterDto = new FilterDto();
  }
}
