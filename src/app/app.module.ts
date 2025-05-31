import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminComponent } from './page/admin/admin.component';
import { JustificatifComponent } from './page/admin/justificatif/justificatif.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppComponent,
    AdminComponent,
    JustificatifComponent
  ],
  providers: []
})
export class AppModule { } 