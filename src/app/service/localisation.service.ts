import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Localisation } from '../models/localisation';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {


  constructor(private http : HttpClient) { }

  public getAllDep(region? :any) {
    return this.http.get< any >(`${environment.baseUrl}/user/get-all-dep/${region}`,);
  }

  public getAllRegions(){
    return this.http.get< any >(`${environment.baseUrl}/user/get-all-regions`);
  }
}
