import { Injectable } from '@angular/core';
import { DatasetController } from 'chart.js';

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
    let dateFrom = new Date(inputDateStringFrom);
    let dateTo = new Date(inputDateStringTo);
    //return this.todayDate>dateTo
    // if(this.todayDate>dateTo){
    //   return 1;
    // }else if(this.todayDate<dateFrom){
    //   return -1;
    // }else{
    //   return 0;
    // }

    if(this.todayDate<dateFrom) 
      return -1;
    else if(this.todayDate>dateTo)
      return 1;
    else 
      return 0;
  }

}
