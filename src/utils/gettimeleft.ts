import ProcessedDate from "../types/date";

export default function GetTimeLeft(
    endDate: Date,
    currentDate: Date
): ProcessedDate {
    const total = Math.max(0, endDate.getTime() - currentDate.getTime());

    let foundNonZero = false;
    let days: number | null = Math.floor(total / (1000 * 60 * 60 * 24));
    if (days > 0) foundNonZero = true;
    else if (!foundNonZero) days = null;

    let hours: number | null = Math.floor((total / (1000 * 60 * 60)) % 24);
    if (hours > 0) foundNonZero = true;
    else if (!foundNonZero) hours = null;

    let minutes: number | null = Math.floor((total / 1000 / 60) % 60);
    if (minutes > 0) foundNonZero = true;
    else if (!foundNonZero) minutes = null;

    let seconds: number | null = Math.floor((total / 1000) % 60);
    if (seconds > 0) foundNonZero = true;
    else if (!foundNonZero) seconds = null;

    return { total, days, hours, minutes, seconds };
}
