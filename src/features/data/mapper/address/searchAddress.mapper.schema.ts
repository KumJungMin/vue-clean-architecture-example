import { defineMap, makeMapper, source, transform } from 'smart-schema-converter';
import { SearchAddressRequestDTO, SearchAddressResponseDTO } from '@/features/data/dto/address/searchAddress.dto';
import { SearchAddressRequest, SearchAddressResponse } from '@/features/domain/model/searchAddress.model';

export const searchAddressRequestMap = defineMap<SearchAddressRequest, SearchAddressRequestDTO>()({
    SEARCH_TXT: source<string>('searchText', {
        dtoOrigin: 'SearchAddressRequest.searchText',
        dtoDescription: 'User-entered search text.',
        domainDescription: 'API search text parameter.'
    }),
    FIELDS: source<string>('fields', {
        dtoOrigin: 'SearchAddressRequest.fields',
        dtoDescription: 'Requested address fields.',
        domainDescription: 'API field selection parameter.'
    }),
    SORT: transform<'desc' | 'asc', boolean>('sortedBy', (sortedBy) => sortedBy === 'asc', {
        dtoOrigin: 'SearchAddressRequest.sortedBy',
        dtoDescription: 'Domain sort direction.',
        domainDescription: 'API sort flag. true means ascending.'
    }),
    COUNTRY: source<string>('country', {
        dtoOrigin: 'SearchAddressRequest.country',
        dtoDescription: 'Domain country code.',
        domainDescription: 'API country code parameter.'
    })
});

export const searchAddressResponseMap = defineMap<SearchAddressResponseDTO, SearchAddressResponse>()({
    id: source<string>('ID', {
        dtoOrigin: 'SearchAddressResponseDTO.ID',
        dtoDescription: 'Address identifier from the API response.',
        domainDescription: 'Address identifier used by the domain.'
    }),
    type: source<string>('TYPE', {
        dtoOrigin: 'SearchAddressResponseDTO.TYPE',
        dtoDescription: 'Address category from the API response.',
        domainDescription: 'Address type used by presentation logic.'
    }),
    title: source<string>('TITLE', {
        dtoOrigin: 'SearchAddressResponseDTO.TITLE',
        dtoDescription: 'Display title from the API response.',
        domainDescription: 'Human-readable address title.'
    }),
    detail: source<string>('DETAIL', {
        dtoOrigin: 'SearchAddressResponseDTO.DETAIL',
        dtoDescription: 'Detailed address text from the API response.',
        domainDescription: 'Address detail saved through the save address use case.'
    })
});

export const toSearchAddressRequestDTO = makeMapper<SearchAddressRequest, SearchAddressRequestDTO>(searchAddressRequestMap);
export const toSearchAddressResponse = makeMapper<SearchAddressResponseDTO, SearchAddressResponse>(searchAddressResponseMap);
