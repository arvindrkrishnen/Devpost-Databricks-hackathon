/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular documentation tools.
*/
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module'; 
import "@angular/compiler";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));