import { Location, Permissions } from 'expo';

export const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        return new Promise((resolve, reject) => reject('Permission to access location was denied'));
    }

    return await Location.getCurrentPositionAsync({});
};
