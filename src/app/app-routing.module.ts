import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleComponentAlmacen } from './pages/almacen/detalle/detalle.component';
import { ImagenesProdComponentAlmacen } from './pages/almacen/imagenes-prod/imagenes-prod.component';
import { FotosComponentAlmacen } from './pages/almacen/fotos/fotos.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PdfFipComponentAlmacen } from './pages/almacen/pdf-fip/pdf-fip.component';
import { ImagenesProdComponent } from './pages/produccion/imagenes-prod/imagenes-prod.component';
import { DetalleComponent } from './pages/produccion/detalle/detalle.component';
import { FotosComponent } from './pages/produccion/fotos/fotos.component';
import { PdfFipComponent } from './pages/produccion/pdf-fip/pdf-fip.component';
import { AuthGuard } from './services/guards/auth.guard';
import { PartesComponent } from './pages/produccion/partes/partes.component';
import { IntermedioComponent } from './pages/produccion/intermedio/intermedio.component';
import { CapacidadesComponent } from './pages/produccion/capacidades/capacidades.component';
import { ParteColorComponent } from './pages/gestionProducto/parte-color/parte-color.component';
import { SurtidosComponent } from './pages/gestionProducto/surtidos/surtidos.component';

const routes: Routes = [
  { path: '', redirectTo: '/productgo/login', pathMatch: 'full' },
  { path: 'productgo/login', component: LoginComponent },
  {
    path: 'productgo/home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'marketing/capacidades',
        component: CapacidadesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marketing/parteColor',
        component: ParteColorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marketing/surtidos',
        component: SurtidosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'marketing/imagenesFormula',
        component: ImagenesProdComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'partes',
            component: PartesComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'detalle/:codigo',
            component: DetalleComponent,
            canActivate: [AuthGuard],
            children: [ 
              {
                path: 'fotos',
                component: FotosComponent,
                canActivate: [AuthGuard],
              },
              {
                path: 'PreviewPDF',
                component: PdfFipComponent,
                canActivate: [AuthGuard],
              },
            ],
          },
        ],
      },
      {
        path: 'marketing/almacen',
        component: ImagenesProdComponentAlmacen,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'detalle',
            component: DetalleComponentAlmacen,
            canActivate: [AuthGuard],
            children: [
              {
                path: 'fotos',
                component: FotosComponentAlmacen,
                canActivate: [AuthGuard],
              },
              {
                path: 'PreviewPDF',
                component: PdfFipComponentAlmacen,
                canActivate: [AuthGuard],
              },
            ],
          },
        ],
      },
    ],
  },

  { path: '**', redirectTo: '/productgo/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
