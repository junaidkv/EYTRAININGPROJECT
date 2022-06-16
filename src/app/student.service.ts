import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from './Models/api-models/student.model';
import { UpdateStudentRequest } from './Models/api-models/updateStudentRequest';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = "https://localhost:44353";
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

  deleteStudentDetails(studentId:string)
  {
    return this.httpClient.delete<student>(this.baseApiUrl+"/Student/"+studentId);
  }
}
