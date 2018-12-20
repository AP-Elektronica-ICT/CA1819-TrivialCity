import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { RegisterPage } from '../pages/register/register';
import { MapPage } from '../pages/map/map';
import { BattlePhasePage } from '../pages/battle-phase/battle-phase';
import { ArmyPage } from '../pages/army/army';
import { TeamPage } from '../pages/team/team';
import { ProfilePage } from '../pages/profile/profile';
import { BattlePhaseContPage } from '../pages/battle-phase-cont/battle-phase-cont';
import {HttpClientModule} from '@angular/common/http'
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';
import { AuthService } from '../services/auth.service';

import { IonicStorageModule } from '@ionic/storage';
import { ApiService } from '../services/api.service';
import { Http, HttpModule } from '@angular/http';
import {NgProgressModule} from "ng2-progressbar"
import { TeamViewPage } from '../pages/teamView/teamView';
import { TeamViewModule } from '../pages/teamView/teamView.module';
import { SignalrService } from '../services/signalR.service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RegisterPage,
    MapPage,
    BattlePhasePage,
    ArmyPage,
    TeamPage,
    ProfilePage,
    BattlePhaseContPage,
    TeamViewPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    NgProgressModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    RegisterPage,
    ArmyPage,
    TeamPage,
    TeamViewPage,
    BattlePhasePage,
    ProfilePage,
    BattlePhaseContPage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    ApiService,
    SignalrService,
    //HTTP,
    //Storage,
    AuthService,
    DeviceOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
