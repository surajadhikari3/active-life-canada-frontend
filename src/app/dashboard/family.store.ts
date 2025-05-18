import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class FamilyStore{
  readonly familyGroup = signal<any | null>(null);

  setFamilyGroup(data: any){
    this.familyGroup.set(data);
    console.log("fG", this.familyGroup());
  }

  reset(){
    this.familyGroup.set(null);
  }
}

