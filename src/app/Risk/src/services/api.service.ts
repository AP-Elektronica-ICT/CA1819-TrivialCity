import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { pluck, share, shareReplay, tap, delay } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { Body } from '@angular/http/src/body';
import { ContentType } from '@angular/http/src/enums';
import "rxjs/Rx";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';




@Injectable()
export class ApiService extends BaseService {
  private baseApi: string = 'https://riskantwerprest.azurewebsites.net/api';         //'http://172.16.210.101:53169/api/'    ;// 'http://169.254.193.167:53169/api/';  // 'http://localhost:53169/api/';      <--- eigen ip address invullen 

 
  PlayerID: number;
  public areas: Area[] = [];
  public player: Player;
  public team: Team;
  authToken: Token = {'access_token' : " ", 'expires_in' : 2000 , 'token_type' : "Bearer"};

  constructor(private http: HttpClient) {
    super();
  }


  private httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken.access_token}`
    })
  }

  private httpHeader2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }


  GetToken() {
    this.http.post<Token>(`https://inias.eu.auth0.com/oauth/token`, {"client_id":"OH6LtWPu6p2u4VSnSwnp4PnaexbUUgzw","client_secret":"tRpfMy--Vv3b2rlNFNLwMqVey2YAVj4W0dy3C33VaJrfaPdzGOInqbXbDtijinn0","audience":"https://AntwerpRisk/api","grant_type":"client_credentials"}, this.httpHeader2)
    .subscribe(data => 
      {
        this.authToken = data;
      });
  }


  testPost() {
    return this.http.post(`${this.baseApi}/notification`, this.httpHeader);
  }

  GetPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseApi}/player`, this.httpHeader);
  }

  PostPlayer(body: any): Observable<Player> {
    return this.http.post<Player>(`${this.baseApi}/player`, body, this.httpHeader);
  }

  GetPlayer(_number: number): Observable<Player> {
    return this.http.get<Player>(`${this.baseApi}/player/${_number}`, this.httpHeader);
  }

  GetAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.baseApi}/area`, this.httpHeader);
  }

  GetArea(_number: number): Observable<Area> {
    return this.http.get<Area>(`${this.baseApi}/area/${_number}`, this.httpHeader);
  }

  PutPlayer(_number: number, body: any): Observable<Player> {
    return this.http.put<Player>(`${this.baseApi}/player/${_number}`, body, this.httpHeader);
  }

  PutArea(_number: number, body: any): Observable<Area> {
    return this.http.put<Area>(`${this.baseApi}/area/${_number}`, body, this.httpHeader);
  }

  GetYourId(): number {
    return this.PlayerID;

  }

  GetYourAuthId(authId: string): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseApi}/player/auth0?=${authId}`, this.httpHeader);
  }

  GetTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseApi}/team`, this.httpHeader);

  }

  GetTeamAreas(teamId: number): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.baseApi}/area/teamId?=${teamId}`, this.httpHeader);
  }

  GetTeam(_number: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseApi}/team/${_number}`, this.httpHeader);
  }

  ChangeId(_id: number) { // veranderd id naar id van de gebruiker
    this.PlayerID = _id;
  }

  GetTeamPlayers(_number: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseApi}/team/${_number}/players`, this.httpHeader);
  }

  getAreaPositions(_number: number): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.baseApi}/area/${_number}/positions`, this.httpHeader);
  }

  getAreaPlayers(_number: number): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseApi}/area/${_number}/players`, this.httpHeader);
  }

  GetYourTeam() {
    return this.http.get(`${this.baseApi}/player/${this.GetYourId}/team`, this.httpHeader);
  }

  SetTheme(mode: String){ // zet thema in kleur van team van de gebruiker
    if(mode == "hex"){
      if(this.player.teamId == 1){ return '#4285F4' }
      else if(this.player.teamId == 2){ return '#ff4444' }
      else if(this.player.teamId == 3) { return '#00c851' }
      else if(this.player.teamId == 4) { return '#ffeb3b' }
    }
    else if(mode == "string"){
      if(this.player.teamId == 1){ return 'blue' }
      else if(this.player.teamId == 2){ return 'red' }
      else if(this.player.teamId == 3) { return 'green' }
      else if(this.player.teamId == 4) { return 'yellow' }
    }
  }
}

export interface Player {
  playerId: number;
  teamId: number;
  areaId: number;
  auth_id: number;
  playerUsername: string;
  playerEmail: string;
  playerTitle: string;
  playerLevel: number;
  playerExp: number;
  playerSilverCoins: number;
  playerTroops: number;
  playerReserveTroops: number;
}

export interface Team {
  teamId: number;
  teamColor: string;
  teamTotalOccupiedAreas: number;
  players: Player[];
}

export interface Area {
  areaId: number;
  areaName: string;
  defendingTroops: number;
  teamId: number;
  players: Player[];
  positions: Position[];
}

export interface Position {
  positionId: number;
  areaId: number;
  latitude: number;
  longitude: number;
  area?: any;
}

export interface Token {
  access_token: string;
  expires_in: number;
  token_type: string;
}

