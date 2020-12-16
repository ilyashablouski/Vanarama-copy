/* eslint-disable */

/*
  NOTE: This modifies next.js internal api behavior and may break your application.
  Tested on next.js version: 9.2.1

  https://medium.com/medwing-engineering-product-design/hacking-next-js-for-better-pagespeed-scores-6c651d19f218
*/
import React from 'react';

import { Head } from 'next/document';

type DocumentFiles = {
  sharedFiles: readonly string[];
  pageFiles: readonly string[];
  allFiles: readonly string[];
};

function dedupe<T extends { file: string }>(bundles: T[]): T[] {
  const files = new Set<string>();
  const kept: T[] = [];

  for (const bundle of bundles) {
    if (files.has(bundle.file)) continue;
    files.add(bundle.file);
    kept.push(bundle);
  }
  return kept;
}

class HeadCustom extends Head {
  // getCssLinks(files: DocumentFiles): JSX.Element[] | null {
  //   return null;
  // }

  getCssLinks(files: DocumentFiles): JSX.Element[] | null {
    const {
      assetPrefix,
      devOnlyCacheBusterQueryString,
      dynamicImports,
    } = this.context;
    const cssFiles = files.allFiles.filter(f => f.endsWith('.css'));
    const sharedFiles: Set<string> = new Set(files.sharedFiles);

    // Unmanaged files are CSS files that will be handled directly by the
    // webpack runtime (`mini-css-extract-plugin`).
    let unmangedFiles: Set<string> = new Set([]);
    let dynamicCssFiles = dedupe(
      dynamicImports.filter(f => f.file.endsWith('.css')),
    ).map(f => f.file);
    if (dynamicCssFiles.length) {
      const existing = new Set(cssFiles);
      dynamicCssFiles = dynamicCssFiles.filter(
        f => !(existing.has(f) || sharedFiles.has(f)),
      );
      unmangedFiles = new Set(dynamicCssFiles);
      cssFiles.push(...dynamicCssFiles);
    }

    const cssLinkElements: JSX.Element[] = [];
    cssFiles.forEach(file => {
      const isSharedFile = sharedFiles.has(file);
      const isUnmanagedFile = unmangedFiles.has(file);
      cssLinkElements.push(
        <link
          key={file}
          nonce={this.props.nonce}
          rel="stylesheet"
          href={`${assetPrefix}/_next/${encodeURI(
            file,
          )}${devOnlyCacheBusterQueryString}`}
          crossOrigin={
            this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN
          }
          data-n-g={isUnmanagedFile ? undefined : isSharedFile ? '' : undefined}
          data-n-p={isUnmanagedFile ? undefined : isSharedFile ? undefined : ''}
        />,
      );
    });

    return cssLinkElements.length === 0 ? null : cssLinkElements;
  }

  getPreloadMainLinks() {
    return [];
  }

  getPreloadDynamicChunks() {
    return [];
  }
}

export default HeadCustom;
