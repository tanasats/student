import { Injectable } from '@angular/core';
import { DatasetController } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class TodayService {
  private todayDate:Date;
  //private todayThaiDateString:string;
  //private todayDateTime:Date;
  //private todayDateString:string;

  private todayThaiDate:Date;
  private ThaiOffset = 7*60*60*1000;

  constructor() { 
    
    this.todayDate=new Date(); //<-- this is UTC+7
    this.todayThaiDate = new Date(this.todayDate.getTime()+this.ThaiOffset)

    // this.todayThaiDateString = this.todayThaiDate.toISOString();
    // this.todayThaiDateString = this.todayThaiDateString.slice(0, 10);
    // this.todayDate = new Date(this.todayThaiDateString);
    
    console.log("today service constructor() todayDate :",this.todayDate);
  }


  isBetween(inputDateStringFrom:string,inputDateStringTo:string):number{
    let dateFrom = new Date(inputDateStringFrom);
    let dateTo = new Date(inputDateStringTo);
    dateFrom = new Date(dateFrom.getTime()-this.ThaiOffset);
    dateTo = new Date(dateTo.getTime()-this.ThaiOffset+((24*60*60*1000)-1)); //<-- adjust day ended time 23:59:59

    //console.log(this.todayDate,'-',dateFrom,'-',dateTo);
    if(this.todayDate<dateFrom){
      return -1;
    } else if(this.todayDate>dateTo){
      return 1;
    } else {
      return 0;
    }    
  }

}
