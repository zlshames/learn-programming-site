<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<style>
	html {
		height: 100%;
	}

	.body-rows {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.body-cols {
		display: flex;
		flex-direction: rows;
		justify-content: space-between;
	}

	#app {
		width: 100%;
	}
</style>
