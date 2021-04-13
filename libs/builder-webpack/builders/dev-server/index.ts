import { createBuilder } from '@angular-devkit/architect';
import {
  DevServerBuilderOptions,
  DevServerBuilderOutput,
  executeDevServerBuilder,
} from '@angular-devkit/build-angular';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadOptions } from '../../custom-builder/utils';
import {
  CustomWebpackBuilderOptions,
  getTransforms,
} from '../../custom-builder';
import { mergeRxaStylesIntoAngularStyles } from '../../styles-slots/merge-options';

type ExtDevServerBuilderOptions = DevServerBuilderOptions &
  CustomWebpackBuilderOptions;

export const serveCustomWebpackBrowser = (
  options: ExtDevServerBuilderOptions,
  context: any
): Observable<DevServerBuilderOutput> => {
  return loadOptions(options, context).pipe(
    map(mergeRxaStylesIntoAngularStyles),
    switchMap((customWebpackOptions: any) => {
      console.log('options  serveCustomWebpackBrowser', options, customWebpackOptions);
      return executeDevServerBuilder(
          customWebpackOptions,
          context,
          getTransforms(customWebpackOptions, context)
        )
      }
    ),
    catchError(e => {
      console.log(e);
      return EMPTY;
    })
  );
};

export default createBuilder<ExtDevServerBuilderOptions, DevServerBuilderOutput>(serveCustomWebpackBrowser);
