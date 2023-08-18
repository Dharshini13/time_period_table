import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableApiService } from 'src/table-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  overAllTime: any = [
    '12:00 am - 1:00 am',
    '1:00 am - 2:00 am',
    '2:00 am - 3:00 am',
    '3:00 am - 4:00 am',
    '4:00 am - 5:00 am',
    '5:00 am - 6:00 am',
    '6:00 am - 7:00 am',
    '7:00 am - 8:00 am',
    '8:00 am - 9:00 am',
    '9:00 am - 10:00 am',
    '10:00 am - 11:00 am',
    '11:00 am - 12:00 pm',
    '12:00 pm - 1:00 pm',
    '1:00 pm - 2:00 pm',
    '2:00 pm - 3:00 pm',
    '3:00 pm - 4:00 pm',
    '4:00 pm - 5:00 pm',
    '5:00 pm - 6:00 pm',
    '6:00 pm - 7:00 pm',
    '7:00 pm - 8:00 pm',
    '8:00 pm - 9:00 pm',
    '9:00 pm - 10:00 pm',
    '10:00 pm - 11:00 pm',
    '11:00 pm - 12:00 am',
  ];
  dataSource?: any;
  constructor(private dataService: TableApiService) {}
  displayedColumns: string[] = [
    'Time_Period',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  result: any;

  ngOnInit() {
    this.dataService.getData().subscribe((data: any) => {
      const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      this.result = data.map((item: any) => {
        const dateTime = new Date(item.date_time);
        const day = daysOfWeek[dateTime.getUTCDay()];
        const date = dateTime.toISOString().split('T')[0];
        const time = dateTime.toISOString().split('T')[1].substr(0, 8); // Extracting HH:MM:SS
        const hour = dateTime.getUTCHours();
        const period = hour < 12 ? 'am' : 'am';
        const formattedHourStart = hour % 12 === 0 ? 12 : hour % 12;
        const formattedHourEnd = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12;
        const Time_Period = `${formattedHourStart}:00 ${period} - ${formattedHourEnd}:00 ${period}`;
        return {
          day,
          date,
          time,
          Time_Period,
          display_value: item.display_value,
        };
      });
      this.createTableData();
      this.dataSource = new MatTableDataSource(this.overAllTime);
    });
  }

  createTableData() {
    this.overAllTime = this.overAllTime.map((timePeriod: any) => {
      const newRow: any = { Time_Period: timePeriod };
      this.displayedColumns.slice(1).forEach((day) => {
        const matchingResItem = this.result.find(
          (item: any) => item.day === day && item.Time_Period === timePeriod
        );
        newRow[day] = matchingResItem ? matchingResItem.display_value : '-';
      });
      console.log('finalResult',newRow.Time_Period);

      return newRow;
    });
  }

}
