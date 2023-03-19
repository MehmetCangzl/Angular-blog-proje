import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { CustomDataSourceService } from '../Service/custom-data-source.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employeeDataSource: any;
  countriesDataSource: any;
  constructor(private ds: CustomDataSourceService) {

  }

  ngOnInit(): void {
    this.countriesDataSource = this.ds
      .load('Country', { requireTotalCount: true})
      .setKey('code')
      .build();

    this.employeeDataSource = this.ds
      .load('Employee', { requireTotalCount: true})
      .insert('Employee')
      .updateFullModel('Employee', 'id')
      .remove('Employee')
      .setKey('id')
      .build();

  }
  onRowInserting= (e: any) => {
    console.log(e);
  }

  onRowUpdating = (e: any) => {
    console.log(e);
    var assign = (<any>Object).assign({}, e.oldData, e.newData);
    e.newData = assign;
  }
}
