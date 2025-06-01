import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';

@NgModule({
  declarations: [
    SecurityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    SecurityComponent
  ]
})
export class SecurityModule { } 