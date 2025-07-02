module.exports = {
    petstore: {
        input: './swagger.json', // or a remote URL
        output: {
            mode: 'tags',
            target: './src/api/petstore.ts',
            schemas: './src/api/model',
            client: 'react-query',
        },
    },
};