import env from "../config/env";

const Fetch_function = async (api_data) => {
  let url = `${env.SERVER_URL}${api_data.path}`;
  let body = api_data.body ? JSON.stringify(api_data.body) : null;
  let method = api_data.method;
  let headers = {};
  headers["Content-Type"] = "application/json";
  if (api_data.user_token) {
    headers["Authorization"] = api_data.user_token;
  }
  let options = { method, headers, body };
  try {
    let res_data = await (await fetch(url, options)).json();
    return res_data;
  } catch (err) {
    return null;
  }
};

export { Fetch_function };
