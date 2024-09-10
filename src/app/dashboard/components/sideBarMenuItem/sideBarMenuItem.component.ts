import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar-menu-item',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './sideBarMenuItem.component.html',
  styleUrl: './sideBarMenuItem.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarMenuItemComponent {
  @Input({required: true}) icon: string = '';
  @Input({required: true}) title: string = '';
  @Input({required: true}) path: string = '';
 }
