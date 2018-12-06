import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeamViewPage } from './teamView';

@NgModule({
  declarations: [
    TeamViewPage,
  ],
  imports: [
    IonicPageModule.forChild(TeamViewPage),
  ],
})
export class TeamViewModule {}
