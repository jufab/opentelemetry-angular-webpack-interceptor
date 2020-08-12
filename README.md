# OpenTelemetry Angular Webpack Interceptor

@jufab/opentelemetry-angular-webpack-interceptor is an Angular Library to deploy [OpenTelemetry](https://opentelemetry.io/) with Zipkin or Jaeger Exporter and use custom webpack in your Angular application

This library uses [opentelemetry-js package](https://github.com/open-telemetry/opentelemetry-js) and [@jufab/opentelemetry-angular-interceptor](https://github.com/jufab/opentelemetry-angular-interceptor)

**Only works for Angular >= 9.0.0**

More info : https://jufab.github.io/opentelemetry-angular-webpack-interceptor/

[![npm version](https://badge.fury.io/js/%40jufab%2Fopentelemetry-angular-interceptor.svg)](https://badge.fury.io/js/%40jufab%2Fopentelemetry-angular-interceptor)
[![codecov](https://codecov.io/gh/jufab/opentelemetry-angular-interceptor/branch/master/graph/badge.svg)](https://codecov.io/gh/jufab/opentelemetry-angular-interceptor)

## Table of contents

- [OpenTelemetry Angular Webpack Interceptor](#opentelemetry-angular-webpack-interceptor)
  - [Table of contents](#table-of-contents)
  - [Getting started](#getting-started)
    - [Installation](#installation)
    - [Configuration](#configuration)
      - [Example global Configuration](#example-global-configuration)
      - [Common Configuration](#common-configuration)
      - [OpenTelemetry-collector Configuration](#opentelemetry-collector-configuration)
      - [Zipkin Collector Configuration](#zipkin-collector-configuration)
      - [Jaeger Collector Configuration](#jaeger-collector-configuration)
      - [Jaeger Propagator Configuration](#jaeger-propagator-configuration)
    - [Angular Module](#angular-module)
  - [How it works](#how-it-works)
  - [Example](#example)
    - [Run](#run)
    - [[Optional] Result in OpenTelemtery-collector](#optional-result-in-opentelemtery-collector)
  - [Troubleshoot](#troubleshoot)
    - [Angular 10 Warning](#angular-10-warning)

## Getting started

### Installation

With npm :

```
npm install @jufab/opentelemetry-angular-webpack-interceptor @jufab/opentelemetry-angular-interceptor @opentelemetry/web @opentelemetry/exporter-collector @opentelemetry/exporter-jaeger @opentelemetry/exporter-zipkin
```

### Configuration

Use the "OpenTelemetryWebpackConfig" interface to configure this extra feature (use "OpenTelemetryConfig" for the common config)

```typescript
export interface OpenTelemetryWebpackConfig {
  jaegerConfig?: JaegerCollectorConfig;
  zipkinConfig?: ZipkinCollectorConfig;
}
```

#### Example global Configuration

_From the example-app_

```typescript
opentelemetryConfig: {
    commonConfig: {
      console: true, //(boolean) Display trace on console
      production: false, //(boolean) Send trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false) more info : https://github.com/open-telemetry/opentelemetry-js/tree/master/packages/opentelemetry-api#tracing
      serviceName: 'example-app', //Service name send in trace
      collector: Collector.otelcol, //Enum to specified the collector : OpenTelemetry Collector(otelcol), Zipkin (zipkin), Jaeger (jaeger)
      propagator: Propagator.composite, // Enum to propagator : B3 (b3), HttpTraceContext (httpTrace), Jaeger Propagator (jaeger) and Composite that include b3, httpTrace and Jaeger (composite)
      probabilitySampler: 0.7, //Samples a configurable percentage of traces, value between 0 to 1
    },
    otelcolConfig: {
      url: 'http://localhost:55681/v1/trace', //URL of opentelemetry collector
    },
    zipkinConfig: {
      url: 'http://localhost:9411/api/v2/spans', //url of zipkin collector
    },
    jaegerConfig: {
      endpoint: 'http://localhost:14268/api/traces', // Url of Jaeger collector via HTTPSender
    },
    jaegerPropagatorConfig: {
      customHeader: 'custom-header',
    }
  }

```

#### Common Configuration
 
 * console: (boolean) Display trace on console if true
 * production: (boolean)Send trace via BatchSpanProcessor (Async) or SimpleSpanProcessor (Sync) : It's recommend to use BatchSpanProcessor on Production.
 * serviceName: (string) Service name in your trace
 * collector: (Enum) use Enum Collector (otelcol,zipkin,jaeger)
 * propagator: (Enum) use Propagator Enum (b3,httpTrace,composite,jaeger)

#### OpenTelemetry-collector Configuration

* url: (string) url of opentelemetry collector (default : http://localhost:55681/v1/trace)
* headers: list of custom header

#### Zipkin Collector Configuration

* url: (string) url of zipkin collector (default : http://localhost:9411/api/v2/spans)

#### Jaeger Collector Configuration

* endpoint: (string) url of jaeger collector (example : http://localhost:14268/api/traces)

#### Jaeger Propagator Configuration

* customHeader: (string) custom header

### Angular Module

To insert OpenTelemetryInterceptorModule, you can add in your application module (generally app.module.ts)

```typescript
import { NgModule } from '@angular/core';
...
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OpenTelemetryInterceptorModule } from '@jufab/opentelemetry-angular-interceptor';
import { environment } from '../environments/environment';
...

@NgModule({
  declarations: [AppComponent, ...],
  imports: [
    ...
    HttpClientModule,
    //Insert module OpenTelemetryInterceptorModule with configuration, HttpClientModule is used for interceptor
    OpenTelemetryInterceptorModule.forRoot(environment.opentelemetryConfig),
    ...
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## How it works



## Example

This project have an "example-app" as Angular application example.

[projects/example-app](https://github.com/jufab/opentelemetry-angular-webpack-interceptor/tree/master/projects/example-app)

You can see how configure and insert this module.

You can althought test __opentelemetry-angular-interceptor__ with this application.

### Run


To start this Example application, run command :

```
npm run start:complete-example-app
```

and open the application at http://localhost:4200

### [Optional] Result in OpenTelemtery-collector

If you want to see the result in a collector *, there's a docker-compose available in this project.

You can start it with this command :

```
docker-compose -f projects/example-app/collector/docker-compose.yaml up -d
```

Go to the jaeger application (http://localhost:16686) to see result.

More info about the collector here : https://github.com/open-telemetry/opentelemetry-collector

> _* without an Agent or a Collector you can see an error in your browser about sending a "trace"._


## Troubleshoot

### Angular 10 Warning

```shell
WARNING in xxx/fesm2015/jufab-opentelemetry-angular-interceptor.js depends on '@opentelemetry/web'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

WARNING in xxx/fesm2015/jufab-opentelemetry-angular-interceptor.js depends on '@opentelemetry/core'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

WARNING in xxx/fesm2015/jufab-opentelemetry-angular-interceptor.js depends on '@opentelemetry/tracing'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

WARNING in xxx/fesm2015/jufab-opentelemetry-angular-interceptor.js depends on '@opentelemetry/api'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies

WARNING in xxx/fesm2015/jufab-opentelemetry-angular-interceptor.js depends on '@opentelemetry/exporter-collector/build/src/platform/browser'. CommonJS or AMD dependencies can cause optimization bailouts.
For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies
```

Add to your angular.json

```json
"options": {
  "allowedCommonJsDependencies": [
    "@opentelemetry/web",
    "@opentelemetry/core",
    "@opentelemetry/tracing",
    "@opentelemetry/api",
    "@opentelemetry/exporter-collector",
    "@opentelemetry/context-base",
    "@opentelemetry/propagator-jaeger"
  ],
```

