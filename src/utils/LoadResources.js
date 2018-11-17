import { Font, Icon } from 'expo';

const loadResourcesAsync = async () => {
    return Promise.all([
        // Asset.loadAsync([
        //   require('./assets/images/robot-dev.png'),
        //   require('./assets/images/robot-prod.png'),
        // ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Icon.Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free
            // to remove this if you are not using it in your app
            'product-sans': require('../../assets/fonts/ProductSans-Regular.ttf'),
            'font-awesome': require('../../assets/fonts/FontAwesome.ttf'),
        }),
    ]);
};

export default loadResourcesAsync;
