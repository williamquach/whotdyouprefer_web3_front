import Cookies from "universal-cookie";

export class CookieUtils {
    private static cookies = new Cookies();

    static getCookie(key: string): string {
        return this.cookies.get(key);
    }

    static setCookie(key: string, value: string | boolean | number) {
        this.cookies.set(key, value);
    }

    static deleteCookie(key: string) {
        this.cookies.remove(key);
    }

    static deleteAllCookies() {
        for (const key of this.getCookieKeys()) {
            this.deleteCookie(key);
        }
    }

    static getAllCookies() {
        return this.cookies.getAll();
    }

    static getCookieKeys() {
        return Object.keys(this.cookies.getAll());
    }

    static getCookieValues() {
        return Object.values(this.cookies.getAll());
    }
}