export type CurrencyModel = {
    id: number;
    name?: string;
    currency_code?: string;
    currency_symbol?: string;
}

export type CurrencyModelColumn = keyof CurrencyModel;

export const currencyModelColumns: CurrencyModelColumn[] = [
    "id",
    "name",
    "currency_code",
    "currency_symbol"
];

export const currencyModelColumnSet: Set<CurrencyModelColumn> = new Set(currencyModelColumns);
