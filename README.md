# react-native-turnstile

A wrapper for [Cloudflare Turnstile](https://challenges.cloudflare.com) for use with React Native app.

## How It Works

The cookies used by CloudFlare Turnstile are incompatible with `react-native-webview`. This package circumvents that by loading a tiny Next.js app running CloudFlare that creates an interface between a `react-native-webview` component and the Turnstile widget.

**IMPORTANT**: You must add the domain `turnstile.1337707.xyz` to your Turnstile domains list. This is the hosted instance on CloudFlare.

## Installation

```sh
npm i react-native-turnstile react-native-webview
```

If you're running Expo, then:

```sh
expo install react-native-webview
npm i react-native-turnstile
```

## Usage

```jsx
import { useRef } from "react";
import ReactNativeTurnstile, { resetTurnsile } from "react-native-turnstile";

// ...

// Programmatic access example:
const turnstileResetRef = useRef();

const result = await fetch('/path/to/some/api');
if (!result.ok) {
  throw new Error(`Request failed with code ${result.status}`);
  resetTurnstile(turnstileResetRef);
}


function TurnstileWidget() {
  return (
	<ReactNativeTurnstile
		sitekey="xxxxxxxxxxxxxxxxxxx"
		onVerify={token => console.log(token)}
		resetRef={resetTurnstileRef}
		style={{ marginLeft: 'auto', marginRight: 'auto' }}
	/>
  );
}
```

Turnstile tokens expire after 5 minutes, to automatically reset the challenge once they expire,
set the `autoResetOnExpire` prop to true or reset the widget yourself using the `onExpire` callback.

## Documentation

`ReactNativeTurnstile` takes the following arguments:

| name               | type                   | description                                           |
| ------------------ | ---------------------- | ----------------------------------------------------- |
| sitekey            | `string`               | sitekey of your website (REQUIRED)                    |
| action?            | `string`               | -                                                     |
| cData?             | `string`               | -                                                     |
| theme?             | `string`               | one of "light", "dark", "auto"                        |
| size?              | `string`               | one of "compact", "normal"                            |
| tabIndex?          | `number`               | -                                                     |
| responseField?     | `boolean`              | controls generation of `<input />` element            |
| responseFieldName? | `string`               | changes the name of `<input />` element               |
| retry?             | `string`               | one of "auto", "never"                                |
| retryInterval?     | `number`               | interval of retries in ms                             |
| autoResetOnExpire? | `boolean`              | automatically reset the widget when the token expires |
| id?                | `string`               | id of the div                                         |
| resetRef?          | `TurnstileResetRef`    | ref in which to inject the reset()                    |
| className?         | `string`               | only provided to facilitate NativeWind classes        |
| style?             | `StyleProp<ViewStyle>` | passed to the RN View container                       |

And the following callbacks:

| name       | arguments | description                                |
| ---------- | --------- | ------------------------------------------ |
| onVerify?  | token     | called when challenge is passed (REQUIRED) |
| onLoad?    | widgetId  | called when the widget is loaded           |
| onError?   | error     | called when an error occurs                |
| onExpire?  | token     | called when the token expires              |
| onTimeout? | -         | called when the challenge expires          |

For more details on what each argument does, see the [Cloudflare Documentation](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations).
