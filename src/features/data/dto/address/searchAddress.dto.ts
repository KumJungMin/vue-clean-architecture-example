
export interface SearchAddressRequestDTO {
    SEARCH_TXT: string;
    MAX_RECS: number;
    MIN_RECS: number;
    FIELDS: string;
    SORT: string;
    STS: string;
    RTYPE: string;
    COUNTRY: string;
}

export interface SearchAddressResponseDTO {
    ID: string;
    TYPE: string;
    SUBTYPE: string;
    LINE1: string;
    LINE2: string;
    LINE3: string;
}