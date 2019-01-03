import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArmyPage } from './army';

@NgModule({
  declarations: [
    ArmyPage,
  ],
  imports: [
    IonicPageModule.forChild(ArmyPage),
  ],
})
export class ArmyPageModule {}
