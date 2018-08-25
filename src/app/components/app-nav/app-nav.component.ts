import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent {

  dates$: any[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  displayedColumns;
  dataSource = [
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' },
    { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }, { name: '', star: '' }
  ];
  constructor(private breakpointObserver: BreakpointObserver) {
    // const fromDate = moment();
    // const toDate = moment().add(7, 'days');
    const fromDate = moment().startOf('month').week();
    console.log(fromDate);
    const toDate = moment().endOf('month').week();
    console.log(toDate);

    const calendar = [];
    for (let week = fromDate; week < toDate; week++) {
      calendar.push({
        week: week,
        days: Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
      });
    }

    console.log(calendar);
    // window['moment'] = moment;
    this.dates$ = this.getMonthDays(moment().format('MMM'), 2018); // this.enumerateDaysBetweenDates(fromDate, toDate);
    console.log(this.dates$);
    this.displayedColumns = ['name'].concat(this.dates$);

    console.log(this.displayedColumns);
  }

  getMonthDays(month, year) {
    const ar = [];
    // tslint:disable-next-line:quotemark
    const start = moment(year + '-' + month, "YYYY-MMM");
    for (const end = moment(start).add(1, 'month'); start.isBefore(end); start.add(1, 'day')) {
      ar.push(start.format('DD/MM/YYYY'));
    }
    return ar;
  }

  enumerateDaysBetweenDates(startDate, endDate) {
    const now = startDate, dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format('M/D/YYYY'));
      now.add(1, 'days');
    }
    return dates;
  }
}
