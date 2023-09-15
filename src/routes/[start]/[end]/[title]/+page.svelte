<script lang="ts">
    export let data: {
        body: {
            title: any;
            start: any;
            end: any;
        } | null;
    };
</script>

<main>
    <div id="title-container">
        <h id="title">COUNTDOWN</h>
    </div>
    <div id="added">
        {#if data.body === null}
            <h1 class="heading">
                Failed To Add Countdown, ensure that the following is valid!
            </h1>
            <p>
                1. Title should have at least 1 character and at most 10 (all
                non alphanumeric characters are removed)
            </p>
            <p>2. End Date should be later than Start Date</p>
            <p>3. Start Date should be earlier or equals to the current date</p>
        {:else}
            <h1 class="heading">Added A Countdown!</h1>
            <p>Title: {data.body.title}</p>
            <p>End Time: {data.body.start}</p>
            <p>Start Time: {data.body.end}</p>
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
