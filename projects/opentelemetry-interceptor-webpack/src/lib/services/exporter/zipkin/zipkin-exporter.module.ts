import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZipkinExporterService } from './zipkin-exporter.service';
import { SpanExporterService } from '@jufab/opentelemetry-angular-interceptor';


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
