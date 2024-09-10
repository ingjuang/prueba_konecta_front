import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-global-layout',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './globalLayout.component.html',
  styleUrl: './globalLayout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalLayoutComponent { }
