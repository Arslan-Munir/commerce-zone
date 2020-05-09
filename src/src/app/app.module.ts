import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { environment } from 'environments/environment';
import { AppComponent } from './app.component';
import { AdminModule } from './modules/admin.module';
import { CoreModule } from './modules/core.module';
import { SharedModule } from './modules/shared.module';
import { ShoppingModule } from './modules/shopping.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    // MatIconModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    RouterModule.forRoot([]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
