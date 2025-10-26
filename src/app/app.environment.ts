const env: 'production' | 'development' | 'test' | 'home' = 'development';

export const environment = {
    production: {
        url: 'https://magoraulquintana.com/api'
    },
    development: {
        url: 'http://localhost:3000/api'
    },
    test: {
        url: 'http://localhost:8080/api'
    },
    home: {
        url: 'https://diet.home/api'
    }
}

const config = environment[env];

export default config;