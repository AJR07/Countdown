import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import Countdowns from "../schema/countdowns";
import { and, eq } from "drizzle-orm";

const connectionString = import.meta.env.VITE_DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema: { Countdowns } });

export async function getCountdownsForUser(id: string) {
    return await db.query.Countdowns.findMany({
        where: eq(Countdowns.id, id),
    });
}

export async function createCountdown(
    id: string,
    title: string,
    start: Date,
    end: Date
) {
    return await db.insert(Countdowns).values({
        id,
        title,
        start,
        end,
    });
}

export async function updateCountdown(
    id: string,
    title: string,
    start: Date,
    end: Date
) {
    return await db
        .update(Countdowns)
        .set({
            title,
            start,
            end,
        })
        .where(eq(Countdowns.id, id));
}

export async function deleteCountdown(id: string, title: string) {
    return await db
        .delete(Countdowns)
        .where(and(eq(Countdowns.id, id), eq(Countdowns.title, title)));
}
