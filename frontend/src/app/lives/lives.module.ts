import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivesRoutingModule } from './lives-routing.module';
import { MainComponent } from './components/main/main.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { DashboardLiveModule } from '../dashboard-live/dashboard-live.module';
import { IconsModule } from '../icons/icons.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    LivesRoutingModule,
    MatTabsModule,
    MatIconModule,
    DashboardLiveModule,
    IconsModule,
    SharedModule,
    TranslateModule

  ]
})
export class LivesModule { }
