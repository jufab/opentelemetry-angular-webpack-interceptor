import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenTelemetryWebpackConfig, OpenTelemetryWebpackInjectConfig } from './configuration/opentelemetry-webpack-config';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class OpentelemetryInterceptorWebpackModule {
  constructor(
    @Optional() @SkipSelf() parentModule?: OpentelemetryInterceptorWebpackModule
  ) {
    if (parentModule) {
      throw new Error(
        'OpentelemetryInterceptorWebpackModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  public static forRoot(config: OpenTelemetryWebpackConfig): ModuleWithProviders<OpentelemetryInterceptorWebpackModule> {
    return {
      ngModule: OpentelemetryInterceptorWebpackModule,
      providers: [
        { provide: OpenTelemetryWebpackInjectConfig, useValue: config },
      ],
    };
  }

 }
