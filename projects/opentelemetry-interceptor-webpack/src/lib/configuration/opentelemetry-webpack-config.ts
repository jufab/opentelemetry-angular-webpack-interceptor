import { InjectionToken } from '@angular/core';

/**
 * Configuration for Zipkin
 */
export interface ZipkinCollectorConfig {
  /**
   * An url (Default value: http://localhost:9411/api/v2/spans)
   */
  url?: string;
  /**
   * custom headers
   */
  headers?: {
    [key: string]: string;
  };
}

/**
 * OpenTelemetryWebpackConfig
 */
export interface OpenTelemetryWebpackConfig {
  /** zipkinConfig */
  zipkinConfig?: ZipkinCollectorConfig;
}
/** OpenTelemetryInjectConfig : Config injection */
export const OpenTelemetryWebpackInjectConfig = new InjectionToken<OpenTelemetryWebpackConfig>('opentelemetry.webpack.config');
