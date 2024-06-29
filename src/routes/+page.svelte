<script lang="ts">
    import Auth from "../components/Auth.svelte";
    import Block from "../components/Block.svelte";
    import type { Countdown } from "../types/countdown";
    import { Plus } from "radix-icons-svelte";
    import {
        SvelteUIProvider,
        Modal,
        Textarea,
        Button,
    } from "@svelteuidev/core";
    import { DateInput } from "date-picker-svelte";
    import { countdowns, addCountdown } from "$lib/localDB";

    // for modal
    let opened = false;
    let tempCountdown: Countdown = {
        title: "",
        start: new Date(),
        end: new Date(),
    };
    let error: boolean = false;

    // update blocks every second
    let currentDate = new Date();
    setInterval(() => {
        currentDate = new Date();
    }, 1000);
</script>

<SvelteUIProvider themeObserver="dark">
    <main>
        <div id="title-container">
            <h id="title">COUNTDOWN</h>
        </div>
        <div id="main-page-container">
            <Auth />
            {#each Object.values(countdowns) as countdown}
                <Block {countdown} {currentDate} />
            {/each}
            <Button
                fullSize
                on:click={() => {
                    tempCountdown = {
                        title: "",
                        start: new Date(),
                        end: new Date(),
                    };
                    opened = true;
                }}
            >
                <Plus size={16} />
                ADD
            </Button>
        </div>
    </main>
</SvelteUIProvider>

<!-- Modal for adding countdowns -->
<Modal
    {opened}
    on:close={() => ((opened = false), (error = false))}
    title="Add A Countdown"
>
    <p>Title:</p>
    <Textarea bind:value={tempCountdown.title} />
    <p>End Date:</p>
    <DateInput
        bind:value={tempCountdown.end}
        min={tempCountdown.start}
        max={new Date("2100-01-01")}
        closeOnSelection={true}
    />

    {#if error}
        <p style="color: red;" id="error">
            Title is empty, more than 10 characters or already exists.
        </p>
    {:else}
        <p id="error" />
    {/if}

    <Button
        color="green"
        on:click={() => {
            // remove all non-alphanumeric characters
            tempCountdown.title = tempCountdown.title.replace(
                /[^a-z0-9]/gi,
                ""
            );

            if (
                tempCountdown.title === "" ||
                Object.keys(countdowns).includes(tempCountdown.title) ||
                tempCountdown.title.length > 10
            )
                error = true;
            else {
                error = false;
                addCountdown(tempCountdown);
                opened = false;
            }
        }}
    >
        Add
    </Button>
</Modal>

<style>
    #error {
        padding-top: 5px;
        padding-bottom: 5px;
    }
    main {
        display: grid;
        grid-template-columns: 75px auto;
    }

    #main-page-container {
        margin: 10px;
    }

    #title-container {
        display: flex;
        align-items: center;
        height: 100vh;
    }

    #title {
        position: fixed;
        font-weight: bold;
        font-size: 50px;
        transform-origin: center;
        transform: translate(-40%) rotate(90deg);
        text-shadow: 0px 0px 20px rgba(132, 205, 125, 0.764);
    }
</style>
