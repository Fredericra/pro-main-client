import { ElLoading, type LoadingInstance } from "element-plus"

let loadingInstance:LoadingInstance|null = null

const startLoading = ()=>{   
    if(!loadingInstance){
        loadingInstance = ElLoading.service({
            fullscreen:true,
            lock:true,
            text:'veuillez patientez',
        })
    }
}

const closeLoading = ()=>{
    if(loadingInstance)
    {
        loadingInstance?.close()
        loadingInstance = null
    }
}

const loading = {startLoading,closeLoading}

export default loading;