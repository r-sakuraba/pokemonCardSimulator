import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DeckSampleComponent } from './deck-sample/deck-sample.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { FieldComponent } from './field/field.component';
import { DeckComponent } from './deck/deck.component';
import { HandComponent } from './hand/hand.component';
import { StadiumComponent } from './stadium/stadium.component';
import { BenchComponent } from './bench/bench.component';
import { BattleComponent } from './battle/battle.component';
import { SideComponent } from './side/side.component';
import { GxComponent } from './gx/gx.component';
import { LostComponent } from './lost/lost.component';
import { TrashComponent } from './trash/trash.component';
import { UseComponent } from './use/use.component';
import { StashComponent } from './stash/stash.component';
import { CountComponent } from './count/count.component';
import { BenchFieldComponent } from './bench-field/bench-field.component';

const routes: Routes = [
  { path: 'deck-sample', component: DeckSampleComponent },
  { path: 'field', component: FieldComponent },
];

@NgModule({
  declarations: [AppComponent, DeckSampleComponent, CardComponent, FieldComponent, DeckComponent, HandComponent, StadiumComponent, BenchComponent, BattleComponent, SideComponent, GxComponent, LostComponent, TrashComponent, UseComponent, StashComponent, CountComponent, BenchFieldComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
