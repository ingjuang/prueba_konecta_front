import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './userForm.component.html',
  styleUrl: './userForm.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  private fb = inject(FormBuilder)
  private userService = inject(UserService)
  private modalService = inject(ModalService)

  public myForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required]
  })


  saveUser(){
    console.log();
    const body = this.myForm.getRawValue();

    this.userService.createUser(body).subscribe({
      next:(res)=>{
        this.userService.getUsers().subscribe({
          next: ()=> {
            this.modalService.closeComponent()
            Swal.fire('Usuario Creado', 'Usuario creado', 'success');
        }
        });
      }
    })
  }
 }
