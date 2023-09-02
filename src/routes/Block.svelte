<script lang="ts">
    import type Countdown from "../types/countdown";
    import GetTimeLeft from "../utils/gettimeleft";
    import Number from "./Number.svelte";
    export let countdown: Countdown;

    let currentDate = new Date();
    let timeLeft = GetTimeLeft(countdown.end, currentDate);
    let timeSinceStart = GetTimeLeft(countdown.start, currentDate);
</script>

<div class="countdown-block">
    <div class="countdown-container">
        <h1 class="title">{countdown.title.toUpperCase()}:</h1>
        {#if timeLeft.days > 0}
            <Number number={timeLeft.days} name="days" />
        {/if}
        {#if timeLeft.hours > 0}
            <Number number={timeLeft.hours} name="hours" />
        {/if}
        {#if timeLeft.minutes > 0}
            <Number number={timeLeft.minutes} name="minutes" />
        {/if}
        {#if timeLeft.seconds > 0}
            <Number number={timeLeft.seconds} name="seconds" />
        {/if}
    </div>
</div>

<style>
    .countdown-container {
        display: grid;
        grid-template-columns: 150px min-content min-content min-content min-content min-content;
    }
    .countdown-block {
        /* display */
        width: "100%";
        height: "40px";
        margin: 10px;
        /* UI */
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.1);
    }

    .title {
        color: rgb(76, 184, 57);
        margin-left: 10px;

        height: 100%;
        display: flex;
        align-items: center;
    }
</style>
