export class AddressDataSource {
    private address = '';

    getAddress(): string {
        return this.address;
    }

    setAddress(address: string): void {
        this.address = address;
    }
}
