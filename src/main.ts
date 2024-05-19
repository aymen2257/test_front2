import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartComponent } from './app/chart/chart.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { BarController, Colors, Legend } from 'chart.js';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



bootstrapApplication(ChartComponent, {
  providers: [provideCharts(withDefaultRegisterables())],
}).catch((err) => console.error(err));

provideCharts({ registerables: [BarController, Legend, Colors] });
