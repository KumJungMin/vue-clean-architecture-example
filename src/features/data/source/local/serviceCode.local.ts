export interface ServiceCodeLocalDataSource {
    getLanguageCode(): string;
    setLanguageCode(code: string): void;
}

export function createServiceCodeLocalDataSource(): ServiceCodeLocalDataSource {
    return {
        getLanguageCode: () => sessionStorage.getItem('languageCode') || 'en',
        setLanguageCode: (code) => {
            sessionStorage.setItem('languageCode', code);
        }
    };
}
