import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { userStore } from "./Store";
import { createPinia } from "pinia";


const pinia = createPinia();
const store = userStore(pinia)


const Auth = async(
    to: RouteLocationNormalized,
    _: RouteLocationNormalized,
    next: NavigationGuardNext,
) => {
    const auth = !!localStorage.getItem('token')
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
    const auth = !!localStorage.getItem('token')
    if(auth){
        next()
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
    const auth = !!localStorage.getItem('token')
    if(auth)
    {
        const user = await store.getUserCheck();
        if(user?.set?.verify===false) return next({name:'Validate',query:{redirect:to.fullPath}})
    }
    else{
        return next({name:'Login',query:{redirect:to.fullPath}})
    }
}

const isAdmin = async(
    to:RouteLocationNormalized,
    _:RouteLocationNormalized,
    next:NavigationGuardNext
)=>{
    const auth = !!localStorage.getItem('token')
    if(auth)
    {
        const user = await store.getUserCheck();
        if(user?.set?.admin) 
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