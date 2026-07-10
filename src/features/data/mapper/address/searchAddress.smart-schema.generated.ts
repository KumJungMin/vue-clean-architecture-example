/**
 * Generated from searchAddress.mapper.schema.ts by the smart-schema-converter docs flow.
 */
export interface SearchAddressRequestDTOGenerated {
    /**
     * API search text parameter.
     *
     * - DTO: `SearchAddressRequest.searchText`
     * - DTO description: User-entered search text.
     * - DTO type: `string`
     * - DTO origin: `SearchAddressRequest.searchText`
     * - Domain type: `string`
     */
    SEARCH_TXT: string;

    /**
     * API field selection parameter.
     *
     * - DTO: `SearchAddressRequest.fields`
     * - DTO description: Requested address fields.
     * - DTO type: `string`
     * - DTO origin: `SearchAddressRequest.fields`
     * - Domain type: `string`
     */
    FIELDS: string;

    /**
     * API sort flag. true means ascending.
     *
     * - DTO: `SearchAddressRequest.sortedBy`
     * - DTO description: Domain sort direction.
     * - DTO type: `'desc' | 'asc'`
     * - DTO origin: `SearchAddressRequest.sortedBy`
     * - Domain type: `boolean`
     */
    SORT: boolean;

    /**
     * API country code parameter.
     *
     * - DTO: `SearchAddressRequest.country`
     * - DTO description: Domain country code.
     * - DTO type: `string`
     * - DTO origin: `SearchAddressRequest.country`
     * - Domain type: `string`
     */
    COUNTRY: string;
}

/**
 * Generated from searchAddress.mapper.schema.ts by the smart-schema-converter docs flow.
 */
export interface SearchAddressResponseGenerated {
    /**
     * Address identifier used by the domain.
     *
     * - DTO: `SearchAddressResponseDTO.ID`
     * - DTO description: Address identifier from the API response.
     * - DTO type: `string`
     * - DTO origin: `SearchAddressResponseDTO.ID`
     * - Domain type: `string`
     */
    id: string;

    /**
     * Address type used by presentation logic.
     *
     * - DTO: `SearchAddressResponseDTO.TYPE`
     * - DTO description: Address category from the API response.
     * - DTO type: `string`
     * - DTO origin: `SearchAddressResponseDTO.TYPE`
     * - Domain type: `string`
     */
    type: string;

    /**
     * Human-readable address title.
     *
     * - DTO: `SearchAddressResponseDTO.TITLE`
     * - DTO description: Display title from the API response.
     * - DTO type: `string`
     * - DTO origin: `SearchAddressResponseDTO.TITLE`
     * - Domain type: `string`
     */
    title: string;

    /**
     * Address detail saved through the save address use case.
     *
     * - DTO: `SearchAddressResponseDTO.DETAIL`
     * - DTO description: Detailed address text from the API response.
     * - DTO type: `string`
     * - DTO origin: `SearchAddressResponseDTO.DETAIL`
     * - Domain type: `string`
     */
    detail: string;
}
