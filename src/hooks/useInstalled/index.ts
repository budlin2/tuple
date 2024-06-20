import { useEffect, useState } from "react";

const useInstalled = () => {
    const [installed, setInstalled] = useState<boolean>(true);

    useEffect(() => {
        if (!window.matchMedia('(display-mode: standalone)').matches) {
            setInstalled(false);
        }
    }, []);

    return installed;
};

export default useInstalled;