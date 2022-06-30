import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { gender } from '../Models/api-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiUrl=environment.baseApiUrl;
  constructor(private readonly httpclient:HttpClient) { }

  getAllGenderDetails():Observable<gender[]>
  {
    return this.httpclient.get<gender[]>(this.baseApiUrl+'/gender')
  }
    
}

