import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

const Countdowns = pgTable("Countdowns", {
    id: varchar("id", { length: 20 }),
    title: varchar("name", { length: 11 }),
    start: timestamp("start"),
    end: timestamp("end"),
});

export default Countdowns;
