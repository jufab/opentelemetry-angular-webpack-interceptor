import { Injectable, Inject } from '@angular/core';
import { IExporter } from '@jufab/opentelemetry-angular-interceptor/lib/services/exporter/exporter.interface';
import { OpenTelemetryConfig, OpenTelemetryInjectConfig } from '@jufab/opentelemetry-angular-interceptor';
import { SpanExporter } from '@opentelemetry/tracing';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { ExporterConfig } from '@opentelemetry/exporter-jaeger/build/src/types';
import { OpenTelemetryWebpackInjectConfig, OpenTelemetryWebpackConfig } from '../../../configuration/opentelemetry-webpack-config';

@Injectable({
  providedIn: 'root'
})
export class JaegerExporterService implements IExporter {
  private configJaeger: ExporterConfig;
  /**
   * constructor
   * @param config OpenTelemetryConfig
   * @param configWebpack OpenTelemetryWebpackConfig
   */
  constructor(@Inject(OpenTelemetryInjectConfig) config: OpenTelemetryConfig,
              @Inject(OpenTelemetryWebpackInjectConfig) configWebpack: OpenTelemetryWebpackConfig) {
    this.configJaeger = {
      serviceName: config.commonConfig.serviceName,
      endpoint: configWebpack.jaegerConfig?.endpoint,
    };
  }

  /**
   * Return a JaegerExporter
   * @return SpanExporter
   */
  getExporter(): SpanExporter {
    return new JaegerExporter(this.configJaeger);
  }
}
