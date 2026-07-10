import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { AddressRepositoryImpl } from '@/features/data/repository/address.repositoryImpl';
import { AddressApiDataSource } from '@/features/data/source/api/address.api';
import { AddressDataSource } from '@/features/data/source/store/address.store';
import { SearchAddressRequest, SearchAddressResponse } from '@/features/domain/model/searchAddress.model';
import { GetAddressUseCase, SaveAddressUseCase, SearchAddressUseCase } from '@/features/domain/usecase/address.usecase';

const defaultRequest: SearchAddressRequest = {
    searchText: 'Seoul City Hall',
    fields: 'roadAddress',
    sortedBy: 'desc',
    country: 'KR'
};

export function useSearchAddressVM() {
    const storeDataSourceRef = useRef(new AddressDataSource());
    const [request, setRequest] = useState<SearchAddressRequest>(defaultRequest);
    const [result, setResult] = useState<SearchAddressResponse | null>(null);
    const [savedAddress, setSavedAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const addressApiDataSource = new AddressApiDataSource();
    const addressStoreDataSource = storeDataSourceRef.current;
    const addressRepository = new AddressRepositoryImpl(addressApiDataSource, addressStoreDataSource);

    const searchAddressUseCase = new SearchAddressUseCase(addressRepository);
    const saveAddressUseCase = new SaveAddressUseCase(addressRepository);
    const getAddressUseCase = new GetAddressUseCase(addressRepository);

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
