import { IAddressRepository } from '@/features/domain/repository/address.repository';
import {
    GetAddressUseCase,
    SaveAddressUseCase,
    SearchAddressUseCase,
    getAddressUseCase,
    saveAddressUseCase,
    searchAddressUseCase
} from '@/features/domain/usecase/address.usecase';

export function createSearchAddressUseCase(addressRepository: IAddressRepository): SearchAddressUseCase {
    return (request) => searchAddressUseCase(addressRepository, request);
}

export function createSaveAddressUseCase(addressRepository: IAddressRepository): SaveAddressUseCase {
    return (address) => saveAddressUseCase(addressRepository, address);
}

export function createGetAddressUseCase(addressRepository: IAddressRepository): GetAddressUseCase {
    return () => getAddressUseCase(addressRepository);
}
