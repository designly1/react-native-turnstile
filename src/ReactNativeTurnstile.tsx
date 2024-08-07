/*
 * MIT License
 *
 * Copyright (c) 2024 Jay Simons
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// @ts-ignore
import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';
import { useRef } from 'react';

import { PUBLIC_DOMAIN } from './constants';

import type { SupportedLanguages } from 'turnstile-types';
import type { StyleProp, ViewStyle } from 'react-native';

export interface TurnstileProps extends TurnstileCallbacks {
	sitekey: string;
	action?: string;
	cData?: string;
	theme?: 'light' | 'dark' | 'auto';
	language?: SupportedLanguages | 'auto';
	tabIndex?: number;
	responseField?: boolean;
	responseFieldName?: string;
	size?: 'normal' | 'compact';
	fixedSize?: boolean;
	retry?: 'auto' | 'never';
	retryInterval?: number;
	refreshExpired?: 'auto' | 'manual' | 'never';
	appearance?: 'always' | 'execute' | 'interaction-only';
	execution?: 'render' | 'execute';
	id?: string;
	resetRef?: TurnstileResetRef;
	className?: string;
	style?: StyleProp<ViewStyle>;
	webviewStyle?: StyleProp<ViewStyle>;
}
export interface TurnstileCallbacks {
	onVerify?: (token: string) => void;
	onLoad?: (widgetId: string) => void;
	onError?: (error?: Error | any) => void;
	onExpire?: (token: string) => void;
	onTimeout?: () => void;
	onAfterInteractive?: () => void;
	onBeforeInteractive?: () => void;
	onUnsupported?: () => void;
}

export type TurnstileEvent =
	| 'verify'
	| 'load'
	| 'error'
	| 'expire'
	| 'timeout'
	| 'afterInteractive'
	| 'beforeInteractive'
	| 'unsupported';

export interface ReactNativeTurnstleEvent {
	event: TurnstileEvent;
	data?: string;
}

export type TurnstileResetRef = React.MutableRefObject<() => void | undefined>;

type Dimension = { width: number; height: number };

interface TurnstileDimensions {
	normal: Dimension;
	compact: Dimension;
}

const turnstileDimensions: TurnstileDimensions = {
	normal: { width: 300, height: 65 },
	compact: { width: 130, height: 120 },
};

export default function ReactNativeTurnstile(props: TurnstileProps) {
	const {
		sitekey,
		onVerify,
		onLoad,
		onError,
		onExpire,
		onTimeout,
		onAfterInteractive,
		onBeforeInteractive,
		onUnsupported,
		action,
		cData,
		theme,
		language,
		tabIndex,
		responseField,
		responseFieldName,
		size,
		fixedSize,
		retry,
		retryInterval,
		refreshExpired,
		appearance,
		execution,
		id,
		resetRef,
		style,
		webviewStyle,
	} = props;

	const webviewRef = useRef<WebView>(null);

	useEffect(() => {
		if (resetRef) {
			resetRef.current = () => {
				if (webviewRef.current) {
					webviewRef.current.reload();
				}
			};
		}
	}, [resetRef]);

	// Build URL and query parameters
	const params = new URLSearchParams();

	if (sitekey) params.append('sitekey', sitekey);
	if (action) params.append('action', action);
	if (cData) params.append('cData', cData);
	if (theme) params.append('theme', theme);
	if (language) params.append('language', language);
	if (tabIndex) params.append('tabIndex', tabIndex.toString());
	if (responseField) params.append('responseField', responseField.toString());
	if (responseFieldName) params.append('responseFieldName', responseFieldName);
	if (size) params.append('size', size);
	if (fixedSize) params.append('fixedSize', fixedSize.toString());
	if (retry) params.append('retry', retry);
	if (retryInterval) params.append('retryInterval', retryInterval.toString());
	if (refreshExpired) params.append('refreshExpired', refreshExpired);
	if (appearance) params.append('appearance', appearance);
	if (execution) params.append('execution', execution);
	if (id) params.append('id', id);

	const url = `${PUBLIC_DOMAIN}/turnstile?${params.toString()}`;

	const dimensions = turnstileDimensions[size || 'normal'];

	const computedStyles: StyleProp<ViewStyle> = StyleSheet.flatten([
		{ height: dimensions.height, width: dimensions.width },
		style,
	]);
	const computedWebviewStyles: StyleProp<ViewStyle> = StyleSheet.flatten([styles.webview, webviewStyle]);

	return (
		<>
			<View style={computedStyles}>
				<WebView
					ref={webviewRef}
					source={{ uri: url }}
					onMessage={event => {
						try {
							const eventData = JSON.parse(event.nativeEvent.data) as ReactNativeTurnstleEvent;
							if (!eventData.event)
								throw new Error('Invalid event received from Turnstile endpoint');

							switch (eventData.event) {
								case 'verify':
									if (onVerify && eventData.data) onVerify(eventData.data);
									break;
								case 'load':
									if (onLoad && eventData.data) onLoad(eventData.data);
									break;
								case 'error':
									if (onError) onError(new Error(eventData.data || 'An error occurred'));
									break;
								case 'expire':
									if (onExpire && eventData.data) onExpire(eventData.data);
									break;
								case 'timeout':
									if (onTimeout) onTimeout();
									break;
								case 'afterInteractive':
									if (onAfterInteractive) onAfterInteractive();
									break;
								case 'beforeInteractive':
									if (onBeforeInteractive) onBeforeInteractive();
									break;
								case 'unsupported':
									if (onUnsupported) onUnsupported();
									break;
								default:
									console.error('Unsupported event received from Turnstile endpoint');
							}
						} catch (e) {
							console.error(e);
						}
					}}
					javaScriptEnabled={true}
					style={computedWebviewStyles}
					originWhitelist={['*']}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	webview: {
		flex: 1,
	},
});

export function resetTurnstile(ref: TurnstileResetRef) {
	if (ref.current && typeof ref.current === 'function') {
		ref.current();
	}
}
