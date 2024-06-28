import { browser } from "$app/environment";

export function load({ url }): URLSearchParams | {} {
    if (browser) {
        return JSON.parse(JSON.stringify(url.searchParams));
    }
    return {};
}
