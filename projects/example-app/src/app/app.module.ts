import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBackendComponent } from './view-backend/view-backend.component';
import { HighlightJsModule } from 'ngx-highlight-js';
import { AppRoutingModule } from './app-routing.module';
import { PostBackendComponent } from './post-backend/post-backend.component';
import { CompositePropagatorModule, OpenTelemetryInterceptorModule } from '@jufab/opentelemetry-angular-interceptor';
import { ZipkinExporterModule, OpentelemetryInterceptorWebpackModule } from 'projects/opentelemetry-interceptor-webpack/src/public-api';
@NgModule({
  declarations: [AppComponent, ViewBackendComponent, PostBackendComponent],
  imports: [
    BrowserModule,
    // Insert module OpenTelemetryInterceptorModule with configuration, HttpClientModule is used for interceptor
    OpenTelemetryInterceptorModule.forRoot(environment.openTelemetryConfig),
    // Extra configuration for OpentelemetryInterceptorWebpackModule
    OpentelemetryInterceptorWebpackModule.forRoot(environment.openTelemetryWebpackConfig),
    // Propagator
    CompositePropagatorModule,
    // Zipkin exporter
    ZipkinExporterModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    BrowserAnimationsModule,
    HighlightJsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
