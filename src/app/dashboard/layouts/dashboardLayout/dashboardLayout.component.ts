import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GlobalLayoutComponent } from "../globalLayout/globalLayout.component";
import { HeaderLayoutComponent } from "../headerLayout/headerLayout.component";
import { MenuLayoutComponent } from "../menuLayout/menuLayout.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    GlobalLayoutComponent,
    HeaderLayoutComponent,
    MenuLayoutComponent,
    RouterOutlet
],
  templateUrl: './dashboardLayout.component.html',
  styleUrl: './dashboardLayout.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DashboardLayoutComponent { }
