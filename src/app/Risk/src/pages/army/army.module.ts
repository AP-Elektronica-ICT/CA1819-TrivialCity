import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArmyPage } from './army';
import { NgProgressService, NgProgressModule } from 'ng2-progressbar';

@NgModule({
  declarations: [
    ArmyPage,
  ],
  imports: [
    IonicPageModule.forChild(ArmyPage),
    NgProgressModule,
  ],
})
export class ArmyPageModule {}
