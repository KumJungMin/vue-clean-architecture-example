import { SearchAddressRequestDTO, SearchAddressResponseDTO } from '@/features/data/dto/address/searchAddress.dto';
import { SearchAddressRequest, SearchAddressResponse } from '@/features/domain/model/searchAddress.model';



export class SearchAddressRequestMapper {
    toDTO(address: SearchAddressRequest): SearchAddressRequestDTO {
        return {
            SEARCH_TXT: address.searchText,
            FIELDS: address.fields,
            SORT: address.sortedBy === 'asc',
            COUNTRY: address.country
        };
    }
    toDomain(dto: SearchAddressResponseDTO): SearchAddressResponse {
        return {
            id: dto.ID,
            type: dto.TYPE,
            title: dto.TITLE,
            detail: dto.DETAIL
        };
    }
}

export class SearchAddressResponseMapper {
    toDomain(dto: SearchAddressResponseDTO): SearchAddressResponse {
        return {
            id: dto.ID,
            type: dto.TYPE,
            title: dto.TITLE,
            detail: dto.DETAIL
        };
    }

    toDTO(address: SearchAddressResponse): SearchAddressResponseDTO {
        return {
            ID: address.id,
            TYPE: address.type,
            TITLE: address.title,
            DETAIL: address.detail
        };
    }
}