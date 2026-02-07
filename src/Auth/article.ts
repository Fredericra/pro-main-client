import currency from "currency-codes-ts";
import { defineStore } from "pinia";
import type { Article, letter, messageLetter, publication, store } from "../Type";
import { userStore } from "./Store";
import { City, Country, type ICity, type ICountry } from "country-state-city";
const store = userStore();

export const storeArticle = defineStore("store", {
  state: (): store => ({
    pub: null,
    article: null,
    country: [],
    city: [],
    device: [],
    letter: null,
  }),
  getters: {
    getArticle: (state): Article[] | null => {
      return state.article;
    },
    getPub: (state): publication[] | null => {
      return state.pub;
    },
    getCountry: (state) => {
      return state.country;
    },
    getCity: (state) => {
      return state.city;
    },
    getCurrent: (state) => {
      return state.device;
    },
    getLetter: (state): letter | null => {
      return state.letter;
    },
  },
  actions: {
    async checkLetter(type: string): Promise<messageLetter | null> {
      this.letter = null;
      const res = await store.Posting({ type: type }, "getallmessage");
      return res.data as messageLetter;
    },
    async checkArtcile(): Promise<Article[] | null> {
      try {
        const res = await store.Geting("getarticle");
        if (res.status) {
          this.article = res.data as Article[];
        }
        this.article = null;
        return this.article;
      } catch (error) {
        return null;
      }
    },
    async checkPub(): Promise<Article[] | null> {
      try {
        const res = await store.Geting("getpub");
        if (res.status) {
          this.pub = res.data as publication[];
        }
        this.pub = null;
        return this.pub;
      } catch (error) {
        return null;
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
        });
      }
    },
    async findCity(isoCode: string): Promise<ICity[]> {
      const cities = City.getCitiesOfCountry(isoCode) as ICity[];
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
        this.city.push({ value: x.name, label: x.name });
      }
    },
    async checkCurrent(): Promise<void> {
      const devices = currency.data as any[];
      await this.checkCountrySelect();
      for (let x of devices) {
        const findCountry = this.country.find(
          (c) => c.value === x.countries[0],
        );
        this.device.push({
          label: `${x.code} - ${x.currency} - ${findCountry ? findCountry.flag : ""}`,
          value: x.code,
        });
      }
      return;
    },
  },
});
