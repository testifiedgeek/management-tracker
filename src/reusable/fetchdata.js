import env_vars from "../config/env";

const Fetch_function = async (api_data) => {
  let url = `${env_vars.APP_URL}${api_data.url}`;
  let body = api_data.body ? JSON.stringify(api_data.body) : null;
  let method = api_data.method;
  let headers = {};
  headers["Content-Type"] = "application/json";
  api_data.user_token ? (headers["Authorization"] = api_data.user_token) : null;
  let options = { method, headers, body };
  try {
    let res_data = await fetch(url, options);
    console.log("res_data: ", res_data);
    return res_data;
  } catch (err) {
    return "error";
  }
};

export { Fetch_function };
