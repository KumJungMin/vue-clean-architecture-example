import { SearchAddressRequest, SearchAddressResponse } from "../model/searchAddress.model";
import { IAddressRepository } from "../repository/address.repository";


export type SearchAddressReturns =
{ type: 'success'; data: SearchAddressResponse } | { type: 'error'; message: string };

export type SearchAddressUseCase = (request: SearchAddressRequest) => Promise<SearchAddressReturns>;
export type SaveAddressUseCase = (address: SearchAddressResponse) => Promise<void>;
export type GetAddressUseCase = () => Promise<string>;

export async function searchAddressUseCase(
    addressRepository: IAddressRepository,
    request: SearchAddressRequest
): Promise<SearchAddressReturns> {
    try {
        const result = await addressRepository.searchAddress(request);
        return { type: 'success', data: result };
    } catch (error) {
        if (isBusinessError(error)) {
            return { type: 'error', message: error.message };
        }

        return { type: 'error', message: 'Unexpected error occurred' };
    }
}

export async function saveAddressUseCase(
    addressRepository: IAddressRepository,
    address: SearchAddressResponse
): Promise<void> {
    await addressRepository.saveAddress(address.detail);
}

export async function getAddressUseCase(addressRepository: IAddressRepository): Promise<string> {
    return addressRepository.getAddress();
}

function isBusinessError(error: unknown): error is Error {
    return error instanceof Error && error.name === 'BusinessError';
}
