enum State {
    LOADING,
    LOADED,
    ERROR,
}

interface ILoaded<T> {
    state: State.LOADED;
    value: T;
}

interface IError {
    state: State.ERROR;
    error: string;
}

interface ILoading {
    state: State.LOADING;
}

export type LoadingOr<T> = ILoading | ILoaded<T> | IError;

/* Typegards */

export function isLoaded<T>(value: LoadingOr<T>): value is ILoaded<T> {
    return value.state === State.LOADED;
}

/* Helpers */

export function getValueOrDefault<T>(value: LoadingOr<T>, def: T): T {
    return isLoaded(value) ? value.value : def;
}

export function getOptionalValue<T>(value: LoadingOr<T>): T | null {
    return isLoaded(value) ? value.value : null;
}

export function loadedOf<T>(value: T): LoadingOr<T> {
    return { state: State.LOADED, value };
}

export function errorOf<T>(error: string): LoadingOr<T> {
    return { state: State.ERROR, error };
}

export const LOADING: ILoading = { state: State.LOADING };
