import { TestBed } from '@angular/core/testing';

import { JaegerExporterService } from './jaeger-exporter.service';
import { opentelemetryCommonConfig, jaegerConfig } from '../../../../../__mocks__/data/config.mock';
import { OpenTelemetryWebpackInjectConfig } from '../../../configuration/opentelemetry-webpack-config';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { OpenTelemetryInjectConfig } from '@jufab/opentelemetry-angular-interceptor';

describe('JaegerExporterService', () => {
  let jaegerExporterService: JaegerExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JaegerExporterService,
        { provide: OpenTelemetryInjectConfig, useValue: opentelemetryCommonConfig },
        { provide: OpenTelemetryWebpackInjectConfig, useValue: jaegerConfig },
      ]
    });
    jaegerExporterService = TestBed.inject(JaegerExporterService);
  });

  it('should be created', () => {
    expect(jaegerExporterService).toBeTruthy();
  });


  it('should generate a JaegerExporter', () => {
    const exporter = jaegerExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(JaegerExporter);
  });


});
