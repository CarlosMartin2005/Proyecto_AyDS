import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: '',
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'matricula',
        children: [
          {
            path: '',
            loadComponent: () => import('./components/matricula/matricula.component').then(m => m.MatriculaComponent),
          },
          {
            path: 'registro',
            loadComponent: () => import('./components/matricula/formulario-registro/formulario-registro.component').then(m => m.FormularioRegistroComponent)
          },
          {
            path: 'registro-exitoso',
            loadComponent: () => import('./components/matricula/registro-exitoso/registro-exitoso.component').then(m => m.RegistroExitosoComponent)
          }
        ]
      },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
      }
    ]
  },

  {
    path: 'campus',
    loadComponent: () => import('./components/login/components/layout/navbar/navbar.component').then(m => m.NavbarComponent),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./components/login/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'estudiantes',
        loadComponent: () => import('./components/login/components/estudiantes/estudiantes.component').then(m => m.EstudiantesComponent)
      },
      {
        path: 'docentes',
        loadComponent: () => import('./components/login/components/docentes/docentes.component').then(m => m.DocentesComponent)
      },
      {
        path: 'matricula',
        loadComponent: () => import('./components/login/components/matricula/matricula.component').then(m => m.MatriculaComponent)
      },
      {
        path: 'programas',
        loadComponent: () => import('./components/login/components/programas/programas.component').then(m => m.ProgramasComponent)
      },
      {
        path: 'reportes',
        children: [
          {
            path: '',
            loadComponent: () => import('./components/login/components/reports/reports.component').then(m => m.ReportsComponent)
          },
          {
            path: 'docentes',
            loadComponent: () => import('./components/login/components/reports/vistas/reporte-docentes/reporte-docentes.component').then(m => m.ReporteDocentesComponent)
          },
          {
            path: 'estudiantes',
            loadComponent: () => import('./components/login/components/reports/vistas/reporte-estudiantes/reporte-estudiantes.component').then(m => m.ReporteEstudiantesComponent)
          },
          {
            path: 'programas-cursos',
            loadComponent: () => import('./components/login/components/reports/vistas/reporte-programas-cursos/reporte-programas-cursos.component').then(m => m.ReporteProgramasCursosComponent)
          },
          {
            path: 'seguimiento',
            loadComponent: () => import('./components/login/components/reports/vistas/reporte-seguimiento/reporte-seguimiento.component').then(m => m.ReporteSeguimientoComponent)
          },
          {
            path: 'estudiantes-curso',
            loadComponent: () => import('./components/login/components/reports/vistas/reporte-estudiantes-curso/reporte-estudiantes-curso.component').then(m => m.ReporteEstudiantesCursoComponent)
          },
          {
            path: 'matricula',
            loadComponent: () => import('./components/login/components/reports/vistas/reporte-matricula/reporte-matricula.component').then(m => m.ReporteMatriculaComponent)
          },
          {
            path: 'rendimiento',
            loadComponent: () => import('./components/login/components/reports/vistas/reporte-rendimiento-estudiante/reporte-rendimiento-estudiante.component').then(m => m.ReporteRendimientoEstudianteComponent)
          },
          {
            path: 'programas',
            loadComponent: () => import('./components/login/components/reports/vistas/reporte-programas/reporte-programas.component').then(m => m.ReporteProgramasComponent)
          },
          {
            path: 'excelencia',
            loadComponent: () => import('./components/login/components/reports/vistas/reporte-excelencia/reporte-excelencia.component').then(m => m.ReporteExcelenciaComponent)
          }
        ]
      },
    ]
  }
];
