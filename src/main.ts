import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HttpClientModule } from '@angular/common/http'; 
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
