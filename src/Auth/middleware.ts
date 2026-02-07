import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { userStore } from "./Store";
import { createPinia } from "pinia";


const pinia = createPinia();
const store = userStore(pinia)

const isAuthCheck = async():Promise<boolean>=>{
    await store.checkAuth();
    const user = !!store.getUser
    if(user){
        return true
    }
    localStorage.removeItem('token')
    return false
;}

const Auth = async(
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext,
) => {
    const auth = await isAuthCheck();
   if(auth){
       next()
    }
   else{
       next({name:'Login',query:{redirect:to.fullPath}});
   }
};

const isAuth = async(
    to:RouteLocationNormalized,
    _:RouteLocationNormalized,
    next:NavigationGuardNext
)=>{
    const auth = await isAuthCheck();
    if(auth){
        if(store.getUser?.set?.verify)
        {
            next()
        }
        else{
            next({name:'Validate',query:{redirect:to.fullPath}})
        }
    }
    else{
        next({name:'Login',query:{redirect:to.fullPath}});
    }
}

const NeedVerify = async(
    to:RouteLocationNormalized,
    _:RouteLocationNormalized,
    next:NavigationGuardNext,
)=>{
    const auth = await isAuthCheck();
    if(auth)
    {
        if(store.getUser?.set?.verify===false) 
        {
            next({name:'Validate',query:{redirect:to.fullPath}})
        }
    }
    else{
        next();
    }
}

const isAdmin = async(
    to:RouteLocationNormalized,
    _:RouteLocationNormalized,
    next:NavigationGuardNext
)=>{
    const auth = await isAuthCheck();
    if(auth)
    {
        if(store.getUser?.set?.admin) 
        {
            next();
        } 
        else{
            next({name:'Dash',query:{redirect:to.fullPath}}) 
        }
    }
    else{
        next({name:'Login',query:{redirect:to.fullPath}})
    }

    
}

const middleware = { Auth,NeedVerify,isAdmin,isAuth }

export default middleware