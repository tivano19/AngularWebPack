import { NgModule } from '@angular/core';

import {
  ButtonModule,
  RadioButtonModule,
  CalendarModule,
  DataTableModule,
  InputTextModule,
  TreeModule,
  TreeTableModule,
  ConfirmDialogModule,
  SidebarModule,
  DialogModule,
  ToolbarModule,
  TooltipModule,
  CheckboxModule,
  InputTextareaModule,
  InputSwitchModule,
  MenubarModule,
  MessagesModule,
  MessageModule,
  ListboxModule

} from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';


@NgModule({
  imports: [
    ButtonModule,
    RadioButtonModule,
    CalendarModule,
    DataTableModule,
    InputTextModule,
    TreeModule,
    TreeTableModule,
    ConfirmDialogModule,
    SidebarModule,
    DialogModule,
    ToolbarModule,
    TooltipModule,
    CheckboxModule,
    InputTextareaModule,
    InputSwitchModule,
    MenubarModule,
    MessagesModule,
    ListboxModule,
    MessageModule,
    ToastModule
  ],
  exports: [
    ButtonModule,
    RadioButtonModule,
    CalendarModule,
    DataTableModule,
    InputTextModule,
    TreeModule,
    TreeTableModule,
    ConfirmDialogModule,
    SidebarModule,
    DialogModule,
    ToolbarModule,
    TooltipModule,
    CheckboxModule,
    InputTextareaModule,
    InputSwitchModule,
    MenubarModule,
    MessagesModule,
    ListboxModule,
    MessageModule,
    ToastModule
  ]
})
export class PrimeNgModule {}
