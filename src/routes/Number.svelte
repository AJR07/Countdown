<script lang="ts">
    export let number: number, name: string;
</script>

<div id="time-indication">
    <p id="number">{number}</p>
    <p>{name}</p>
</div>

<style>
    #time-indication {
        display: flex;
        align-items: baseline;
        margin-left: 10px;
        margin-right: 10px;
    }

    #number {
        margin-right: 3px;
        font-size: 40px;
    }
</style>
