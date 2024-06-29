import { browser } from "$app/environment";
import type { Countdown } from "../types/countdown";
import type { Data } from "../types/data";

const defaultData: Data = {
    Example: {
        title: "Example",
        start: new Date("2000-01-01"),
        end: new Date("2100-01-01"),
    },
};
export let countdowns: Data = {};

// Load data from local storage, or use default
if (browser) {
    try {
        countdowns = JSON.parse(localStorage.getItem("countdowns")!);
        if (countdowns === null) countdowns = defaultData;
        else {
            for (const countdown of Object.values(countdowns)) {
                countdown.start = new Date(countdown.start);
                countdown.end = new Date(countdown.end);
            }
        }
    } catch {
        countdowns = defaultData;
    }
}

//! wrapper to interact with local storage
//! includes syncing with `postgresDB.ts`

export function removeCountdown(title: string) {
    delete countdowns[title];
    countdowns = countdowns;
    setLocalStorage();
}

export function updateCountdown(originalTitle: string, countdown: Countdown) {
    removeCountdown(originalTitle);
    countdowns[countdown.title] = countdown;
    setLocalStorage();
}

export function addCountdown(countdown: Countdown) {
    countdowns[countdown.title] = countdown;
    setLocalStorage();
}

function setLocalStorage() {
    localStorage.setItem("countdowns", JSON.stringify(countdowns));
}
