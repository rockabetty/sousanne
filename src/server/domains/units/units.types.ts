export type UnitModel = {
    id: number;
    name: string;
    is_volume?: boolean;
    abbreviation?: string;
}

export type UnitModelColumn = keyof UnitModel;

export const unitModelColumns: UnitModelColumn[] = [
    "id",
    "name",
    "is_volume",
    "abbreviation"
];

export const unitModelColumnSet: Set<UnitModelColumn> = new Set(unitModelColumns);
