import type { city, confirm, login, resData, setPro, sigin, User } from "../Type";
import api from "../Api/Client";
import Utility from "../Utility";
import { defineStore } from "pinia";
import { City, Country, type ICity, type ICountry } from "country-state-city";



export const userStore = defineStore('auths',{
    state:()=>({
        user: null as User | null,
        auth:false,
        pro:null as setPro | null
    }),
    getters:{
        isAuth:(state)=>{ return !!state.user },
        users:(state):User|null=>{return state.user},
        IsVerify:(state)=>{ return state.user?state.user.set?.verify:false},
        viewPro:(state):setPro|null=>{return state.pro}
    },
    actions:{
        async checkAuth():Promise<User|any>{
            try{
                const res = await this.getUserCheck();
                if(res?.set?.verify)
                {
                    this.user = res
                    return res as User;
                }else{
                    return this.user = null
                }
            }catch{
                this.user = null;
            }finally{
                this.auth = true
            }
        },
        async Logout(){
            localStorage.removeItem('token');
            this.user = null
        },
        async Login(data:login):Promise<resData>{const res = await api.post("/login",{data:Utility.encryptData(data)})
        return Utility.decryptData(res.data) as resData
        },

        async register(data:sigin):Promise<resData>{const res = await api.post("/register",{data:Utility.encryptData(data)});
        return Utility.decryptData(res.data) as resData
        },

        async confirm(data:confirm):Promise<resData>{const res = await api.post("/confirm",{data: Utility.encryptData(data)})
        return Utility.decryptData(res.data) as resData;
        },
        async Geting(link:string):Promise<resData>{
            const res = await api.get(link);
            return Utility.decryptData(res.data) as resData;
        },

        async Posting(data:object,link:string):Promise<resData>{
            const res = await api.post(link,data);
            return Utility.decryptData(res.data) as resData
        },

        async getUserCheck():Promise<User|null>{
            const res = await api.get('/getuser')
            const data = Utility.decryptData(res.data) as resData
            this.user = data.data as User | null;
            return data.data as User | null;
        },

        async getPro():Promise<setPro|null>{
           try{
            const res = await this.Geting('/professionel');
            this.pro = res.data as setPro | null
            return this.pro as setPro | null
           }catch(error){
            return null;
           }
        }
        ,

        async getUser():Promise<resData>{
            const res = await api.get('/getUser');
            return Utility.decryptData(res.data) as resData;
        },
        async getCountry():Promise<ICountry[]>{
            return Country.getAllCountries() as ICountry[];
        }
        ,
        async getCity(country:string):Promise<ICity[]|city[]>{
            if(country === "MG")
            {
                return [
                    {name:"Antananarivo"},
                    {name:"Toamasina"},
                    {name:"Fianaratsoa"},
                    {name:"Mahajanga"},
                    {name:"Antsiranana"},
                    {name:"Toliara"}
                ]
            }
            else
            {
                return City.getCitiesOfCountry(country) as ICity[];
            }
        }
    }
})
