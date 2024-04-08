import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
    private _types: {id: number, name: string}[]
    private _brands: any[]
    private _devices: any[]
    private _selectedType: any
    private _selectedBrand: any

    constructor() {
        this._types = [
            { id: 1, name: 'Холодильники' },
            { id: 2, name: 'Смартфоны' },
            { id: 3, name: 'Ноутбуки' },
            { id: 4, name: 'Телевизоры' },
            { id: 5, name: 'Стиральные машинки' },
            { id: 6, name: 'Кофемашины' },
        ]
        this._brands = [
            { id: 1, name: 'Samsung' },
            { id: 2, name: 'Apple' },
            { id: 3, name: 'Lenovo' },
            { id: 4, name: 'Atlant' },
            { id: 5, name: 'LG' },
            { id: 6, name: 'Redmi' },
        ]
        this._devices = [
            { id: 1, name: "10pro", price: 25000, img: "https://ir.ozone.ru/s3/multimedia-0/wc1000/6808978188.jpg", rating: 5 },
            { id: 2, name: "11pro", price: 25000, img: "https://ir.ozone.ru/s3/multimedia-3/wc1000/6808978191.jpg", rating: 4 },
            { id: 3, name: "12pro", price: 25000, img: "https://ir.ozone.ru/s3/multimedia-7/wc1000/6808978195.jpg", rating: 5 },
            { id: 4, name: "13pro", price: 25000, img: "https://ir.ozone.ru/s3/multimedia-5/wc1000/6686667257.jpg", rating: 4 },
            { id: 5, name: "14pro", price: 25000, img: "https://ir.ozone.ru/s3/multimedia-0/wc1000/6808978188.jpg", rating: 5 },
            { id: 6, name: "15pro", price: 25000, img: "https://ir.ozone.ru/s3/multimedia-3/wc1000/6808978191.jpg", rating: 3 },
            { id: 7, name: "16pro", price: 25000, img: "https://ir.ozone.ru/s3/multimedia-7/wc1000/6808978195.jpg", rating: 5 },
            { id: 8, name: "17ro", price: 25000, img: "https://ir.ozone.ru/s3/multimedia-5/wc1000/6686667257.jpg", rating: 5 },


        ]
        this._selectedType = {};
        this._selectedBrand = {};

        makeAutoObservable(this)
    }

    setTypes(types: any[]) {
        this._types = types
    }
    setBrand(brands: any[]) {
        this._brands = brands
    }
    setDevice(devices: any[]) {
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
}
