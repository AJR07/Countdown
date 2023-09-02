<script lang="ts">
    import Block from "./Block.svelte";
    import type Countdown from "../types/countdown";

    const countdowns: Countdown[] = [
        { title: "test", start: new Date("2023-03-25") },
        { title: "test2", start: new Date("2023-03-24") },
        { title: "test3", start: new Date("2023-06-24") },
    ];
</script>

<main>
    <div id="title-container">
        <div id="title">COUNTDOWN</div>
    </div>
    <div>
        {#each countdowns as countdown}
            <Block {countdown} />
        {/each}
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 75px auto;
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
