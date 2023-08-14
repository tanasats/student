import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodayService {
  private todayDateTimeStrig:string;
  private todayDateTime:Date;
  private todayDateString:string;
  private todayDate:Date;
  constructor() { 
    console.log("today service constructor()");
    this.todayDateTime=new Date();
    this.todayDateTimeStrig = this.todayDateTime.toISOString();
    this.todayDateString = this.todayDateTimeStrig.slice(0, 10);
    this.todayDate = new Date(this.todayDateString);
  }

  isExpired(inputDateString:string) :boolean{ //compare text yyyy-MM-dd
    return (inputDateString<this.todayDateString);
  }

  isBegin(inputDateString:string):boolean{
    return (inputDateString>=this.todayDateString);
  }

  isBetween(inputDateStringFrom:string,inputDateStringTo:string):number{
    if(this.todayDateString<inputDateStringFrom){
      return -1;
    }else if(this.todayDateString>inputDateStringTo){
      return 1;
    }else{
      return 0;
    }
  }

}
