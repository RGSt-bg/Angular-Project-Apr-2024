import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FurnitureModule } from './furniture/furniture.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { StaticModule } from './static/static.module';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [BrowserModule, UserModule, CoreModule, SharedModule, FurnitureModule, StaticModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
