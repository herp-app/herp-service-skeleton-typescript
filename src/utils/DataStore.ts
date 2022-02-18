import { IGreetingRequest } from "../interfaces/microservice";


export default class DataStore {

    private _store: {[key: string]: IGreetingRequest} = {};

    public get(key: string): IGreetingRequest | undefined {
        return this._store[key];
    }

    public set(key: string, data: IGreetingRequest): IGreetingRequest {
        this._store[key] = data;
        return this._store[key];
    }
}