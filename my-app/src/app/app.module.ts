import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
