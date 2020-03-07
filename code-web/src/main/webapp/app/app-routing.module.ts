import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home';
import { AuthGuard } from './core/guards';
import { DEBUG_INFO_ENABLED } from './app.constants';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent, canActivate: [AuthGuard]},
        //FIXME:
        { path: 'login', component: HomeComponent},

        // otherwise redirect to home
        { path: '**', redirectTo: '' }
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class MyApplicationAppRoutingModule {}



