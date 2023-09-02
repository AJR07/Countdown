<script lang="ts">
    import type Countdown from "../types/countdown";

    export let countdown: Countdown;
</script>

<div class="countdown-block">
	<div id="container">
    	<p class="title">{countdown.title.toUpperCase()}</p>
		
	</div>
</div>

<style>
	#container {
		display: grid;
		grid-template-columns: 50px auto;
	}

    .countdown-block {
        width: "100%";
        height: "40px";
		border:2px solid rgba(255, 255, 255, 0.5);
		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.1);
		margin: 10px;
	}

	.title{
		color: rgb(76, 184, 57);
		margin-left: 10px;
	}
</style>
