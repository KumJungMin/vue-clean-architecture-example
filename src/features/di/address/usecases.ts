import { IAddressRepository } from '@/features/domain/repository/address.repository';
import { GetAddressUseCase, SaveAddressUseCase, SearchAddressUseCase } from '@/features/domain/usecase/address.usecase';

export function createSearchAddressUseCase(addressRepository: IAddressRepository) {
    return new SearchAddressUseCase(addressRepository);
}

export function createSaveAddressUseCase(addressRepository: IAddressRepository) {
    return new SaveAddressUseCase(addressRepository);
}

export function createGetAddressUseCase(addressRepository: IAddressRepository) {
    return new GetAddressUseCase(addressRepository);
}
