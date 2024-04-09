export type TypeDevice={
    id:number,
    name:string,
    price:number,
    rating:number,
    img:string,
    typeId?:number,
    brandId?:number
}

export type Type={
    id:number,
    name:string
}

export type Brand={
    id:number,
    name:string
}

export type TypeUser={
    id:number,
    email:string,
    password:string,
    role:string
}

export type TypeBasket={
    id:number,
    user_id:number
}

export type TypeBasketDevice={
    id:number,
    device_id:number,
    brand_id:number,
}

export type TypeDeviceInfo={
    id:number,
    device_id:number,
    title:string,
    description:string
}