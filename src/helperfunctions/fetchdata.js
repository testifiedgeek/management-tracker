import env from "../config/env";

const Fetch_function = async (api_data) => {
  let url = `${env.SERVER_URL}${api_data.path}`;
  let body = api_data.body ? JSON.stringify(api_data.body) : null;
  let method = api_data.method;
  let headers = {};
  headers["Content-Type"] = "application/json";
  if (api_data.user_token) {
    headers["Authorization"] = `Bearer ${api_data.user_token}`;
  }
  let options = { method, headers, body };
  let res_data = await fetch(url, options);
  try {
    let data = await res_data.json();
    console.log("data: ", data);
    if (
      res_data.status === 404 ||
      res_data.status === 400 ||
      res_data.status === 401
    ) {
      return {
        status: null,
        data: data.msg ? data.msg : "Something Went Wrong",
      };
    }
    return { status: "successful", data: data };
  } catch (err) {
    return { status: null, data: "Something Went Wrong" };
  }
};

export { Fetch_function };
