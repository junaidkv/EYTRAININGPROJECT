import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { student } from 'src/app/Models/api-models/student.model';
import { gender } from 'src/app/Models/ui-models/gender.model';
import { GenderService } from 'src/app/Services/gender.service';
import { StudentService } from 'src/app/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  studentId: string | null | undefined;
  student:student={
    id:'',
    firstName:'',
    lastName:'',
    dateOfBirth:'',
    email:'',
    mobile:0,
    genderId:'',
    profileImageUrl:'',
    gender:{
      id:'',
      description:''
    },
    address:{
      id:'',
      postalAddress:'',
      physicalAddress:''
    }
  };
  genderList:gender[]=[];
  constructor(private readonly studentService: StudentService,private readonly genderService: GenderService, private readonly route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('studentId')
        if (this.studentId) {
          this.studentService.getStudentDetail(this.studentId).subscribe(
            (success) => {
              this.student=success;
            }, (error) => {
            console.error(error);
          }
          )
        }
      },
    );


      this.genderService.getAllGenderDetails().subscribe(
        (data)=>{
          this.genderList=data;
        },
        (error)=>{
          console.log(error);
        }
      );


  }

}
