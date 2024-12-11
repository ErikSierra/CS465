import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Make sure this is included
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NavbarComponent } from './app_admin/src/app/navbar/navbar.component';
import { LoginComponent } from './app_admin/src/app/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule  // Ensure FormsModule is imported here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
