import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JaegerExporterService } from './jaeger-exporter.service';
import { SpanExporterService } from '@jufab/opentelemetry-angular-interceptor/lib/services/exporter/span-exporter.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: SpanExporterService, useClass: JaegerExporterService }
  ]
})
export class JaegerExporterModule {
}
