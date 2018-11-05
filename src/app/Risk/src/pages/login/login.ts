import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';
import { LoginService } from '../../services/loginService';
import { TokenModel } from './TokenModel';
import { LoginModel } from './LoginModel';
import { MapPage } from '../map/map';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[LoginService]
})
export class LoginPage {

Token:TokenModel;
loginModel = new LoginModel();//:LoginModel;
toastOptions:ToastOptions;


  constructor(public _navCtrl: NavController, public navParams: NavParams,private _service:LoginService,private _toast:ToastController ) {
  this.toastOptions = {message: 'Please verify you credentials',duration:4000}
 // this.loginModel = {userName:"", password:"",grant_type:""};
  }


onLoginSuccesful(token:string){
this._navCtrl.push(MapPage).then(()=>
this._navCtrl.remove(0,this._navCtrl.getActive().index));
console.log(token);
}

logUser(){
  this._service.login(this.loginModel.userName,this.loginModel.password,this.loginModel.grant_type)
  .subscribe(token=>{this.Token = token,this.onLoginSuccesful(this.Token.access_token)},
  ()=><any>this._toast.create(this.toastOptions).present());
}



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
