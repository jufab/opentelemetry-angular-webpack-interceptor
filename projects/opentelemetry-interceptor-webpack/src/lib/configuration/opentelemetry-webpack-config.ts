import { InjectionToken } from '@angular/core';
/**
 * Jaeger Collector configuration
 */
export interface JaegerCollectorConfig {
  /**
   * Endpoint for the HTTPSender
   */
  endpoint?: string;
}

/**
 * Configuration for Zipkin
 */
export interface ZipkinCollectorConfig {
  /**
   * An url (Default value: http://localhost:9411/api/v2/spans)
   */
  url?: string;
}

/**
 * OpenTelemetryWebpackConfig
 */
export interface OpenTelemetryWebpackConfig {
  jaegerConfig?: JaegerCollectorConfig;
  /** zipkinConfig */
  zipkinConfig?: ZipkinCollectorConfig;
}
/** OpenTelemetryInjectConfig : Config injection */
export const OpenTelemetryWebpackInjectConfig = new InjectionToken<OpenTelemetryWebpackConfig>('opentelemetry.webpack.config');
