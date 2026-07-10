import { useSearchAddressVM } from '@/features/presentation/address/searchAddress/viewModels/useSearchAddressVM';

export function SearchAddressPage() {
    const {
        request,
        result,
        savedAddress,
        errorMessage,
        isLoading,
        updateRequest,
        search
    } = useSearchAddressVM();

    return (
        <main className="app-shell">
            <header className="page-header">
                <h1>Address Search</h1>
                <p>React VM에서 datasource, repository, 3개 usecase를 직접 조립한 시작점입니다.</p>
            </header>

            <section className="search-layout">
                <form className="search-form" onSubmit={search}>
                    <label>
                        Search Text
                        <input
                            name="searchText"
                            value={request.searchText}
                            onChange={updateRequest}
                            placeholder="Enter an address"
                        />
                    </label>

                    <label>
                        Fields
                        <input
                            name="fields"
                            value={request.fields}
                            onChange={updateRequest}
                            placeholder="roadAddress"
                        />
                    </label>

                    <label>
                        Country
                        <input
                            name="country"
                            value={request.country}
                            onChange={updateRequest}
                            placeholder="KR"
                        />
                    </label>

                    <label>
                        Sort
                        <select name="sortedBy" value={request.sortedBy} onChange={updateRequest}>
                            <option value="desc">desc</option>
                            <option value="asc">asc</option>
                        </select>
                    </label>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Searching...' : 'Search and Save'}
                    </button>
                </form>

                <aside className="result-panel" aria-label="Search result">
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    {result ? (
                        <dl>
                            <dt>Title</dt>
                            <dd>{result.title}</dd>
                            <dt>Type</dt>
                            <dd>{result.type}</dd>
                            <dt>Detail</dt>
                            <dd>{result.detail}</dd>
                            <dt>Saved Address</dt>
                            <dd>{savedAddress}</dd>
                        </dl>
                    ) : (
                        <p className="empty-result">Search results will appear here.</p>
                    )}
                </aside>
            </section>
        </main>
    );
}
