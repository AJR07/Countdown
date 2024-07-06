import { type Data } from "../types/data";
import { supabase } from "./supabase";

export async function getCountdownsForUser(id: string) {
    let { data, error } = await supabase
        .from("Countdowns")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function createCountdownsRowForUser(
    id: string,
    defaultData: Data
) {
    let { data, error } = await supabase
        .from("Countdowns")
        .insert({ id, countdowns: defaultData });

    if (error) {
        throw error;
    }
    return data;
}

export async function updateCountdownsRowForUser(id: string, countdowns: Data) {
    let { data, error } = await supabase
        .from("Countdowns")
        .update({ countdowns })
        .eq("id", id);

    if (error) {
        throw error;
    }
    return data;
}
