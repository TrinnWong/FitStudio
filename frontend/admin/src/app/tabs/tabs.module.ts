import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { GymClassesPage } from '../pages/gym-classes/gym-classes.page';
import { GymClassFormPage } from '../pages/gym-classes/gym-class-form.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TabsPage,
    GymClassesPage,
    GymClassFormPage
  ],
  declarations: []
})
export class TabsPageModule {}
