import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MyApplicationAppModule } from './app.module';


if (module['hot']) {
  module['hot'].accept();
}

platformBrowserDynamic()
  .bootstrapModule(MyApplicationAppModule, { preserveWhitespaces: true })
  // eslint-disable-next-line no-console
  .then(() => console.log('Application started'))
  .catch(err => console.error(err));

