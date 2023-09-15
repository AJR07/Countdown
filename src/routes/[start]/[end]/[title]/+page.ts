import type Data from "../../../../types/data";
import { browser } from "$app/environment";

export function load({ params }: { params: any }) {
    if (browser) {
        let countdowns: Data = JSON.parse(localStorage.getItem("countdowns")!);
        let title = params.title,
            start = params.start,
            end = params.end;

        // verification
        title = title.replace(/[^a-z0-9]/gi, "");
        if (
            title === "" ||
            title.length > 10 ||
            end < start ||
            start <= Date.now()
        ) {
            return { body: null };
        }

        countdowns[title] = { start: start, end: end, title: title };
        localStorage.setItem("countdowns", JSON.stringify(countdowns));
        return { body: { title: title, start: start, end: end } };
    }
    return { body: null };
}
