import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { TotpComponent } from './totp/totp.component';
import { TokenComponent } from './register/token.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifiyTokenComponent } from './verifiy-token/verifiy-token.component';
import { ContactComponent } from './contact/contact.component';
import { UpdateImageComponent } from './update-image/update-image.component';
import { UpdateInformationsComponent } from './update-informations/update-informations.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ContratsComponent } from './contrats/contrats.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { UnProduitComponent } from './un-produit/un-produit.component';
import { AgenceComponent } from './agence/agence.component';
import { ListeContratComponent } from './liste-contrat/liste-contrat.component';
import { ListeUsersComponent } from './liste-users/liste-users.component';
import { ListeReclamationsComponent } from './liste-reclamations/liste-reclamations.component';
import { AddBrancheComponent } from './add-branche/add-branche.component';
import { ListeBranchesComponent } from './liste-branches/liste-branches.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { ChartComponent } from './chart/chart.component';

import { AuthGuard } from './_services/auth.guard';
import { ReclamtionuserComponent } from './reclamtionuser/reclamtionuser.component';
import { SuccessComponent } from './success/success.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent,canActivate: [AuthGuard], data: { requiredRoles: ['ROLE_ADMIN'] } },
  { path: 'totp', component: TotpComponent },
  { path: 'verify', component: TokenComponent },
  { path: 'verify2', component: VerifiyTokenComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent},
  { path: 'changePassword', component: NewPasswordComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'updateImage', component: UpdateImageComponent},
  { path: 'updateInformations', component: UpdateInformationsComponent},
  { path: 'updatePassword', component: UpdatePasswordComponent},
  { path: 'contrat', component: ContratsComponent,canActivate: [AuthGuard], data: { requiredRoles: ['ROLE_USER'] }},
  { path: 'reclamation', component: ReclamationsComponent,canActivate: [AuthGuard], data: { requiredRoles: ['ROLE_USER'] }},
  { path: 'produit', component:UnProduitComponent },
  {path:"contrat/:id",component:ContratsComponent,canActivate: [AuthGuard], data: { requiredRoles: ['ROLE_USER'] }},
  { path: 'produit/:id', component:UnProduitComponent },
  {path:"contrat/:id",component:ContratsComponent},
  {path:"agences",component:AgenceComponent},
  { path: 'my-reclamations', component: ReclamtionuserComponent,canActivate: [AuthGuard], data: { requiredRoles: ['ROLE_USER'] } },
  { path: 'listeContrats', component:ListeContratComponent },
  { path: 'listeAdherent', component:ListeUsersComponent },
  { path: 'listeReclamation', component:ListeReclamationsComponent},
  { path: 'listeProduit', component:ListeProduitsComponent},
  { path: 'add-branche', component:AddBrancheComponent},
  { path: 'add-branche/:id', component:AddBrancheComponent },
  { path: 'branches', component:ListeBranchesComponent},
  { path: 'produits', component:ListeProduitsComponent},
  { path: 'add-produit', component:AddProduitComponent},
  { path: 'add-produit/:id', component:AddProduitComponent},
  { path: 'chart', component:ChartComponent},
  { path: 'success', component: SuccessComponent },
  { path: 'cancel', component: SuccessComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
