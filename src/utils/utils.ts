import axios from "axios";
import Config from "../configuration";

export type DeepPartial<T> = T extends Function ? T : (T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T);

let token: string;
let expires: number;


export async function login(): Promise<string> {

    if (                                                                                     // renew token via login when
        !token                                                                          // no token is set
        || (expires && expires < new Date().getTime() )     // or token expires
    ) {
        expires = new Date().getTime() / 1000 + 24 * 60 * 60;

        try {
            const result = await axios.post<{token: string}>(
                Config.get().herp_uri + "/users/login",
                {
                    "email": Config.get().user,
                    "password": Config.get().password,
                }
            );
            token = result.data.token;
        } catch (e: any) {

            console.log("FAILED TO LOGIN", Config.get().herp_uri + "/users/login", e.message);
        }
    } 


    return "Bearer " + token;
}