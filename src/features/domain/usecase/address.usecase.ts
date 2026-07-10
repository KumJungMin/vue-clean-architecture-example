import { SearchAddressRequest, SearchAddressResponse } from "../model/searchAddress.model";
import { IAddressRepository } from "../repository/address.repository";
import { BaseUseCase } from "./_base/base.usecase";


type SearchAddressReturns = 
{ type: 'success'; data: SearchAddressResponse } | { type: 'error'; message: string };


export class SearchAddressUseCase extends BaseUseCase<[SearchAddressRequest], SearchAddressReturns> {
    constructor(private readonly addressRepository: IAddressRepository) {
        super();
    }

    protected async run(args: SearchAddressRequest): Promise<SearchAddressReturns> {
        const result = await this.addressRepository.searchAddress(args);

        return { type: 'success', data: result };
    }

    protected handleBusinessError(error: any): SearchAddressReturns {
        return { type: 'error', message: error.message };
    }

    protected handleUnexpectedError(): SearchAddressReturns {
        return { type: 'error', message: 'Unexpected error occurred' };
    }
}


export class SaveAddressUseCase extends BaseUseCase<[SearchAddressResponse], void> {
    constructor(private readonly addressRepository: IAddressRepository) {
        super();
    }

    protected async run(address: SearchAddressResponse): Promise<void> {
        await this.addressRepository.saveAddress(address.detail);
    }

    protected handleBusinessError(error: any): void {
        throw error;
    }
    
    protected handleUnexpectedError(error: any): void {
        throw error;
    }
}


export class GetAddressUseCase extends BaseUseCase<[], string> {
    constructor(private readonly addressRepository: IAddressRepository) {
        super();
    }

    protected async run(): Promise<string> {
        return this.addressRepository.getAddress();
    }

    protected handleBusinessError(error: any): string {
        throw error;
    }

    protected handleUnexpectedError(error: any): string {
        throw error;
    }
}
