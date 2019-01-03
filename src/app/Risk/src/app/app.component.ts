import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import { MapPage } from '../pages/map/map';
import { BattlePhasePage } from '../pages/battle-phase/battle-phase';
import { ArmyPage } from '../pages/army/army';
import { TeamPage } from '../pages/team/team';
import { ProfilePage } from '../pages/profile/profile';
import { BattlePhaseContPage } from '../pages/battle-phase-cont/battle-phase-cont';

// Import Auth0Cordova
import Auth0Cordova from '@auth0/cordova';
import { TeamViewPage } from '../pages/teamView/teamView';
import { SignalrService } from '../services/signalR.service';
import { ShopPage } from '../pages/shop/shop';


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = RegisterPage;

  pages: Array<{title: string, component: any}>;

  ngOnInit(): void {
    this.SingalRservice.RunSignalR();
  }
  /*ionViewDidLoad() {
    this.SingalRservice.RunSignalR();
  }*/

  


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen , private SingalRservice: SignalrService) {
    this.initializeApp();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Redirect back to app after authenticating
      (window as any).handleOpenURL = (url: string) => {
        Auth0Cordova.onRedirectUri(url);
      }
    });

   
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'List', component: ListPage },
      { title: 'Map', component: MapPage },
      { title: 'Army', component: ArmyPage },
      { title: 'Team', component: TeamViewPage },
      { title: 'Register', component: RegisterPage },
      { title: 'Battle Phase', component: BattlePhasePage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Shop', component: ShopPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
}
