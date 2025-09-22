export class AddressApiDataSource {
    // API data source methods would go here
    async searchAddress(body) {
        return $api.post('/address/search', body);
    }
}
