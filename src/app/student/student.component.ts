import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Student } from '../Models/ui-models/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  Students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender', 'edit', 'delete'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';


  constructor(private spinner: NgxSpinnerService,private router: Router, private snackbar: MatSnackBar, private studentService: StudentService) { }

  ngOnInit(): void {
   
   this.spinner.show();
    this.studentService.getAllStudent()
      .subscribe(
        (successResponce) => {
          
          this.Students = successResponce
          this.dataSource = new MatTableDataSource<Student>(this.Students);
          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator
          }
          if (this.matSort) {
            this.dataSource.sort = this.matSort
          }
          this.spinner.hide();
        },
        (error) => {
          console.error(error);
          this.spinner.hide();
        }

      );

  }

  onDelete(studentId: string): void {
    if (confirm("Are you sure to delete ")) {
     this.spinner.show();
      this.studentService.deleteStudentDetails(studentId).subscribe(
        (data) => {
          console.log(data);
          this.snackbar.open("delete Successfully !", undefined, {
            duration: 1000,
          });
          setTimeout(() => {
            console.log("Implement delete functionality here");
            location.reload();
            1000
          })
         this.spinner.hide();
        }, (error) => {
          console.log(error)
         this.spinner.hide();
        }
      )
    }
  }

  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
}
