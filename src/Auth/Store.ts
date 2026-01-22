import type { city, confirm, Currency, login, resData, select, setPro, sigin, User } from "../Type";
import api from "../Api/Client";
import Utility from "../Utility";
import { defineStore } from "pinia";
import { City, Country, type ICity, type ICountry } from "country-state-city";
import currency from "currency-codes-ts";

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
        viewPro:(state):setPro|null=>{return state.pro},
        current:()=>{return currency.data},
        article:():select[]=>{
            return [
                {label:"Informatique",value:"Informatique"},
                {label:"Bricolage",value:"Bricolage"},
                {label:"Mode",value:"Mode"},
                {label:"Maison",value:"Maison"},
                {label:"Jardinage",value:"Jardinage"},
                {label:"Sport",value:"Sport"},
                {label:"Santé et Beauté",value:"Santé et Beauté"},
                {label:"Automobile",value:"Automobile"},
                {label:"Jeux et Jouets",value:"Jeux et Jouets"},
                {label:"Alimentation",value:"Alimentation"},
                {label:"Livres et Médias",value:"Livres et Médias"},
                {label:"Musique et Instruments",value:"Musique et Instruments"},
                {label:"Art et Artisanat",value:"Art et Artisanat"},
                {label:"Bébés et Enfants",value:"Bébés et Enfants"},
                {label:"Animaux de Compagnie",value:"Animaux de Compagnie"},
                {label:"Voyage et Loisirs",value:"Voyage et Loisirs"},
                {label:"Autres",value:"Autres"},
            ] as select[];
        }
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
        },
        async getCurrent():Promise<Currency[]>{
            return currency.data as any[];
        },
        async getSelectCountry():Promise<select[]>{
            const selectList = []
            const country = await this.getCountry();
            for(let x of country){
                selectList.push({value:x.name,label:x.name,isoCode:x.isoCode})
            }
            return selectList ;
        },
        async getSelectCity(value:string):Promise<select[]>{
            const selectList = [];
            const city = await this.getCity(value);
            for(let x of city){
                selectList.push({value:x.name,label:x.name})
            }
            return selectList
        }
      
    }
})
