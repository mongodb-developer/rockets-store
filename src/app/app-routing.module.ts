import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RocketDetailsComponent } from './rocket-details/rocket-details.component';
import { RocketsComponent } from './rockets/rockets.component';

const routes: Routes = [
  { path: '', redirectTo: 'rockets', pathMatch: 'full' },
  { path: 'rockets', component: RocketsComponent },
  { path: 'rockets/:name', component: RocketDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
