import { OpenTelemetryConfig } from '@jufab/opentelemetry-angular-interceptor';
import { OpenTelemetryWebpackConfig } from '../../../opentelemetry-interceptor-webpack/src/public-api';

interface IEnvironment {
  production: boolean;
  urlTest: string;
  openTelemetryConfig: OpenTelemetryConfig;
  openTelemetryWebpackConfig: OpenTelemetryWebpackConfig;
}

// Example to configure the angular-interceptor library
export const environment: IEnvironment = {
  production: false,
  urlTest: 'http://localhost:4200/api',
  openTelemetryConfig: {
    commonConfig: {
      console: true, // Display trace on console
      production: false, // Send Trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
      serviceName: 'example-app', // Service name send in trace
      probabilitySampler: '0.7', // Samples a configurable percentage of traces, string value between '0' to '1'
    },
  },
  openTelemetryWebpackConfig: {
    zipkinConfig: {
      url: 'http://localhost:9411/api/v2/spans'
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
import { zipkinConfig } from '../../../opentelemetry-interceptor-webpack/__mocks__/data/config.mock';
