<script lang="ts">
    import Block from "./Block.svelte";
    import type Countdown from "../types/countdown";
    import { Button } from "@svelteuidev/core";
    import { Plus } from "radix-icons-svelte";
    import { SvelteUIProvider, colorScheme } from "@svelteuidev/core";

    // delete after test
    const end = new Date();
    end.setMinutes(new Date().getMinutes() + 1);
    let countdowns: { [title: string]: Countdown } = {
        test: {
            title: "test",
            start: new Date(),
            end: end,
        },
        test2: {
            title: "test2",
            start: new Date("2023-03-24"),
            end: new Date("2024-03-25"),
        },
        test3: {
            title: "test3",
            start: new Date("2023-06-24"),
            end: new Date("2024-06-25"),
        },
    };

    function removeCountdown(title: string) {
        delete countdowns[title];
        countdowns = countdowns;
    }

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
        <div id="countdowns-list">
            {#each Object.values(countdowns) as countdown}
                <Block {countdown} {currentDate} {removeCountdown} />
            {/each}
            <Button fullSize>
                ADD
                <Plus size={16} />
            </Button>
        </div>
    </main>
</SvelteUIProvider>

<style>
    main {
        display: grid;
        grid-template-columns: 75px auto;
    }

    #countdowns-list {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    #title-container {
        display: flex;
        align-items: center;
        height: 100vh;
    }

    #title {
        font-weight: bold;
        font-size: 50px;
        transform-origin: center;
        transform: translate(-40%) rotate(90deg);
        text-shadow: 0px 0px 20px rgba(132, 205, 125, 0.764);
    }
</style>
