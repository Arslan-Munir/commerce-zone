import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'app/core/components/home/home.component';
import { LoginComponent } from 'app/core/components/login/login.component';
import { NavBarComponent } from 'app/core/components/nav-bar/nav-bar.component';
import { NotFoundComponent } from 'app/core/components/not-found/not-found.component';
import { ShoppingModule } from './shopping.module';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    ShoppingModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }
