import { IAddressRepository } from "@/features/domain/repository/address.repository";
import { SearchAddressRequest, SearchAddressResponse } from "@/features/domain/model/searchAddress.model";
import { AddressApiDataSource } from "@/features/data/source/api/address.api";
import { toSearchAddressRequestDTO, toSearchAddressResponse } from "@/features/data/mapper/address/searchAddress.mapper.schema";
import { AddressDataSource } from "@/features/data/source/store/address.store";

interface AddressRepositoryDependencies {
    addressApiDataSource: AddressApiDataSource;
    storeDataSource: AddressDataSource;
}

export function createAddressRepository({
    addressApiDataSource,
    storeDataSource
}: AddressRepositoryDependencies): IAddressRepository {
    return {
        async searchAddress(body: SearchAddressRequest): Promise<SearchAddressResponse> {
            const dtoData = toSearchAddressRequestDTO(body);

            const response = await addressApiDataSource.searchAddress(dtoData);

            return toSearchAddressResponse(response);
        },

        saveAddress(address: string): void {
            storeDataSource.setAddress(address);
        },

        getAddress(): string {
            return storeDataSource.getAddress();
        }
    };
}
