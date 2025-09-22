import { SearchAddressUseCase, SaveAddressUseCase } from "@/features/domain/usecase/address.usecase";
import { AddressRepositoryImpl } from "@/features/data/repository/address.repositoryImpl";
import { AddressApiDataSource } from "@/features/data/source/api/address.api";
import { SearchAddressRequest } from "@/features/domain/model/searchAddress.model";
import { useJoinStore } from "@/stores/join";

export function useSearchAddressVM() {
    const addressApiDataSource = new AddressApiDataSource();
    const joinStore = useJoinStore();
    const addressRepository = new AddressRepositoryImpl(addressApiDataSource, joinStore);

    const searchAddressUC = new SearchAddressUseCase(addressRepository);
    const saveAddressUC = new SaveAddressUseCase(addressRepository);

    async function search(request: SearchAddressRequest) {
        const result = await searchAddressUC.execute(request);

        if (result.type === 'success') {
            saveAddressUC.execute(result.data);
        } else {
            throw new Error(result.message);
        }
    }

    return { search }
}
