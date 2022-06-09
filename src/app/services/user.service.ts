import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: string = null;
  private _isSuperUser: boolean = false;
  private _workStation: string = null;

  constructor() {
    this.load();
  }

  load = () => {
    if (this.isValid()) {
      const user = localStorage.getItem('userId');
      if (user) {
        this._user = user;
      }

      const iSuperUser = localStorage.getItem('isSuperUser');
      if (iSuperUser) {
        this._isSuperUser = iSuperUser === 'true';
      }

      const workStation = localStorage.getItem('workStation');
      if (workStation) {
        this._workStation = workStation;
      }
    }
  }

  isValid = () => {
    const user = localStorage.getItem('userId');

    if (!user) {
      return false;
    }

    return true;
  }

  get User(): string {
    return this._user;
  }

  set User(user: string) {
    localStorage.setItem('userId', user);
    this._user = user;
  }

  get IsSuperUser(): boolean {
    return this._isSuperUser;
  }

  set IsSuperUser(flag: boolean) {
    localStorage.setItem('isSuperUser', flag + '');
    this._isSuperUser = flag;
  }

  get WorkStation(): string {
    return this._workStation;
  }

  set WorkStation(workStation: string) {
    localStorage.setItem('workStation', workStation);
    this._workStation = workStation;
  }
}
