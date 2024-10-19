import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
    withCredentials: true,
    // headers: {
    //     'Content-Type': 'application/json'
    //   }
})

api.interceptors.response.use(response => response, 
    async(error) => { 
        const originalRequest = error.config;
        
        if(originalRequest.url === "/user/refreshAccessToken"){
            // window.location.href = '/';
            return Promise.reject(error);
        } 

        // console.log(error);
        if(error && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                await api.post('/user/refreshAccessToken', {withCredentials: true});
                return api(originalRequest);
            }catch(error){
                console.error("Refresh token expired or invalid", error);
                // window.location.href='/';
            }

            return Promise.reject(error);
        }
    }
)

export default api;