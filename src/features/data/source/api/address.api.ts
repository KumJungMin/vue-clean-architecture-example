import { SearchAddressRequestDTO, SearchAddressResponseDTO } from '@/features/data/dto/address/searchAddress.dto';

export interface AddressApiDataSource {
    searchAddress(body: SearchAddressRequestDTO): Promise<SearchAddressResponseDTO>;
}

export function createAddressApiDataSource(): AddressApiDataSource {
    return {
        async searchAddress(body) {
            return {
                ID: `address-${body.SEARCH_TXT.trim().toLowerCase().replace(/\s+/g, '-')}`,
                TYPE: 'road',
                TITLE: body.SEARCH_TXT,
                DETAIL: `${body.COUNTRY} / ${body.FIELDS} / ${body.SORT ? 'asc' : 'desc'}`
            };
        }
    };
}
