import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FurnitureModule } from './furniture/furniture.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { StaticModule } from './static/static.module';
import { MainComponent } from './main/main.component';
import { appInterceptorProvider } from './app.interceptor';
import { UserRoutingModule } from './user/user-routing.module';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    UserModule,
    CoreModule,
    SharedModule,
    FurnitureModule,
    StaticModule,
    HttpClientModule,
    UserRoutingModule,
    // AppRoutingModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
