import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule here
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,     
    DragDropModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
