import { IAddressRepository } from "@/features/domain/repository/address.repository";
import { SearchAddressRequest, SearchAddressResponse } from "@/features/domain/model/searchAddress.model";
import { AddressApiDataSource } from "@/features/data/source/api/address.api";
import { SearchAddressRequestMapper, SearchAddressResponseMapper } from "@/features/data/mapper/address/searchAddress.mapper";
import { AddressDataSource } from "@/features/data/source/store/address.store";

export class AddressRepositoryImpl implements IAddressRepository {
    constructor(
        private addressApiDataSource: AddressApiDataSource, 
        private storeDataSource: AddressDataSource
    ) {}

    async searchAddress(body: SearchAddressRequest): Promise<SearchAddressResponse> {
        const dtoData = new SearchAddressRequestMapper().toDTO(body);

        const response = await this.addressApiDataSource.searchAddress(dtoData);

        return new SearchAddressResponseMapper().toDomain(response);
    }

    saveAddress(address: string) {
        this.storeDataSource.setAddress(address);
    }

    getAddress(): string {
       return this.storeDataSource.getAddress();
    }
    
}
