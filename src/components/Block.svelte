<script lang="ts">
    import { Modal, ActionIcon, Textarea } from "@svelteuidev/core";
    import { Pencil2, Trash, Share1 } from "radix-icons-svelte";
    import { DateInput } from "date-picker-svelte";
    import type { Countdown } from "../types/countdown";
    import GetTimeLeft from "../utils/gettimeleft";
    import Number from "./Number.svelte";
    import { removeCountdown, updateCountdown } from "$lib/localDB";

    // imports
    export let countdown: Countdown;
    export let currentDate: Date;

    // states
    let newTitle = countdown.title,
        newEnd = countdown.end;
    let opened = false; // modal 1 - edit
    let opened2 = false; // modal 2 - share

    // progress bar
    let timeLeft: ReturnType<typeof GetTimeLeft>,
        totalTime: ReturnType<typeof GetTimeLeft>,
        percent: number;

    $: {
        timeLeft = GetTimeLeft(countdown.end, currentDate);
        totalTime = GetTimeLeft(countdown.end, countdown.start);
        percent = 100 - (timeLeft.total / totalTime.total) * 100;
        if (isNaN(percent)) percent = 100;
    }

    function generateLink() {
        return `${
            window.location.origin
        }/add?start=${countdown.start.valueOf()}&end=${countdown.end.valueOf()}&title=${
            countdown.title
        }`;
    }
</script>

<div
    class="countdown-block"
    style={`background: linear-gradient(90deg, #b6e32d4d ${
        percent - 0.1
    }%, #000000 ${percent + 0.1}%)`}
>
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
        <p>{percent.toFixed(3)}%</p>
        <div id="edit">
            <ActionIcon
                color="orange"
                variant="filled"
                on:click={() => (opened = true)}
            >
                <Pencil2 size={16} />
            </ActionIcon>
            <div />
            <ActionIcon
                color="red"
                variant="filled"
                on:click={() => removeCountdown(countdown.title)}
            >
                <Trash size={16} />
            </ActionIcon>
            <div />
            <ActionIcon
                color="green"
                variant="filled"
                on:click={() => (opened2 = true)}
            >
                <Share1 size={16} />
            </ActionIcon>
        </div>
    </div>
</div>

<!-- Edit -->
<Modal
    {opened}
    on:close={() => {
        opened = false;
        updateCountdown(countdown.title, {
            title: newTitle,
            start: countdown.start,
            end: newEnd,
        });
    }}
    title={`Edit The Countdown: ${countdown.title}`}
>
    <p>Title:</p>
    <Textarea bind:value={newTitle} />
    <p>End Date:</p>
    <DateInput
        bind:value={newEnd}
        min={countdown.start}
        max={new Date("2100-01-01")}
        closeOnSelection={true}
    />
</Modal>

<!-- Share -->
<Modal
    opened={opened2}
    on:close={() => {
        opened2 = false;
    }}
    title={`Share The Countdown: ${countdown.title}`}
>
    <p>
        Share the countdown using this link: <a href={generateLink()}
            >{generateLink()}</a
        >
    </p>
</Modal>

<style>
    /* For the date picker */
    :root {
        --date-picker-background: #1b1e27;
        --date-picker-foreground: #f7f7f7;
    }

    #edit {
        display: grid;
        grid-template-columns: min-content 10px min-content 10px min-content;
    }

    #ended {
        color: rgb(213, 189, 103);
        margin-left: 10px;
        font-size: 40px;
    }

    #manage-buttons {
        margin-left: auto;
        margin-right: 10px;
    }

    .countdown-container {
        display: grid;
        grid-template-columns: 200px min-content min-content min-content min-content min-content;
    }

    .countdown-block {
        display: flex;

        /* display */
        width: "100%";
        height: "40px";
        margin-top: 10px;
        margin-bottom: 10px;

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

    a {
        color: rgb(76, 184, 57);
    }
</style>
