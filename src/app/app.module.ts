import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { TotpComponent } from './totp/totp.component';
import { TokenComponent } from './register/token.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { VerifiyTokenComponent } from './verifiy-token/verifiy-token.component';
import { SliderComponent } from './slider/slider.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { ValuesComponent } from './values/values.component';
import { FooterComponent } from './footer/footer.component';
import { ContratsComponent } from './contrats/contrats.component';
import { ContactComponent } from './contact/contact.component';
import { UpdateImageComponent } from './update-image/update-image.component';
import { UpdateInformationsComponent } from './update-informations/update-informations.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ReclamationsComponent } from './reclamations/reclamations.component';
import { UnProduitComponent } from './un-produit/un-produit.component';
import { AgenceComponent } from './agence/agence.component';

 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    TotpComponent,
    TokenComponent,
    BoardAdminComponent,
    BoardUserComponent,
    BoardModeratorComponent,
    ForgetPasswordComponent,
    NewPasswordComponent,
    VerifiyTokenComponent,
    SliderComponent,
    AboutComponent,
    ProductsComponent,
    ValuesComponent,
    FooterComponent,
    ContratsComponent,
    ContactComponent,
    UpdateImageComponent,
    UpdateInformationsComponent,
    UpdatePasswordComponent,
    ReclamationsComponent,
    UnProduitComponent,
    AgenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    

   
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
