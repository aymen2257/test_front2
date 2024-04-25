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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'totp', component: TotpComponent },
  { path: 'verify', component: TokenComponent },
  { path: 'verify2', component: VerifiyTokenComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent},
  { path: 'changePassword', component: NewPasswordComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'updateImage', component: UpdateImageComponent},
  { path: 'updateInformations', component: UpdateInformationsComponent},
  { path: 'updatePassword', component: UpdatePasswordComponent},
  { path: 'contrat', component: ContratsComponent},
  { path: 'reclamation', component: ReclamationsComponent},
  { path: 'produit', component:UnProduitComponent },
  {path:"contrat/:id",component:ContratsComponent},
  {path:"agences",component:AgenceComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
