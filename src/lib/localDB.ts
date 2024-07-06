import { browser } from "$app/environment";
import type { Countdown } from "../types/countdown";
import type { Data } from "../types/data";
import {
    createCountdownPG,
    getCountdownsForUser,
    removeCountdownPG,
    updateCountdownPG,
} from "./postgresDB";
import { supabase } from "./supabase";

// initialize countdowns to default data
const defaultData = {
    Example: {
        title: "Example",
        start: new Date("2000-01-01"),
        end: new Date("2100-01- 01"),
    },
};
let countdowns: Data = {},
    user = await supabase.auth.getUser();

if (browser) {
    // IF signed in, load from postgresDB and sync with localStorage
    if (user.data.user) {
        let countdownData =
            (await getCountdownsForUser(user.data.user.id)) ?? [];
        countdowns = {};
        for (const countdown of countdownData) {
            countdowns[countdown.title!] = {
                title: countdown.title!,
                start: new Date(countdown.start!),
                end: new Date(countdown.end!),
            };
        }
    } else {
        // IF signed out, and localStorage exists, load from localStorage
        try {
            countdowns = JSON.parse(localStorage.getItem("countdowns")!);
            if (countdowns) {
                for (const countdown of Object.values(countdowns)) {
                    countdown.start = new Date(countdown.start);
                    countdown.end = new Date(countdown.end);
                }
            } else countdowns = defaultData;
        } catch {
            // Else, use default data.
            countdowns = defaultData;
        }
    }
}

//! wrapper to interact with local storage
//! includes syncing with `postgresDB.ts`

const subscriptions: ((countdowns: Data) => void)[] = [];
export function getCountdowns() {
    return countdowns;
}

export function subscribeToCountdown(callback: (countdowns: Data) => void) {
    subscriptions.push(callback);
    callback(countdowns);
}

export function removeCountdown(title: string) {
    delete countdowns[title];
    countdowns = countdowns;
    setLocalStorage();
    if (user.data.user) removeCountdownPG(user.data.user.id, title);
}

export function updateCountdown(originalTitle: string, countdown: Countdown) {
    removeCountdown(originalTitle);
    countdowns[countdown.title] = countdown;
    setLocalStorage();
    if (user.data.user)
        updateCountdownPG(
            user.data.user.id,
            originalTitle,
            countdown.title,
            countdown.start,
            countdown.end
        );
}

export function addCountdown(countdown: Countdown) {
    countdowns[countdown.title] = countdown;
    setLocalStorage();
    if (user.data.user)
        createCountdownPG(
            user.data.user.id,
            countdown.title,
            countdown.start,
            countdown.end
        );
}

function setLocalStorage() {
    localStorage.setItem("countdowns", JSON.stringify(countdowns));
    for (const subscription of subscriptions) {
        subscription(Object.assign({}, countdowns));
    }
}
