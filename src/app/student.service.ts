import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddStudentRequest } from './Models/api-models/addStudentRequest.Model';
import { student } from './Models/api-models/student.model';
import { UpdateStudentRequest } from './Models/api-models/updateStudentRequest';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = environment.baseApiUrl;
  constructor(private httpClient: HttpClient) { }

  getAllStudent(): Observable<student[]> {
    return this.httpClient.get<student[]>(this.baseApiUrl + "/Student")
  }

  getStudentDetail(studentId: string): Observable<student> {
    return this.httpClient.get<student>(this.baseApiUrl + "/Student/" + studentId)
  }

  updateStudentDetails(studentId: string, formRequest: student): Observable<student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: formRequest.firstName,
      lastName: formRequest.lastName,
      email: formRequest.email,
      mobile: formRequest.mobile,
      dateOfBirth: formRequest.dateOfBirth,
      physicalAddress: formRequest.address.physicalAddress,
      postalAddress: formRequest.address.postalAddress,
      genderId: formRequest.genderId
    }
    return this.httpClient.put<student>(this.baseApiUrl + "/Student/" + studentId,updateStudentRequest)
  }

  addStudentDetails(formRequest: student): Observable<student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: formRequest.firstName,
      lastName: formRequest.lastName,
      email: formRequest.email,
      mobile: formRequest.mobile,
      dateOfBirth: formRequest.dateOfBirth,
      physicalAddress: formRequest.address.physicalAddress,
      postalAddress: formRequest.address.postalAddress,
      genderId: formRequest.genderId
    }
    return this.httpClient.post<student>(this.baseApiUrl + "/Student",addStudentRequest)
  }

  deleteStudentDetails(studentId:string):Observable<student>
  {
    return this.httpClient.delete<student>(this.baseApiUrl+"/Student/"+studentId);
  }

  uploadImage(studentId:string, file:File):Observable<any>
  {
    const formData = new FormData();
    formData.append("profileImage",file);
    return this.httpClient.post(this.baseApiUrl+'/Student/'+ studentId +'/upload-image',
    formData, {
      responseType:'text'
    })

  }

  getImagePath(relativePath:string)
  {
    return `${this.baseApiUrl}/${relativePath}`;
  }

}
