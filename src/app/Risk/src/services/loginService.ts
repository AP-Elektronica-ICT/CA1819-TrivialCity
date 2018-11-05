import { Injectable } from "@angular/core";
import{HttpClient,HttpResponse,HttpRequest} from '@angular/common/http';
import 'rxjs';
import { Observable } from "rxjs/Observable";
import { stringify } from "@angular/core/src/render3/util";





@Injectable()
export class LoginService{

baseUrl:string='http://localhost:41057/';

constructor(private _httpClient:HttpClient){}

    login(userName:string,password:string,grant_type:string){
        return this._httpClient.post(this.baseUrl+'token','username='+userName+'&password='+password+'&grant_type='+grant_type)
        .map(Response=><string>Response)
        .catch(this.handleError)
    }

    private handleError(error:HttpResponse<any>){
      console.log(error);
      return Observable.throw(error.body || 'Server error');  
    }
}

