import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePetComponent } from './components/create-pet/create-pet.component';
import { ModifyPetComponent } from './components/modify-pet/modify-pet.component';
import { PetDetailsComponent } from './components/pet-details/pet-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'pet', pathMatch: 'full' },
  { path: 'pet', component: PetDetailsComponent },
  { path: 'pet/create', component: CreatePetComponent } ,
  { path: 'pet/:id', component: ModifyPetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
