import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

if (environment.firebase.apiKey.includes(' ')) {
  console.log('Your firebase settings are invalid.');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
