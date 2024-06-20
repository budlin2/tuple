import { useEffect, useState } from "react";

export enum PlatformT {
    iOS='IOS',
    Android='ANDROID',
    Desktop='DESKTOP',
    NULL='NULL',
}

export interface InstallPromptEvent extends Event {
    prompt: () => void;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
}

const getPlatform = (): PlatformT => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(userAgent)) {
        return PlatformT.Android;
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return PlatformT.iOS;
    }
    return PlatformT.Desktop;
};

const usePlatform = (): PlatformT => {
    const [platform, setPlatform] = useState<PlatformT>(PlatformT.NULL);

    useEffect(() => {
        setPlatform(getPlatform());
    }, []);

    return platform;
}

export default usePlatform;
