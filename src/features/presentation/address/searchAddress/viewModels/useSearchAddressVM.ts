import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { AddressApiDataSource } from '@/features/data/source/api/address.api';
import { AddressDataSource } from '@/features/data/source/store/address.store';
import { createAddressRepository } from '@/features/di/address/repositories';
import { createGetAddressUseCase, createSaveAddressUseCase, createSearchAddressUseCase } from '@/features/di/address/usecases';
import { SearchAddressRequest, SearchAddressResponse } from '@/features/domain/model/searchAddress.model';

const defaultRequest: SearchAddressRequest = {
    searchText: 'Seoul City Hall',
    fields: 'roadAddress',
    sortedBy: 'desc',
    country: 'KR'
};

function useUseCases(addressStoreDataSource: AddressDataSource) {
    return useMemo(() => {
        const addressApiDataSource = new AddressApiDataSource();
        const addressRepository = createAddressRepository(addressApiDataSource, addressStoreDataSource);

        return {
            searchAddressUseCase: createSearchAddressUseCase(addressRepository),
            saveAddressUseCase: createSaveAddressUseCase(addressRepository),
            getAddressUseCase: createGetAddressUseCase(addressRepository)
        };
    }, [addressStoreDataSource]);
}

export function useSearchAddressVM() {
    const storeDataSourceRef = useRef(new AddressDataSource());
    const [request, setRequest] = useState<SearchAddressRequest>(defaultRequest);
    const [result, setResult] = useState<SearchAddressResponse | null>(null);
    const [savedAddress, setSavedAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {
        searchAddressUseCase,
        saveAddressUseCase,
        getAddressUseCase
    } = useUseCases(storeDataSourceRef.current);

    function updateRequest(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setRequest((current) => ({
            ...current,
            [name]: value
        }));
    }

    async function search(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        const searchResult = await searchAddressUseCase.execute(request);

        if (searchResult.type === 'success') {
            await saveAddressUseCase.execute(searchResult.data);
            setResult(searchResult.data);
            setSavedAddress(await getAddressUseCase.execute());
        } else {
            setResult(null);
            setErrorMessage(searchResult.message);
        }

        setIsLoading(false);
    }

    return {
        request,
        result,
        savedAddress,
        errorMessage,
        isLoading,
        updateRequest,
        search
    };
}
