import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { student } from 'src/app/Models/api-models/student.model';
import { gender } from 'src/app/Models/ui-models/gender.model';
import { Student } from 'src/app/Models/ui-models/student';
import { GenderService } from 'src/app/Services/gender.service';
import { StudentService } from 'src/app/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {
  displayProfileImageUrl: string = ''
  studentId: string | null | undefined;
  student: student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      postalAddress: '',
      physicalAddress: ''
    }
  };
  genderList: gender[] = [];
  constructor(private router: Router, private snackbar: MatSnackBar, private readonly studentService: StudentService, private readonly genderService: GenderService, private readonly route: ActivatedRoute) { }
  isNewStudent = true;
  header: string = '';
  @ViewChild('studentDetailForm') studentDetailForm?: NgForm;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('studentId')
        if (this.studentId) {

          if (this.studentId.toLowerCase() === "Add".toLowerCase()) {
            this.isNewStudent = true;
            this.header = "Add New Student Details"
            this.setImage();

          }
          else {
            this.isNewStudent = false;
            this.header = "Edit Student Details"
            this.studentService.getStudentDetail(this.studentId).subscribe(
              (success) => {
                this.student = success;
                this.setImage();
              }, (error) => {
                console.error(error);
              }
            )
          }
        }
      },
    );

    this.genderService.getAllGenderDetails().subscribe(
      (data) => {
        this.genderList = data;
      },
      (error) => {
        console.log(error);
      }
    );


  }

  private setImage(): void {
    if (this.student.profileImageUrl) {
      this.displayProfileImageUrl = this.studentService.getImagePath(this.student.profileImageUrl);
    }
    else {
      this.displayProfileImageUrl = '/assets/3135715.png'
    }
  }

  uploadImage(event: any): void {
    if (this.studentId) {
      const file: File = event.target.files[0];
      this.studentService.uploadImage(this.studentId, file).subscribe(
        (succes) => {
          this.student.profileImageUrl = succes
          this.setImage();
          this.snackbar.open("Profile Image Updated Successfully !", undefined, {
            duration: 1000,
          });
        }, (error) => {
          console.log(error)
        }
      )
    }
  }
  onUpdate(studentId: string, formRequest: Student): void {
    if (this.studentDetailForm?.form.valid)
    {
      this.studentService.updateStudentDetails(studentId, formRequest).subscribe(
        (data) => {
          console.log(data);
          this.snackbar.open("Updated Successfully !", undefined, {
            duration: 1000,
          })
        }, (error) => {
          console.log(error)
        }
      )
    }
  }

  onAddStudent() {

    if (this.studentDetailForm?.form.valid) {
      this.studentService.addStudentDetails(this.student).subscribe(
        (success) => {
          console.log(success);
          this.snackbar.open("Student Registered Successfully !", undefined, {
            duration: 1000,
          });
          setTimeout(() => {
            this.router.navigateByUrl("students/" + success.id),
              1000
          })
        },
        (error) => {
          console.log(error);
        }
      )
    }

  }

  onDelete(studentId: string): void {
    this.studentService.deleteStudentDetails(studentId).subscribe(
      (data) => {
        console.log(data);
        this.snackbar.open("delete Successfully !", undefined, {
          duration: 1000,
        });
        setTimeout(() => {
          this.router.navigateByUrl("students"),
            1000
        })

      }, (error) => {
        console.log(error)
      }
    )
  }

}
