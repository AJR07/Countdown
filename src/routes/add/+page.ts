import type { Data } from "../../types/data";
import { browser } from "$app/environment";
import type { Countdown } from "../../types/countdown";

export function load({ url }): {
    body: string | Countdown;
} {
    if (browser) {
        // default countdown
        let countdowns: Data =
            localStorage.getItem("countdowns") !== null
                ? JSON.parse(localStorage.getItem("countdowns")!)
                : {
                      Example: {
                          title: "Example",
                          start: new Date("2000-01-01"),
                          end: new Date("2100-01-01"),
                      },
                  };

        // get parameters
        let title = url.searchParams.get("title"),
            start = parseInt(url.searchParams.get("start")!),
            end = parseInt(url.searchParams.get("end")!);

        // verification
        if (!title || title === "" || title.length > 10)
            return { body: "Title must be between 1 and 10 characters" };
        else if (end < start)
            return { body: "End date must be after start date" };
        else if (start > Date.now())
            return { body: "Start date must be before current date" };
        else if (Object.keys(countdowns).includes(title))
            return { body: "Countdown with that title already exists" };

        title = title.replace(/[^a-z0-9]/gi, "");

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
