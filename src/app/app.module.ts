import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { ModulosComponent } from './Components/modulos/modulos.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ToastComponent } from './Components/toast/toast.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DetalleComponentAlmacen } from './pages/almacen/detalle/detalle.component';
import { FotosComponentAlmacen } from './pages/almacen/fotos/fotos.component';
import { ImagenesProdComponentAlmacen } from './pages/almacen/imagenes-prod/imagenes-prod.component';
import { PdfFipComponentAlmacen } from './pages/almacen/pdf-fip/pdf-fip.component';
// Asegúrate de importar FormsModule
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DetalleComponent } from './pages/produccion/detalle/detalle.component';
import { FotosComponent } from './pages/produccion/fotos/fotos.component';
import { ImagenesProdComponent } from './pages/produccion/imagenes-prod/imagenes-prod.component';
import { PdfFipComponent } from './pages/produccion/pdf-fip/pdf-fip.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from './services/services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PartesComponent } from './pages/produccion/partes/partes.component';
import { IntermedioComponent } from './pages/produccion/intermedio/intermedio.component';
import { CapacidadesComponent } from './pages/produccion/capacidades/capacidades.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { ParteColorComponent } from './pages/gestionProducto/parte-color/parte-color.component';
import { SurtidosComponent } from './pages/gestionProducto/surtidos/surtidos.component';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModulosComponent,
    SidebarComponent,
    ToastComponent,
    DetalleComponentAlmacen,
    FotosComponentAlmacen,
    ImagenesProdComponentAlmacen,
    PdfFipComponentAlmacen,
    HomeComponent,
    LoginComponent,
    DetalleComponent,
    FotosComponent,
    ImagenesProdComponent,
    PdfFipComponent,
    PartesComponent,
    IntermedioComponent,
    CapacidadesComponent,
    ParteColorComponent,
    SurtidosComponent
  ],
  imports: [
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
