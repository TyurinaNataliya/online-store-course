import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
    private _types: {id: number, name: string}[]
    private _brands: any[]
    private _devices: any[]
    private _selectedType: any
    private _selectedBrand: any
    private _page: any
    private _totalCount: any
    private _limit: any

    constructor() {
        this._types = [];
        this._brands = [];
        this._devices = [];
        this._selectedType = {};
        this._selectedBrand = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 12;

        makeAutoObservable(this)
    }

    setTypes(types: any[]) {
        this._types = types
    }
    setBrands(brands: any[]) {
        this._brands = brands
    }
    setPage(page:number){
        this._page = page
    }
    setTotalCount(totalCount: number){
        this._totalCount = totalCount
    }
    setLimit(limit:number){
        this._limit = limit
    }


    setDevices(devices: any[]) {
        this._devices = devices
    }
    setSelectedType(type: any) {
        this._selectedType = type

    }
    setSelectedBrand(brand: any) {
        this._selectedBrand = brand

    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}
