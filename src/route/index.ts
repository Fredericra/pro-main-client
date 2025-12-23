import { createRouter,createMemoryHistory } from "vue-router";
import middleware from "../Auth/middleware"
import { userStore } from "../Auth/Store";


const store = userStore()

const routes = [
    {name:"Home",path:"/",component:()=>import("../Page/Home.vue")},
    {name:"About",path:"/about",component:()=>import("../Page/Visitor/About.vue"),meta:{requireAuth:true}},
    {name:"Contact",path:"/contact",component:()=>import("../Page/Visitor/ContactUs.vue")},
    {name:"Add",path:"/add",component:()=>import("../Page/Visitor/Add.vue")},
    {name:"Login",path:"/login",component:()=>import("../Page/Attemp/Login.vue")},
    {name:"Sigin",path:"/sigin",component:()=>import("../Page/Attemp/Sigin.vue")},
    {name:"Validate",path:"/validate",component:()=>import("../Page/Attemp/Validate.vue"),meta:{verify:true}},
    {name:"Forget",path:"/forget-count",component:()=>import("../Page/Attemp/ForgetCount.vue")},
    {name:"Dash",path:"/dashbord",component:()=>import("../Page/Dashbord/Home.vue"),meta:{requireAuth:true}},
    {name:'Setting',path:'/setting',component:()=>import("../Page/Dashbord/User/Setting.vue"),meta:{requireAuth:true}},
    {name:'Notif',path:'/notification',component:()=>import("../Page/Dashbord/User/Notification.vue"),meta:{requireAuth:true}},
    {name:'Message',path:'/Message',component:()=>import("../Page/Dashbord/User/Message.vue"),meta:{requireAuth:true}},
    {name:'Achat',path:'/Achat',component:()=>import("../Page/Dashbord/User/Achat.vue"),meta:{requireAuth:true}},
    {name:'Ticket',path:'/Ticket',component:()=>import("../Page/Dashbord/User/Ticket.vue"),meta:{requireAuth:true}},
    {name:'Creation',path:'/Creation',component:()=>import("../Page/Dashbord/User/Creation.vue"),meta:{requireAuth:true}},
    {name:'DashAdmin',path:'/dashadmin',component:()=>import("../Page/Dashbord/Admin/Home.vue"),meta:{isAdmin:true}}
]


const router = createRouter({
    history:createMemoryHistory(),
    routes
})

router.beforeEach(async(to,from,next)=>{
    if(to.meta.requireAuth) await middleware.Auth(to,from,next);
    if(to.meta.verify) await middleware.NeedVerify(to,from,next);
    if(to.meta.isAdmin) await middleware.isAdmin(to,from,next);
    if(to.meta.auth) await middleware.isAuth(to,from,next);
    next()
})


export default router;