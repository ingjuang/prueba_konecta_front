import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header-layout',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './headerLayout.component.html',
  styleUrl: './headerLayout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderLayoutComponent { }
