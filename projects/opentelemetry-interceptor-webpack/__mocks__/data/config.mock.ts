import { OpenTelemetryConfig } from '@jufab/opentelemetry-angular-interceptor';
import { OpenTelemetryWebpackConfig } from 'projects/opentelemetry-interceptor-webpack/src/public-api';



/**
 * @ignore
 */
export const opentelemetryCommonConfig: OpenTelemetryConfig = {
  commonConfig: {
    serviceName: 'test',
  }
};

/**
 * @ignore
 */
export const jaegerConfig: OpenTelemetryWebpackConfig = {
  jaegerConfig: {
    endpoint: 'http://localhost'
  }
};
/**
 * @ignore
 */
export const zipkinConfig: OpenTelemetryWebpackConfig = {
  zipkinConfig: {
    url: 'http://localhost'
  }
};

