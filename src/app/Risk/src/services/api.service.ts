import { Injectable } from '@angular/core';

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
export class ApiService extends BaseService {
  private baseApi: string = 'http://localhost:53169/api';         //'http://172.16.210.101:53169/api/'    ;// 'http://169.254.193.167:53169/api/';  // 'http://localhost:53169/api/';      <--- eigen ip address invullen 

  AuhtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qZ3dSRVl3TkRjMk56aENOMFUwTXprek5rUTJRemxDUTBFNVJrTTRRVGsyUmpCRVF6TTRRUSJ9.eyJpc3MiOiJodHRwczovL2luaWFzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJPSDZMdFdQdTZwMnU0VlNuU3ducDRQbmFleGJVVWd6d0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9BbnR3ZXJwUmlzay9hcGkiLCJpYXQiOjE1NDM1Njg1ODYsImV4cCI6MTU0MzY1NDk4NiwiYXpwIjoiT0g2THRXUHU2cDJ1NFZTblN3bnA0UG5hZXhiVVVnenciLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.k3d5EGEjQESqyoeWv1I4iPdp0JtVEgI-hVmgh2dE0yYwiDibTG-G-o8RvR8U2kMCF5z1tGPhgo3xd0q5LdoQQsF1_-7uUcMjrv6_sEHG1bClWc6S3iAU6tJWLvJKAVEeVX5gn1eyROYsTzu49oG7YfFq7nVp7fHJL-WeeVDX4XfgAe13yOUvizsIET7pNOAxd_o9LGVwmgj_SuaoR2Pbji_JupNDXaBDi6pXSdZ6QtqkZkUQrQrxT5RN24fc7HNKsm6d4ORDhN_mWj8P7hPEYKQH-TK8LjUadq__9riJKywW0YfIaGi3f2wsln4dq0pAIf_76wHEZ0wrvZnrf4cymg";

  constructor(private http: HttpClient) {
    super();
  }

  private httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.AuhtToken}`
    })
  }



  GetToken() {
    var request = require("request");

    var options = {
      method: 'POST',
      url: 'https://inias.eu.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"OH6LtWPu6p2u4VSnSwnp4PnaexbUUgzw","client_secret":"tRpfMy--Vv3b2rlNFNLwMqVey2YAVj4W0dy3C33VaJrfaPdzGOInqbXbDtijinn0","audience":"https://AntwerpRisk/api","grant_type":"client_credentials"}'
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);


    });

  }



  GetPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.baseApi}/player`, this.httpHeader);
  }


  GetInfo(_number: number): Observable<Player> {
    return this.http.get<Player>(`${this.baseApi}/player/${_number}`, this.httpHeader);
  }

  GetAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.baseApi}/area`, this.httpHeader);
  }

  getArea(_number: number): Observable<Area> {
    return this.http.get<Area>(`${this.baseApi}/area/${_number}`, this.httpHeader);
  }

  

  PutInfo(_number: number, body: any): Observable<Player> {
    return this.http.put<Player>(`${this.baseApi}/player/${_number}`, body, this.httpHeader);
  }

  PutArea(_number: number , body: any): Observable<Area>{
    return this.http.put<Area>(`${this.baseApi}/area/${_number}`, body ,this.httpHeader);
  }

  GetYourId(): number {
    return 2;
  }


  GetTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseApi}/team`, this.httpHeader);
    
  }

  GetTeamPlayers(_number: number): Observable<Player[]>{
  return this.http.get<Player[]>(`${this.baseApi}/team/${_number}/players`, this.httpHeader);
  }

}





export interface Player {
  playerId: string;
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


export interface Team{
  teamId: number;
  teamColor: string;
  teamTotalOccupiedAreas: number;
  players: Player[];
}


export interface Area {
  areaId: number;
  areaName: string;
  areaOccupiedBy: string;
  defendingTroops: number;
  players: any[];
  positions: any[];
}



export interface Token {
  access_token: string;
  expires_in: number;
  token_type: string;
}

