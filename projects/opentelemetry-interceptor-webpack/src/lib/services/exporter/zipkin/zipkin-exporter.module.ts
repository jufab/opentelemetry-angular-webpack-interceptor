import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZipkinExporterService } from './zipkin-exporter.service';
import { SpanExporterService } from '@jufab/opentelemetry-angular-interceptor/lib/services/exporter/span-exporter.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: SpanExporterService, useClass: ZipkinExporterService }
  ]
})
export class ZipkinExporterModule {
}
