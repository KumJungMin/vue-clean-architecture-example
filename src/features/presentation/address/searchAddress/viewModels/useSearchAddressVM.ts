import { ChangeEvent, FormEvent, useState } from 'react';
import { useAddressUseCases } from '@/features/di/address/usecases';
import { SearchAddressRequest, SearchAddressResponse } from '@/features/domain/model/searchAddress.model';

const defaultRequest: SearchAddressRequest = {
    searchText: 'Seoul City Hall',
    fields: 'roadAddress',
    sortedBy: 'desc',
    country: 'KR'
};

export function useSearchAddressVM() {
    const [request, setRequest] = useState<SearchAddressRequest>(defaultRequest);
    const [result, setResult] = useState<SearchAddressResponse | null>(null);
    const [savedAddress, setSavedAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {
        searchAddressUseCase,
        saveAddressUseCase,
        getAddressUseCase
    } = useAddressUseCases();

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

        const searchResult = await searchAddressUseCase(request);

        if (searchResult.type === 'success') {
            await saveAddressUseCase(searchResult.data);
            setResult(searchResult.data);
            setSavedAddress(await getAddressUseCase());
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
