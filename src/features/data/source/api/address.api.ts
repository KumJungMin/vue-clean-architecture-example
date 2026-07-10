import { SearchAddressRequestDTO, SearchAddressResponseDTO } from '@/features/data/dto/address/searchAddress.dto';

export class AddressApiDataSource {
    async searchAddress(body: SearchAddressRequestDTO): Promise<SearchAddressResponseDTO> {
        return {
            ID: `address-${body.SEARCH_TXT.trim().toLowerCase().replace(/\s+/g, '-')}`,
            TYPE: 'road',
            TITLE: body.SEARCH_TXT,
            DETAIL: `${body.COUNTRY} / ${body.FIELDS} / ${body.SORT ? 'asc' : 'desc'}`
        };
    }
}
