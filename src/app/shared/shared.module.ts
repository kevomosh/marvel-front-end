import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, FormsModule, NgxDatatableModule],
  exports: [CommonModule, HttpClientModule, FormsModule, NgxDatatableModule],
})
export class SharedModule {}
