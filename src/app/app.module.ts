import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DefaultComponent } from './admin/default/default.component';
import { SidebarComponent } from './admin/shard/sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { EmployeesComponent } from './employees/employees.component';
import { DxDataGridModule } from 'devextreme-angular';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CoreService } from './Service/core.service';
import { CustomDataSourceService } from './Service/custom-data-source.service';


const Ux_Modules = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
]

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    SidebarComponent,
    DashboardComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Ux_Modules,
    ToastrModule.forRoot(),
    DxDataGridModule
  ],
  providers: [
    CoreService,
    CustomDataSourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
