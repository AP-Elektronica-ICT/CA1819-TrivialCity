import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Rx';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { Body } from '@angular/http/src/body';
import { ContentType } from '@angular/http/src/enums';
import "rxjs/Rx";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';




@Injectable()
export class testapi extends BaseService {
  private baseApi: string = 'http://172.16.155.154:53169/api';         //'http://172.16.210.101:53169/api/'    ;// 'http://169.254.193.167:53169/api/';  // 'http://localhost:53169/api/';      <--- eigen ip address invullen 

  AuhtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qZ3dSRVl3TkRjMk56aENOMFUwTXprek5rUTJRemxDUTBFNVJrTTRRVGsyUmpCRVF6TTRRUSJ9.eyJpc3MiOiJodHRwczovL2luaWFzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJPSDZMdFdQdTZwMnU0VlNuU3ducDRQbmFleGJVVWd6d0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9BbnR3ZXJwUmlzay9hcGkiLCJpYXQiOjE1NDMwNzA3MzgsImV4cCI6MTU0MzE1NzEzOCwiYXpwIjoiT0g2THRXUHU2cDJ1NFZTblN3bnA0UG5hZXhiVVVnenciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.QMt7oHNpHNRqcRTqtL8nsp-gHGpJrRdMH3hRlDr86N1QVE-8kuSRL0L0CAUTOEiro4UbidmzAHLfAhwKFwizlSlToB1dV81_hakFks06Tak_2w3UXoy_MotjdfenxOJGnMPiCYGuOPEIzkK-0JyP_mi2-wPwHDJ2cpPkGOBnyu0WKmX-Mev5-hR6BVy1B5Sqwdtvw5pU6D_nMFvOlnF5DQjZ0kyyQ1enlKbMkNmS9HFS--SN2d2qDPwjIUXu4PLlnhvy88F2oW5wGNZBJ8JrgMbcV65PfqBkG463p3laxR6KM2AFZLh_-BoeXpFDAwhctFBiUs177onlelz62A-apA";
  token2: Token;
  Body: any;

  constructor(private http: HttpClient) {
    super();
  }

  private httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
       
        "Access-Control-Allow-Origin": "*",
        
       // "Access-Control-Allow-Credentials": "true",
       // "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
        // 'Authorization': `Bearer ${this.auth.access_token}`
    })
  }


getplaaayers(): Observable<Players[]>{ // goeie get functie
  return this.http.get<Players[]>(`${this.baseApi}/player` );//,this.httpOptions);

}
  getP() {//: Observable<Players[]> {
    /* const authToken = this.AuhtToken//localStorage.getItem('access_token');
     let headers = new Headers({ 'Content-Type': 'application/json' });
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', `Bearer ${authToken}`);
     let options = new RequestOptions({ headers: headers });
     
 
     
     return this.http.get(this.baseApi + '/player/', options)
     .map((response) => { return <Players[]>response.json() })
     .catch(this.handleError);*/




    var request = require("request");
    console.log("test word gedrukt");
    var options = {
      method: 'GET',
      url: `${this.baseApi}/player`,  /**api/values',*/
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.AuhtToken}` }
    };

    request(options, function (error, response, body) {
      this.Body = body;
      console.log("hello your in1");
      if (error) throw new Error(error);
      this.Body = body;
      console.log("hello your in2");
      console.log(body);
    });
    console.log(this.Body);
    console.log("komt tot einde");
    console.log(this.token2);
    //console.log(this.token2.access_token);

  }

  getUsers() {
    /*
        return new Promise(resolve => {
          this.http.get(this.baseApi+'/player').subscribe(data => {
            resolve(data);
          }, err => {
            console.log(err);
          });
        });
      }
    
      */
  }





}



export interface Players {
  PlayerId: string;
  PlayerUsername: string;
  PlayerEmail: string;
}

export interface Token {
  access_token: string;
  expires_in: number;
  token_type: string;
}