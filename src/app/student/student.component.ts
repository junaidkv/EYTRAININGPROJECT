import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../Models/ui-models/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  Students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender','edit'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString='';


  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getAllStudent()
      .subscribe(
        (successResponce) => {
          this.Students = successResponce
          this.dataSource = new MatTableDataSource<Student>(this.Students);
          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator
          }
          if(this.matSort)
          {
            this.dataSource.sort = this.matSort
          }
        },
        (error) => {
          console.error(error);
        }

      );

  }

  filterStudents()
  {
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }
}
