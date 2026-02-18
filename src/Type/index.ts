
export interface User {
  _id: string;
  username?: string;
  lastname?: string;
  firstname?: string;
  _createdAt?:Date;
  email: string;
  password: string;
  set?: {
    _id?: string;
    _createAt?: Date;
    _updateAt?: Date;
    _type?: string;
    admin: boolean;
    bio?: string;
    check: boolean;
    code: string;
    userId: object;
    username: string;
    firstname: string;
    lastname?: string;
    verify?: boolean;
  };
}

export interface resData {
  status: boolean;
  message: string;
  data: User | {} | object;
  field: string;
  token: string;
  verify: boolean;
  code: string;
}

export interface confirm {
  confirm: string;
  other?: string;
  user?: object;
}

export interface login {
  email: string;
  password: string;
  check?: boolean;
}

export interface sigin {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  check?: boolean;
  passwordConfirm: string;
}

export interface Validation {
  validate: () => void;
  error: string;
}

export interface auth {
  isAuth: boolean;
  user: User | null;
}

export interface pro {
  nom: string;
  phone: string;
  place?: string;
  country: string;
  city: string;
  currency:string;
  file?: File | File[] | null;
}

export interface setPro {
  _type: string;
  userId: {
    _type: "reference";
    _ref: string;
  };
  nom: string;
  phone: string;
  city: string;
  country: string;
  web?: string;
  fb?: string;
  watch?: string;
  device?: string;
  type?: string;
  article?: string;
  set?: imgPro;
}

export interface imgPro {
  _type: string;
  proId: {
    _type: "reference";
    _ref: string;
  };
  link: string;
}

export interface select {
  value: string;
  label: string;
  isoCode?: string;
  phoneCode?:string;
  name?:string;
  flag?:string;
  device?:string;
  code?:string;
}

export interface city {
  name: string;
  code?: string;
}

export interface Currency {
  code: string;
  number: number;
  digits: number;
  currency: string;
  countries: string[];
}
export interface Article {
  _createdAt: Date;
  _id: string;
  _type: string;
  _updatedAt: Date;
  title: string;
  category: string;
  code: string;
  description: string;
  device: string;
  heigth: number;
  length: number;
  marque: string;
  model: string;
  userId: {
    _ref: string;
    _type: "reference";
  };
  price: number;
  priceI:number;
  quantity: number;
  set: imgArticle[];
}

export interface imgArticle {
  _createdAt: Date;
  _id: string;
  _type: 'imgAr';
  _updatedAt: Date;
  articleId: {
    _type: "reference";
    _ref: string;
  };
  links: string;
}
export interface publication {
  _createdAt: Date;
  _id: string;
  _type: string;
  _updatedAt: Date;
  title: string;
  street?:string;
  pays: string;
  ville:string;
  other:[];
  description: string;
  code: string;
  userId: {
    _ref: string;
    _type: "reference";
  };
  set?: imgPub[];
}

export interface imgPub {
  _createdAt: Date;
  _id: string;
  _type: string;
  _updatedAt: Date;
  publicationId: {
    _type: "reference";
    _ref: string;
  };
  url: string;
}

export interface letter {
  _createdAt: Date;
  _id: string;
  _type: string;
  _updatedAt: Date;
  subject: string;
  type:string;
  email: string;
  message?:string;
  set:message[]
}
export interface Actif {
  device:string;
  nom:string;
  chiffre:number;
  class:string;
}
export interface Abonne {
  email?:string;
  _createdAt?:Date;
  id:string;
  user:boolean;
  pseudo:string;
}

export interface message {
  _createdAt: Date;
  _id: string;
  _type: string;
  _updatedAt: Date;
  message: string;
  emailId?: {
    _ref: string;
    _type: "reference";
  };
}




export interface state {
  user:User|null;
  pro:setPro|null;
  auth:boolean;
  verify:boolean;
  allUser:User[]|null
}

export interface store {
  article:Article[];
  pub:publication[];
  country:select[];
  city:select[];
  device:select[]|select;
  letter:any;
  currentCountry:select|select[]|null;
  Carouselle:carouselle[]|null;
  newletter:letter[]|null,
  vente:number
}

export interface carouselle {
  _id:string;
  titre:string;
  sous:string;
  description:string;
  image:string;
}


export interface messageLetter {
   _createdAt: Date;
  _id: string;
  _type: string;
  _updatedAt: Date;
  type: string;
  message:string;
  userId: {
    _ref: string;
    _type: "reference";
  };
}

