import Dev from "./dev";
import Prod from "./prod";

var env;
if (process.env.APP_ENV === "PROD") {
  env = Prod;
} else if (process.env.APP_ENV === "DEV") {
  env = Dev;
}

export default env;
