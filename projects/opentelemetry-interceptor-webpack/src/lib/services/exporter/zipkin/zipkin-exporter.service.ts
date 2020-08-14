import { Injectable, Inject } from '@angular/core';
import { IExporter } from '@jufab/opentelemetry-angular-interceptor/lib/services/exporter/exporter.interface';
import { SpanExporter } from '@opentelemetry/tracing';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { ExporterConfig } from '@opentelemetry/exporter-zipkin/build/src/types';
import { OpenTelemetryConfig, OpenTelemetryInjectConfig } from '@jufab/opentelemetry-angular-interceptor';
import { OpenTelemetryWebpackInjectConfig, OpenTelemetryWebpackConfig } from '../../../configuration/opentelemetry-webpack-config';

/**
 * ZipkinExporterService class
 */
@Injectable({
  providedIn: 'root'
})
export class ZipkinExporterService implements IExporter {
  /**
   * zipkinConfig
   */
  private zipkinConfig: ExporterConfig;

  /**
   * constructor
   * @param config OpenTelemetryConfig
   * @param configWebpack OpenTelemetryWebpackConfig
   */
  constructor(@Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig,
              @Inject(OpenTelemetryWebpackInjectConfig) configWebpack: OpenTelemetryWebpackConfig) {
    this.zipkinConfig = {
      serviceName: config.commonConfig.serviceName,
      url: configWebpack.zipkinConfig?.url,
    };
  }

  /**
   * Return a ZipkinExporter configured with zipkinConfig field
   * @return SpanExporter
   */
  getExporter(): SpanExporter {
    return new ZipkinExporter(this.zipkinConfig);
  }
}
