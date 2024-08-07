import React from 'react';
import { SupportedLanguages } from 'turnstile-types';
import { StyleProp, ViewStyle } from 'react-native';

interface TurnstileProps extends TurnstileCallbacks {
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
interface TurnstileCallbacks {
    onVerify?: (token: string) => void;
    onLoad?: (widgetId: string) => void;
    onError?: (error?: Error | any) => void;
    onExpire?: (token: string) => void;
    onTimeout?: () => void;
    onAfterInteractive?: () => void;
    onBeforeInteractive?: () => void;
    onUnsupported?: () => void;
}
type TurnstileResetRef = React.MutableRefObject<() => void | undefined>;
declare function ReactNativeTurnstile(props: TurnstileProps): React.JSX.Element;
declare function resetTurnstile(ref: TurnstileResetRef): void;

export { ReactNativeTurnstile as default, resetTurnstile };
