import type {
  confirm,
  login,
  resData,
  select,
  setPro,
  sigin,
  state,
  User,
} from "../Type";
import api from "../Api/Client";
import Utility from "../Utility";
import { defineStore } from "pinia";
import currency from "currency-codes-ts";

export const userStore = defineStore("auths", {
  state: (): state => ({
    user: null,
    pro: null,
    auth: false,
    verify: false,
    allUser: null,
  }),
  getters: {
    isAuth: (state) => {
      return !!state.user;
    },
    getUser: (state): User | null => {
      return state.user;
    },
    IsVerify: (state): boolean => {
      return state.user ? (state.user?.set?.verify as boolean) : false;
    },
    getPro: (state): setPro | null => {
      return state.pro;
    },
    getAllUser: (state): User[] | null => {
      return state.allUser;
    },
    current: () => {
      return currency.data;
    },
    option: () => {
      return {
        theme: "snow",
        modules: {
          toolbar: [
            [{ font: [] }, { size: ["smal", "large", "meduim", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ header: [1, 2, 3, 4, 5, false] }, "blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
            ["note"],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
      };
    },
    article: (): select[] => {
      return [
        { label: "Informatique", value: "Informatique" },
        { label: "Bricolage", value: "Bricolage" },
        { label: "Mode", value: "Mode" },
        { label: "Maison", value: "Maison" },
        { label: "Jardinage", value: "Jardinage" },
        { label: "Sport", value: "Sport" },
        { label: "Santé et Beauté", value: "Santé et Beauté" },
        { label: "Automobile", value: "Automobile" },
        { label: "Jeux et Jouets", value: "Jeux et Jouets" },
        { label: "Alimentation", value: "Alimentation" },
        { label: "Livres et Médias", value: "Livres et Médias" },
        { label: "Musique et Instruments", value: "Musique et Instruments" },
        { label: "Art et Artisanat", value: "Art et Artisanat" },
        { label: "Bébés et Enfants", value: "Bébés et Enfants" },
        { label: "Animaux de Compagnie", value: "Animaux de Compagnie" },
        { label: "Voyage et Loisirs", value: "Voyage et Loisirs" },
        { label: "Autres", value: "Autres" },
      ] as select[];
    },
  },
  actions: {
    async checkUserList(): Promise<void> {
      const res = await this.Geting("getalluser");
      const alluser = res.data as User[] | null;
      this.allUser = alluser;
    },
    async checkAuth(): Promise<User | null> {
      try {
        const res = await this.getUserCheck();
        this.auth = !!res;
        if (res?.set?.verify) {
          this.user = res;
          this.verify = true;
          return this.user;
        } else {
          this.user = res;
          return this.user;
        }
      } catch {
        this.user = null;
        this.auth = false
        return this.user;
      }
    },
    async Login(data: login): Promise<resData> {
      const res = await api.post("/login", { data: Utility.encryptData(data) });
      const response = Utility.decryptData(res.data) as resData;
      return response;
    },

    async register(data: sigin): Promise<resData> {
      const res = await api.post("/register", {
        data: Utility.encryptData(data),
      });
      const response = Utility.decryptData(res.data) as resData;
      return response;
    },
    async confirm(data: confirm): Promise<resData> {
      const res = await api.post("/confirm", {
        data: Utility.encryptData(data),
      });
      const response = Utility.decryptData(res.data) as resData;
      if (response.status) {
      }
      return response;
    },
    async Geting(link: string): Promise<resData> {
      const res = await api.get(link);
      return Utility.decryptData(res.data) as resData;
    },

    async Posting(data: object, link: string): Promise<resData> {
      const res = await api.post(link, data);
      return Utility.decryptData(res.data) as resData;
    },

    async getUserCheck(): Promise<User | null> {
      const res = await api.get("/getuser");
      const data = Utility.decryptData(res.data) as resData;
      this.user = data.data as User | null;
      return data.data as User | null;
    },
    async loginOut(): Promise<void> {
      localStorage.removeItem("token");
      this.user = null;
      this.auth = false;
      this.pro = null;
      return;
    },
    async checkPro(): Promise<setPro | null> {
      try {
        const res = (await this.Geting("/professionel")).data as setPro | null;
        this.pro = res;
        return this.pro;
      } catch (error) {
        this.pro = null;
        return this.pro;
      }
    },
    async getUserActif(): Promise<resData> {
      const res = await api.get("/getUser");
      return Utility.decryptData(res.data) as resData;
    },
  },
});
