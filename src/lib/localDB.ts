import { browser } from "$app/environment";
import type { Countdown } from "../types/countdown";
import type { Data } from "../types/data";
import { getCountdownsForUser } from "./postgresDB";
import { supabase } from "./supabase";

// initialize countdowns to default data
let countdowns: Data = {
    Example: {
        title: "Example",
        start: new Date("2000-01-01"),
        end: new Date("2100-01-01"),
    },
};

if (browser) {
    // IF signed in, load from postgresDB and sync with localStorage
    let user = await supabase.auth.getUser();

    if (user.data.user) {
        let countdownData = await getCountdownsForUser(user.data.user.id);
        countdowns = {};
        for (const countdown of countdownData) {
            countdowns[countdown.title!] = {
                title: countdown.title!,
                start: countdown.start!,
                end: countdown.end!,
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
            }
        } catch {} // Else, use default data.
    }
}

//! wrapper to interact with local storage
//! includes syncing with `postgresDB.ts`

const subscriptions: ((countdowns: Data) => void)[] = [];
export function subscribeToCountdown(callback: (countdowns: Data) => void) {
    subscriptions.push(callback);
    callback(countdowns);
}

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
    for (const subscription of subscriptions) {
        subscription(JSON.parse(JSON.stringify(countdowns)));
    }
}
