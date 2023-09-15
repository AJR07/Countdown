import type Data from "../../../../types/data";
import { browser } from "$app/environment";
import type Countdown from "../../../../types/countdown";

export function load({ params }: { params: any }): {
    body: "undefined" | Countdown;
} {
    if (browser) {
        let countdowns: Data = JSON.parse(localStorage.getItem("countdowns")!);
        let title = params.title,
            start = parseInt(params.start)!,
            end = parseInt(params.end)!;

        // verification
        title = title.replace(/[^a-z0-9]/gi, "");
        if (
            title === "" ||
            title.length > 10 ||
            end < start ||
            start > Date.now() ||
            Object.keys(countdowns).includes(title)
        ) {
            return { body: "undefined" };
        }

        countdowns[title] = {
            start: new Date(start),
            end: new Date(end),
            title: title,
        };
        localStorage.setItem("countdowns", JSON.stringify(countdowns));
        return {
            body: { title: title, start: new Date(start), end: new Date(end) },
        };
    }
    return { body: "undefined" };
}
