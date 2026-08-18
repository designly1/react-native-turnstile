# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-08-17

### Added

- `backgroundColor` prop to customize the hosted Turnstile page background (passed as a URL query parameter).

### Changed

- Updated dev dependencies: React 19.2, React Native 0.87, react-native-webview 14, Jest 30, TypeScript 5.9, ESLint 9.39, and Babel 7.29.
- Migrated ESLint from legacy `.eslintrc.js` to flat config (`eslint.config.js`) using `@react-native/eslint-config`.
- Replaced deprecated `metro-react-native-babel-preset` with `@react-native/babel-preset`.
- Updated `tsconfig.json` for React Native 0.87 bundled types and `tsup` DTS compatibility.
- Fixed React 19 and react-native-webview 14 typings: default `RNCWebView` import, `InstanceType<typeof RNCWebView>` ref type, and typed `WebViewMessageEvent` on `onMessage`.

### Removed

- Legacy `.eslintrc.js` and `.eslintignore` in favor of flat ESLint config.

## [1.0.9] - 2024-08-07

### Changed

- Switched the hosted Turnstile endpoint from `https://d.designly.biz` to `https://turnstile.1337707.xyz`.

## [1.0.8] - 2024-08-07

### Fixed

- Corrected a typo in the Expo installation instructions (`react-native-turnsile` → `react-native-turnstile`).

## [1.0.7] - 2024-08-07

### Changed

- Updated README installation instructions to require `react-native-webview` as an explicit peer dependency.
- Added Expo-specific installation instructions.

## [1.0.6] - 2024-08-07

### Fixed

- Removed debug `console.log` output from the WebView message handler.

## [1.0.5] - 2024-08-07

### Added

- Full Cloudflare Turnstile widget configuration support: `action`, `cData`, `theme`, `language`, `size`, `retry`, `refreshExpired`, `appearance`, `execution`, and related options.
- Turnstile lifecycle callbacks: `onLoad`, `onError`, `onExpire`, `onTimeout`, `onAfterInteractive`, `onBeforeInteractive`, and `onUnsupported`.
- Programmatic widget reset via `resetRef` and exported `resetTurnstile()` helper.
- Structured JSON event handling from the hosted Turnstile bridge.
- `style` and `webviewStyle` props for layout customization.
- `className` prop for NativeWind compatibility.
- README with usage examples and API documentation.

### Changed

- Rebuilt the component around a hosted Next.js Turnstile bridge loaded in a WebView.
- Switched to a single bundled build output with TypeScript declarations.

## [1.0.4] - 2024-08-07

### Added

- MIT license header to source files.

### Changed

- Wrapped the WebView in a React Native `View` container.

## [1.0.3] - 2024-08-06

### Fixed

- TypeScript declaration compatibility for React imports in published `.d.ts` files.

## [1.0.2] - 2024-08-06

### Changed

- Split build output into separate modules (`ReactNativeTurnstile`, `constants`, and `index`).
- Updated the hosted endpoint URL path to `/turnstile`.

## [1.0.1] - 2024-08-06

### Added

- Initial working `ReactNativeTurnstile` component with `sitekey` and `onVerify` props.
- TypeScript build pipeline via `tsup`.
- Published `dist/` artifacts and type declarations.

### Changed

- License changed from ISC to MIT.
- Expanded package metadata (author, `files` field, build script).

## [1.0.0] - 2024-08-06

### Added

- Initial project scaffold and npm package metadata.
- Peer dependencies for React, React Native, and react-native-webview.

[Unreleased]: https://github.com/designly1/react-native-turnstile/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/designly1/react-native-turnstile/compare/v1.0.9...v1.1.0
[1.0.9]: https://github.com/designly1/react-native-turnstile/compare/v1.0.8...v1.0.9
[1.0.8]: https://github.com/designly1/react-native-turnstile/compare/v1.0.7...v1.0.8
[1.0.7]: https://github.com/designly1/react-native-turnstile/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/designly1/react-native-turnstile/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/designly1/react-native-turnstile/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/designly1/react-native-turnstile/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/designly1/react-native-turnstile/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/designly1/react-native-turnstile/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/designly1/react-native-turnstile/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/designly1/react-native-turnstile/releases/tag/v1.0.0
