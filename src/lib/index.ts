export { default as Tuple } from '../components/Tuple';
export { default as Page } from '../components/Page';
export { default as Bubble } from '../components/Bubble';

import lannister from '../components/Tuple/templates/lannister.module.css';
import baratheon from '../components/Tuple/templates/baratheon.module.css';
export const templates = {
    lannister,
    baratheon,
}

export { getUniqueId } from '../utils';

export { default as usePlatform } from '../hooks/usePlatform';
export type { InstallPromptEvent, PlatformT } from '../hooks/usePlatform';
export { default as useInstalled } from '../hooks/useInstalled';
