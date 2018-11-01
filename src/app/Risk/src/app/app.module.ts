import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { LoginPage } from '../pages/login/login';
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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    MapPage,
    BattlePhasePage,
    ArmyPage,
    TeamPage,
    ProfilePage,
    BattlePhaseContPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    LoginPage,
    RegisterPage,
    ArmyPage,
    TeamPage,
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
    //Storage,
    AuthService,
    DeviceOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
