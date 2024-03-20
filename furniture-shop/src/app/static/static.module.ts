import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StaticRoutingModule } from './static-routing.module';

import { HomeComponent } from './home/home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AboutComponent } from './about/about.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [HomeComponent, ContactsComponent, AboutComponent, Error404Component],
  imports: [CommonModule, RouterModule, StaticRoutingModule],
  exports: [HomeComponent, ContactsComponent, AboutComponent, Error404Component],
})
export class StaticModule {}
