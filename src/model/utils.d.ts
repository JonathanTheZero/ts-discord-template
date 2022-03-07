export type Nullable<T> = T | null | undefined;

export type UpdateMode<T> = T extends number ? "$inc" | "$set" : "$set";