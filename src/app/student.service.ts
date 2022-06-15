import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from './Models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl="https://localhost:44353";
  constructor(private httpClient: HttpClient) { }

  getAllStudent():Observable<student[]>
  {
    return this.httpClient.get<student[]>(this.baseApiUrl+"/Student")
  }

  getStudentDetail(studentId:string):Observable<student>
  {
    return this.httpClient.get<student>(this.baseApiUrl+"/Student/"+studentId)
  }
}