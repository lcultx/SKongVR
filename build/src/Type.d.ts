export interface IDynamic {
    update(delta?: number): any;
}
export interface AsyncLoadable {
    load(callback: (obj?: any) => void): any;
}
