import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MyApplicationAppRoutingModule } from './app-routing.module';
import { MainComponent } from './layouts/main/main.component';

import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AgGridModule } from 'ag-grid-angular';
//
import { NgbModule, NgbActiveModal, NgbDatepickerModule, NgbDropdownModule, NgbPopoverModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MenubarModule } from 'primeng/menubar';
import { ClipboardModule } from 'ngx-clipboard';
import { JwtInterceptor, ErrorInterceptor, TimingInterceptor } from './core/interceptors';
import { HomeComponent } from './pages/home';
import { MessageService } from 'primeng/api';
import { ContextMenuModule } from 'ngx-contextmenu';

@NgModule({
  imports: [
    BrowserModule,
    MyApplicationAppRoutingModule,
    HttpClientModule,
    SharedModule,
    ClipboardModule,
    ContextMenuModule.forRoot(),
    AgGridModule.withComponents([]),
    NgbModule, NgbDatepickerModule, NgbDropdownModule, NgbPopoverModule, NgbTimepickerModule,
    MenubarModule
  ],
  declarations: [MainComponent,
    HomeComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: APP_BASE_HREF, useValue: '/myapp/content/events/'},
    NgbActiveModal,
    CookieService,
    DatePipe,
    MessageService
  ],
  bootstrap: [MainComponent],
  entryComponents: [
  ]
})
export class MyApplicationAppModule {}
