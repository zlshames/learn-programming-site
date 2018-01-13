<template>
	<div class="box-container">
		<h2>Profile Information</h2>
		<br />
		<p>{{ info.id }}</p>
		<p>{{ info.firstName }}</p>
		<p>{{ info.lastName }}</p>
		<p>{{ info.email }}</p>
		<p>{{ info.position }}</p>
		<p>{{ info.field }}</p>
		<p>{{ info.skillLevel }}</p>
	</div>
</template>

<script>
export default {
	props: ['info']
}
</script>

<style scoped>
	h2, p {
		text-align: center;
	}

	.box-container {
		border-radius: 5px;
		border: 1px solid rgba(0,0,0,0.8);
		padding: 20px;
		background: white;
		box-shadow: 0 3px 5px rgba(0,0,0,0.2);
    max-width: 450px;
    width: 100%;
		margin: 0 auto;
	}
</style>
