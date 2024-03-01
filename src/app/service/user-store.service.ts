import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName = new BehaviorSubject<String>("");
  private role = new BehaviorSubject<String>("");

  constructor() { }

  public getRoleFromStore(){
    return this.role.asObservable();
  }

  public setRoleForStore(role:string){
    this.role.next(role);
  }

  public getFullNameFromStore(){
    return this.fullName.asObservable();
  }

  public setFullNameForStore(fullname:string){
    this.fullName.next(fullname);
  }
  
}
