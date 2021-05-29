import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MunicipiosComponent } from './components/municipios/municipios.component';

const routes: Routes = [  
  {path: 'home', component: HomeComponent},  
  {path: 'municipios', component: MunicipiosComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
