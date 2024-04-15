
import { Brand, Type } from "../types/types";
import { $host, $authHost } from "./index";

export const createType = async (type:Type) =>{
    const {data} = await $authHost.post('api/type',type)
    return data
}

export const fetchTypes = async () =>{
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand:Brand) =>{
    const {data} = await $authHost.post('api/brand',brand)
    return data
}

export const fetchBrand = async () =>{
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device:{}) =>{
    const {data} = await $authHost.post('api/device',device)
    return data
}

export const fetchDevices = async () =>{
    const {data} = await $host.get('api/device')
    return data
}
export const fetchOneDevice = async (id:number) =>{
    const {data} = await $host.get('api/device/'+id)
    return data
}
