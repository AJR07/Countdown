import { supabase } from "./supabase";

export async function getCountdownsForUser(id: string) {
    let { data, error } = await supabase
        .from("Countdowns")
        .select("*")
        .eq("id", id);

    if (error) {
        throw error;
    }
    return data;
}

export async function createCountdownPG(
    id: string,
    title: string,
    start: Date,
    end: Date
) {
    let { error } = await supabase.from("Countdowns").insert({
        id,
        title,
        start,
        end,
    });
    if (error) {
        throw error;
    }
}

export async function updateCountdownPG(
    id: string,
    oldTitle: string,
    title: string,
    start: Date,
    end: Date
) {
    console.log(id, oldTitle, title, start, end);
    let { error } = await supabase
        .from("Countdowns")
        .update({
            title: title,
            start: start,
            end: end,
        })
        .eq("id", id)
        .eq("title", oldTitle);

    if (error) {
        throw error;
    }
}

export async function removeCountdownPG(id: string, title: string) {
    let { error } = await supabase
        .from("Countdowns")
        .delete()
        .eq("id", id)
        .eq("title", title);
    if (error) {
        throw error;
    }
}
