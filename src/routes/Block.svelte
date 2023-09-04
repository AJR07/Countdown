<script lang="ts">
    import type Countdown from "../types/countdown";
    import GetTimeLeft from "../utils/gettimeleft";
    import Number from "./Number.svelte";
    export let countdown: Countdown;
    export let currentDate: Date;

    $: timeLeft = GetTimeLeft(countdown.end, currentDate);
    $: totalTime = GetTimeLeft(countdown.end, countdown.start);
    $: percent = 100 - (timeLeft.total / totalTime.total) * 100;
    $: progressBar = `background: linear-gradient(90deg, #b6e32d4d ${
        percent - 0.1
    }%, #000000 ${percent + 0.1}%)`;
</script>

<div class="countdown-block" style={progressBar}>
    <div class="countdown-container">
        <h1 class="title">{countdown.title.toUpperCase()}:</h1>
        {#if timeLeft.total === 0}
            <p id="ended">ENDED</p>
        {/if}
        {#if timeLeft.days !== null}
            <Number number={timeLeft.days} name="days" />
        {/if}
        {#if timeLeft.hours !== null}
            <Number number={timeLeft.hours} name="hours" />
        {/if}
        {#if timeLeft.minutes !== null}
            <Number number={timeLeft.minutes} name="minutes" />
        {/if}
        {#if timeLeft.seconds !== null}
            <Number number={timeLeft.seconds} name="seconds" />
        {/if}
    </div>
    <div id="manage-buttons">
        <p>{percent.toFixed(2)}%</p>
    </div>
</div>

<style>
    #ended {
        color: red;
        margin-left: 10px;
        font-size: 40px;
    }

    #manage-buttons {
        margin-left: auto;
        margin-right: 10px;
    }

    .countdown-container {
        display: grid;
        grid-template-columns: 150px min-content min-content min-content min-content min-content;
    }

    .countdown-block {
        display: flex;

        /* display */
        width: "100%";
        height: "40px";
        margin: 10px;
        /* UI */
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 10px;
    }

    .title {
        color: rgb(76, 184, 57);
        margin-left: 10px;

        height: 100%;
        display: flex;
        align-items: center;
    }
</style>
