import React, { useEffect, useState } from 'react'
import * as Location from "expo-location";

export const useLocation = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(
        null
    );
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [load, setLoad] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                setIsError(true);
                setLocation(null);
                return;
            }

            if (status === "granted") {
                let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                setLocation(location);
                setLoad(false);
            }

            setLoad(false);
        })();
    }, []);

    return { location, errorMsg, load, isError, setIsError };
}

