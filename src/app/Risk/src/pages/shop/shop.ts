import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService, Player } from '../../services/api.service';

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  mode: Boolean = true;
  player: Player;
  troops: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
    this.service.GetPlayer(this.service.GetYourId()).subscribe(data => {
      this.player = data
    })
  }


  SetMode(mode: number) {
    if (mode == 1) {
      this.mode = true;
    }
    else if (mode == 2) {
      this.mode = false;
    }
  }

  SelectTroops(troopsSelected: number, silverCoinCost: number) {

    if (troopsSelected == 1 && this.player.playerSilverCoins >= silverCoinCost) {
     this.AddTroops(troopsSelected, silverCoinCost);
    }

    if (troopsSelected == 5 && this.player.playerSilverCoins >= silverCoinCost) {
      this.AddTroops(troopsSelected, silverCoinCost);
    }

    if (troopsSelected == 10 && this.player.playerSilverCoins >= silverCoinCost) {
      this.AddTroops(troopsSelected, silverCoinCost);
    }

    if (troopsSelected == 50 && this.player.playerSilverCoins >= silverCoinCost) {
      this.AddTroops(troopsSelected, silverCoinCost);
    }
  }

  AddTroops(troopsToAdd: number, silverCoins: number){
    this.service.PutPlayer(this.player.playerId, {
      playerId: `${this.player.playerId}`,
      playerReserveTroops: `${this.player.playerReserveTroops + troopsToAdd}`,
      playerSilverCoins: `${this.player.playerSilverCoins - silverCoins}`,
    }).subscribe(data => this.player = data)
  }

  AddCoins(coins: number) {
    this.service.PutPlayer(this.player.playerId, {
      playerId: `${this.player.playerId}`,
      playerSilverCoins: `${this.player.playerSilverCoins + coins}`
    }).subscribe(data => this.player = data)
  }

  checkCoins() {
    console.log(this.player.playerSilverCoins);
  }

}
