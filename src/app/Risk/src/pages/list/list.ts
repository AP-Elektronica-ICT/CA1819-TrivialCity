import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiService, Player, Token } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr';
import { SignalrService } from '../../services/signalR.service';
import { cpus } from 'os';
import { TeamPage } from '../team/team';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  players: Player[] = [];
  playerLevels: number[] = [];
  src: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService, public auth: AuthService, private alertC: AlertController, private SingalRservice: SignalrService) {

  }

  ionViewDidLoad() {
    console.log("'ionViewDidLoad ListPage'");
    this.service.GetPlayers().subscribe(data => {
      this.players = data;
      this.SortPlayers();
      this.RankChecker();
    });
  }

  SortPlayers() {
    this.players.sort((a, b) => b.playerLevel - a.playerLevel);
    console.log("players sorted by level: " + this.players);
  }


  RankChecker() {

    this.players.forEach(Player => {
      if (Player.playerLevel < 5) { this.src.push('../../assets/imgs/ranks/private.png')}
      else if (Player.playerLevel >= 50) { this.src.push('../../assets/imgs/ranks/sergeant_major_of_the_army.png')}
      else if (Player.playerLevel >= 45) { this.src.push('../../assets/imgs/ranks/command_sergeant_major.png')}
      else if (Player.playerLevel >= 40) { this.src.push('../../assets/imgs/ranks/sergeant_major.png')}
      else if (Player.playerLevel >= 35) { this.src.push('../../assets/imgs/ranks/first_sergeant.png')}
      else if (Player.playerLevel >= 30) { this.src.push('../../assets/imgs/ranks/master_sergeant.png')}
      else if (Player.playerLevel >= 25) { this.src.push('../../assets/imgs/ranks/sergeant_first_class.png')}
      else if (Player.playerLevel >= 20) { this.src.push('../../assets/imgs/ranks/staff_sergeant.png')}
      else if (Player.playerLevel >= 15) { this.src.push('../../assets/imgs/ranks/sergeant.png')}
      else if (Player.playerLevel >= 10) { this.src.push('../../assets/imgs/ranks/corporal.png')}
      else if (Player.playerLevel >= 5) { this.src.push('../../assets/imgs/ranks/private_first_class.png')}
    });


  }


}
