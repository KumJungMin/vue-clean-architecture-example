export interface AddressDataSource {
    getAddress(): string;
    setAddress(address: string): void;
}

export function createAddressStoreDataSource(): AddressDataSource {
    let address = '';

    return {
        getAddress: () => address,
        setAddress: (nextAddress) => {
            address = nextAddress;
        }
    };
}
