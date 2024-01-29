import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Student } from '../modal/student';
import { ToastService } from '../services/toastr.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentsList: Student[] = [];
  studentObj: Student = {
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    day_of_birth: '',
    phone_number: '',
    password: '',
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  phone_number: string = '';
  day_of_birth: '';
  password: '';


  constructor(private auth: AuthService, private DataService: DataService, private toastr: ToastService) { }

  //notifications

  OnShowAddedStudentSuccess() {
    this.toastr.showStudentAddSucces();
  }

  OnShowAddedStudentWarning() {
    this.toastr.showAddStudentWarning();
  }

  ngOnInit(): void {

  }
  OnUserLogout() {
    // this.auth.logout();
  }

  OnResetedForm(){
    this.first_name = '',
    this.last_name = '',
    this.email = '',
    this.phone_number = ''
  }

  OnAddedStudent() {
    this.studentObj.id = '';
    this.studentObj.first_name = this.first_name;
    this.studentObj.last_name = this.last_name;
    this.studentObj.email = this.email;
    this.studentObj.phone_number = this.phone_number;
    this.studentObj.password = this.password;

    var token = this.auth.getToken()
    this.DataService.addStudent(this.studentObj, token).subscribe({

      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Login failed', error);
        // this.errorMessage = 'Invalide email or password';
      }
    });
    // this.OnShowAddedStudentSuccess();
    // this.OnResetedForm();
    //console.warn("Student added:" + this.studentObj.first_name + ' ' + this.studentObj.last_name)
  }
}
