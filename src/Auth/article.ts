import currency from "currency-codes-ts";
import { defineStore } from "pinia";
import type { Article, carouselle, letter, messageLetter, publication, select, store } from "../Type";
import { userStore } from "./Store";
import { City, Country, type ICity, type ICountry } from "country-state-city";
const store = userStore();

export const storeArticle = defineStore("store", {
  state: (): store => ({
    pub: [],
    article: [],
    country: [],
    city: [],
    device: [],
    letter: null,
    currentCountry:null,
    Carouselle:null,
    newletter:null,
    vente:0
  }),
  getters: {
    getNewLetter:(state)=>{
      return state.newletter
    },
    getAffaire:(state)=>{return state.vente},
    getArticle: (state): Article[]  => {
      return state.article;
    },
    getPub: (state): publication[] => {
      return state.pub;
    },
    getCountry: (state) => {
      return state.country;
    },
    getCity: (state) => {
      return state.city;
    },
    getCurrent: (state):select[]|select => {
      return state.device;
    },
    getLetter: (state): string  => {
      if(state.letter!==null) return state.letter.message;
      return ''
    },
    getCurrentCountry:(state)=>{
      return state.currentCountry;
    },
    getCarouselle:(state)=>{
      return state.Carouselle
    }
  },
  actions: {
    async checkVente():Promise<void>{
      await this.checkArticle();
     this.vente = this.article.reduce((sum,item)=>{
        return sum + (Number(item.priceI) || 0)
     },0)
      
    },
    async checkNewLetter():Promise<void>{
      const res = await store.Geting('getletter');
      this.newletter = res.data as letter[]|null
    },
    async checkCarousselle():Promise<void>{
      const res = await store.Geting('getimagecarouselle');
      this.Carouselle = res.data as carouselle[]|null
    },
    async checkLetter(type: string): Promise<messageLetter | null> {
      this.letter = null;
      const res = await store.Posting({ type: type }, "getallmessage");
      this.letter = res.data as messageLetter
      return this.letter
    },
    async checkArticle(): Promise<void> {
      try {
        const res = await store.Geting("getarticle");
        this.article = res.data as Article[];
      } catch (error) {
        console.log(error)
      }
    },
    async checkPub(): Promise<void>{
      try {
        const res = await store.Geting("getpub");
        this.pub = res.data as publication[];

      } catch (error) {
        console.log(error)
      }
    },
    async checkCountrySelect(): Promise<void> {
      this.country = [];
      const countrys = Country.getAllCountries() as ICountry[];
      for (let x of countrys) {
        this.country.push({
          value: x.name,
          label: x.name,
          isoCode: x.isoCode,
          phoneCode: x.phonecode,
          flag: x.flag,
          device:x.currency,
        });
      }
    },
    async findCity(isoCode: string): Promise<ICity[]> {
      let cities = []
      cities = City.getCitiesOfCountry(isoCode) as ICity[];
      if (isoCode === "MG") {
        cities.push(
          {
            name: "Antananarivo",
            countryCode: "MG",
            latitude: "-18.81",
            longitude: "49",
            stateCode: "D",
          },
          {
            name: "Toamasina",
            countryCode: "MG",
            latitude: "-18.81",
            longitude: "49",
            stateCode: "D",
          },
          {
            name: "Fianaratsoa",
            countryCode: "MG",
            latitude: "-18.81",
            longitude: "49",
            stateCode: "D",
          },
          {
            name: "Mahanjanga",
            countryCode: "MG",
            latitude: "-18.81",
            longitude: "49",
            stateCode: "D",
          },
          {
            name: "Toliara",
            countryCode: "MG",
            latitude: "-18.81",
            longitude: "49",
            stateCode: "D",
          },
          {
            name: "Antsiranana",
            countryCode: "MG",
            latitude: "-18.81",
            longitude: "49",
            stateCode: "D",
          },
        );
      }
      return cities;
    },
    async checkCitySelect(isoCode: string): Promise<void> {
      this.city = [];
      const cities = await this.findCity(isoCode);
      for (let x of cities) {
        this.city.push({ value: x.name, label: x.countryCode });
      }
    },
    async checkCurrentUser(pays:string):Promise<void>{
      this.device = [];
       const devices = currency.data as any[];
      this.device = devices.find((item)=>{
        const find = item.countries.find((item:string)=>{return item.toLocaleLowerCase() === pays.toLocaleLowerCase()})
        if(find){
          return {
            label:item.currency,
            value:item.currency,
            isoCode:item.code
          }
        }
      })
      this.device as select
    },
    async checkCurrent(): Promise<void> {
      const devices = currency.data as any[];
      await this.checkCountrySelect();
      this.device = devices.map(x=>(
        {
            label: x.currency,
            value: x.code,
            device:x.currency,
            isoCode:x.code
          }
      ))

    }
  },
});
