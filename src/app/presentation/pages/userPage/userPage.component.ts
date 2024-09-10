import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../interfaces/user.interface';
import { ButtonModule } from 'primeng/button';
import { ModalService } from '../../services/modal.service';
import { UserFormComponent } from '../../component/userForm/userForm.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './userPage.component.html',
  styleUrl: './userPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserPageComponent implements OnInit{

  private userService = inject(UserService);
  private modalService = inject(ModalService)
  public users = computed<UserModel[]>(()=>this.userService.users())

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.getUsers().subscribe();
  }

  modaUser(){
    this.modalService.openComponent(UserFormComponent, { header: 'Crear usuario', width: '60%' })
  }

}
