import { BuilderContext } from '@angular-devkit/architect';
import { Configuration } from 'webpack';
import { CustomWebpackBuilderOptions } from './model';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { webpackConfigurationTransformFactory as slotsWebpackConfigurationTransformFactory } from '../styles-slots';
import { generateBrowserWebpackConfigFromContext } from '@angular-devkit/build-angular/src/utils/webpack-browser-config';
import {
  getAotConfig,
  getBrowserConfig,
  getCommonConfig,
  getStatsConfig
} from '@angular-devkit/build-angular/src/webpack/configs';

export function webpackConfigurationTransformFactory(
  options: CustomWebpackBuilderOptions,
  context: BuilderContext
): ExecutionTransformer<Configuration> {
  const slotsWebpackConfigurationTransform = slotsWebpackConfigurationTransformFactory(
    options,
    context
  );
  return (
    webpackConfig: Configuration
  ): Promise<Configuration> | Configuration => {
    return generateBrowserWebpackConfigFromContext(
      options as any,
      context as any,
      (wco) => {
        return [
          getCommonConfig(wco),
          getBrowserConfig(wco),
          // Only use VE extraction if not using Ivy
          getAotConfig(wco),
          getStatsConfig(wco),
        ];
      },
     // options,
    ).then(result => slotsWebpackConfigurationTransform(result.config));
  };
}
