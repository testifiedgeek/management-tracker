import env_vars from '../config/env';

const Fetch_function = async(api_data) => {
    let url = `${env_vars.API_URL}${api_data.url}`;
    let body = api_data.body ? JSON.stringify(api_data.body): JSON.stringify({});
        let method = api_data.method
        let headers = {};
        headers['Content-Type'] = 'application/json'; 
        headers['Authorization'] = api_data.user_token ? api_data.user_token : ''; 
        let options = {method,headers,body}
    try{
    let res_data = await (await fetch(url,options)).json()
    console.log(res_data)
    return res_data
    }
    catch(err) {
        return 'error'
    }
    

    
}

export {Fetch_function}