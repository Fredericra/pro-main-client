import { SimpleCrypto } from 'simple-crypto-js'
const key = import.meta.env.VITE_SECRET?.trim()


const crypto = new SimpleCrypto(`${key}`);

const encryptData = (data:any):any=>{
    return crypto.encrypt(JSON.stringify(data));
}

const decryptData = (encryptedData:any):any=>{
    return crypto.decrypt(encryptedData);
}

const file = (files:any,max:number)=>{
    if(files)
    {
        const maxs = max * 1024 * 1024
        const newform = files as File
        if(newform.size>maxs) return false;
        return true
    }
    return false
}


const Utility = {
    encryptData,
    decryptData,
    file
};

export default Utility;