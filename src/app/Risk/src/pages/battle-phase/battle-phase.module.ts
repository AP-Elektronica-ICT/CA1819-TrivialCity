import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BattlePhasePage } from './battle-phase';

@NgModule({
  declarations: [
    BattlePhasePage,
  ],
  imports: [
    IonicPageModule.forChild(BattlePhasePage),
  ],
})
export class BattlePhasePageModule {}
