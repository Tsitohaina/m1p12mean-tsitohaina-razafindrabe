import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../user/models/User';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: IUser[], searchText: string): IUser[] {
    if (!users || !searchText) {
      return users;
    }
    return users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

}
