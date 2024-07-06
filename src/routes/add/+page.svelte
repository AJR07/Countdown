<script lang="ts">
    import { type Countdown } from "../../types/countdown";

    export let data: {
        body: Countdown | string;
    };
</script>

<main>
    <div id="title-container">
        <h id="title">COUNTDOWN</h>
    </div>
    <div id="added">
        {#if typeof data.body === "string"}
            <div id="error" class="centered">
                <h1 class="heading">
                    Failed To Add Countdown, as "{data.body}".
                </h1>
            </div>
        {:else if data.body !== null}
            <h1 class="heading">Added A Countdown!</h1>
            <p>Title: {data.body.title}</p>
            <p>End Time: {data.body.start}</p>
            <p>Start Time: {data.body.end}</p>
        {:else}
            <p>Loading...</p>
        {/if}
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 75px auto;
    }
    .heading {
        color: rgb(108, 220, 97);
    }

    .centered {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #title {
        position: fixed;
        font-weight: bold;
        font-size: 50px;
        transform-origin: center;
        transform: translate(-40%) rotate(90deg);
        text-shadow: 0px 0px 20px rgba(132, 205, 125, 0.764);
    }

    #title-container {
        display: flex;
        align-items: center;
        height: 100vh;
    }
</style>
