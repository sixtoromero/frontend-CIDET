import { Routes, RouterModule, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MunicipiosComponent } from './components/municipios/municipios.component';


const APP_ROUTES: Routes = [  

    {path: 'home', component: HomeComponent},        
    {path: 'municipios', component: MunicipiosComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
  ];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);