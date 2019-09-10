import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { MasterComponent } from './master/master.component';
import { HomeComponent } from './pages/home/home.component';
import { ManagerGuard } from './guards/manager.guard';
import { EditorComponent } from './pages/editor/editor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    component: MasterComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'editor',
        canActivate: [ManagerGuard],
        component: EditorComponent
      },
      {
        path: 'editor/:codigo',
        canActivate: [ManagerGuard],
        component: EditorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
