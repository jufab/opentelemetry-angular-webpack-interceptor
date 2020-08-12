import { TestBed } from '@angular/core/testing';

import { ZipkinExporterService } from './zipkin-exporter.service';
import { OpenTelemetryInjectConfig } from '@jufab/opentelemetry-angular-interceptor';
import { opentelemetryCommonConfig, zipkinConfig } from '../../../../../__mocks__/data/config.mock';
import { OpenTelemetryWebpackInjectConfig } from '../../../configuration/opentelemetry-webpack-config';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';

describe('ZipkinExporterService', () => {
  let zipkinExporterService: ZipkinExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ZipkinExporterService,
        { provide: OpenTelemetryInjectConfig, useValue: opentelemetryCommonConfig },
        { provide: OpenTelemetryWebpackInjectConfig, useValue: zipkinConfig },
      ]
    });
    zipkinExporterService = TestBed.inject(ZipkinExporterService);
  });

  it('should be created', () => {
    expect(zipkinExporterService).toBeTruthy();
  });

  it('should generate a zipkinExporter', () => {
    const exporter = zipkinExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(ZipkinExporter);
  });
});
