import { useMemo } from 'react';
import { createAddressRepository } from '@/features/data/repository/address.repositoryImpl';
import { createAddressApiDataSource } from '@/features/data/source/api/address.api';
import { createAddressStoreDataSource } from '@/features/data/source/store/address.store';
import { IAddressRepository } from '@/features/domain/repository/address.repository';
import {
    GetAddressUseCase,
    SaveAddressUseCase,
    SearchAddressUseCase,
    getAddressUseCase,
    saveAddressUseCase,
    searchAddressUseCase
} from '@/features/domain/usecase/address.usecase';

export interface AddressUseCases {
    searchAddressUseCase: SearchAddressUseCase;
    saveAddressUseCase: SaveAddressUseCase;
    getAddressUseCase: GetAddressUseCase;
}

export function createSearchAddressUseCase(addressRepository: IAddressRepository): SearchAddressUseCase {
    return (request) => searchAddressUseCase(addressRepository, request);
}

export function createSaveAddressUseCase(addressRepository: IAddressRepository): SaveAddressUseCase {
    return (address) => saveAddressUseCase(addressRepository, address);
}

export function createGetAddressUseCase(addressRepository: IAddressRepository): GetAddressUseCase {
    return () => getAddressUseCase(addressRepository);
}

export function createAddressUseCases(): AddressUseCases {
    const addressApiDataSource = createAddressApiDataSource();
    const storeDataSource = createAddressStoreDataSource();
    const addressRepository = createAddressRepository({
        addressApiDataSource,
        storeDataSource
    });

    return {
        searchAddressUseCase: createSearchAddressUseCase(addressRepository),
        saveAddressUseCase: createSaveAddressUseCase(addressRepository),
        getAddressUseCase: createGetAddressUseCase(addressRepository)
    };
}

export function useAddressUseCases(): AddressUseCases {
    return useMemo(() => createAddressUseCases(), []);
}
