# OpenTelemetry Angular Webpack Interceptor

@jufab/opentelemetry-angular-webpack-interceptor is an Angular Library to deploy [OpenTelemetry](https://opentelemetry.io/) with Zipkin Exporter and use custom webpack in your Angular application

This library uses [opentelemetry-js package](https://github.com/open-telemetry/opentelemetry-js) and [@jufab/opentelemetry-angular-interceptor](https://github.com/jufab/opentelemetry-angular-interceptor)

**Only works for Angular >= 9.0.0**

More info : https://jufab.github.io/opentelemetry-angular-webpack-interceptor/

[![npm version](https://badge.fury.io/js/%40jufab%2Fopentelemetry-angular-webpack-interceptor.svg)](https://badge.fury.io/js/%40jufab%2Fopentelemetry-angular-webpack-interceptor)
[![codecov](https://codecov.io/gh/jufab/opentelemetry-angular-webpack-interceptor/branch/master/graph/badge.svg)](https://codecov.io/gh/jufab/opentelemetry-angular-webpack-interceptor)

## Table of contents

- [OpenTelemetry Angular Webpack Interceptor](#opentelemetry-angular-webpack-interceptor)
  - [Table of contents](#table-of-contents)
  - [Getting started](#getting-started)
    - [Installation](#installation)
    - [Configuration](#configuration)
      - [Example global Configuration](#example-global-configuration)
      - [Common Configuration](#common-configuration)
      - [Zipkin Collector Configuration](#zipkin-collector-configuration)
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

```bash
npm install @jufab/opentelemetry-angular-webpack-interceptor @jufab/opentelemetry-angular-interceptor @opentelemetry/web @opentelemetry/exporter-collector @opentelemetry/exporter-zipkin
```

And you need custom-webpack 

_[More information about installation here](https://www.npmjs.com/package/@angular-builders/custom-webpack)_

### Configuration

Use the "OpenTelemetryWebpackConfig" interface to configure this extra feature (use "OpenTelemetryConfig" for the common config)

```typescript
export interface OpenTelemetryWebpackConfig {
  zipkinConfig?: ZipkinCollectorConfig;
}
```

#### Example global Configuration

_From the example-app_

```typescript
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
      url: 'http://localhost:9411/api/v2/spans' // Default value: http://localhost:9411/api/v2/spans
    },
  },
  ...
```

#### Common Configuration
 
 * console: (boolean) Display trace on console if true
 * production: (boolean)Send trace via BatchSpanProcessor (Async) or SimpleSpanProcessor (Sync) : It's recommend to use BatchSpanProcessor on Production.
 * serviceName: (string) Service name in your trace
 * probabilitySampler: a value between 0 and 1 

#### Zipkin Collector Configuration

* url: (string) url of zipkin collector (default : http://localhost:9411/api/v2/spans)

### Angular Module

To insert OpentelemetryInterceptorWebpackModule, you can add in your application module (generally app.module.ts)

```typescript
import { NgModule } from '@angular/core';
...
import { OpenTelemetryInterceptorModule } from '@jufab/opentelemetry-angular-interceptor';
import { environment } from '../environments/environment';
...

@NgModule({
  declarations: [AppComponent, ...],
  imports: [
    ...
    // Insert module OpenTelemetryInterceptorModule with configuration, HttpClientModule is used for interceptor
    OpenTelemetryInterceptorModule.forRoot(environment.openTelemetryConfig),
    // Extra configuration for OpentelemetryInterceptorWebpackModule
    OpentelemetryInterceptorWebpackModule.forRoot(environment.openTelemetryWebpackConfig),
    // Propagator (here, composite propagator)
    CompositePropagatorModule,
    // Zipkin exporter
    ZipkinExporterModule,
    ...
  ],
  ...
})
export class AppModule {}
```

## How it works



## Example

This project have an "example-app" as Angular application example.

[projects/example-app](https://github.com/jufab/opentelemetry-angular-webpack-interceptor/tree/master/projects/example-app)

You can see how configure and insert this module.

You can althought test __opentelemetry-angular-webpack-interceptor__ with this application.

### Run


To start this Example application, run command :

```
npm start
```

and open the application at http://localhost:4200

### [Optional] Result in OpenTelemtery-collector

If you want to see the result in a collector *, there's a docker-compose available in this project.

You can start it with this command :

```
docker-compose -f projects/example-app/collector/docker-compose.yaml up -d
```

Go to the zipkin application (http://localhost:9412) to see result.

More info about the collector here : https://github.com/open-telemetry/opentelemetry-collector

> _* without an Agent or a Collector you can see an error in your browser about sending a "trace"._


## Troubleshoot

### Angular 10 Warning

```shell
WARNING in /Users/julien/Documents/git/angular/opentelemetry-angular-interceptor-webpack/node_modules/@opentelemetry/api/build/src/index.js depends on '@opentelemetry/context-base'. CommonJS or AMD dependencies can cause optimization bailouts.
```

Add to your angular.json

```json
"options": {
  "allowedCommonJsDependencies": [
    "@opentelemetry/context-base"
  ],
```

