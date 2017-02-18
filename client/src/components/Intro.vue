<template>
	<div class="box-container">
		<h2>Learn Programming Slack</h2>
		<br />
		<p>A slack channel dedicated to helping others learn to program. Chat with peers and mentors to learn more about programming, and have a good time. All are welcome regardless of skill level, programming language, or age!</p>
		<p>We currently have members from over 10 different countries from around the world, so you'll be getting diverse opinions on matters. The goal is to help you learn, and learn right.</p>
		<p>Fill out a short form just so we can make sure you are a human, and then you will receive an automatic email invitation to our slack channel!</p>

		<button
			@click="$router.push({ name: 'invite' })"
			class="btn btn-md btn-success btn-block m-top-25">
			Join Now!
		</button>
	</div>
</template>

<style scoped>
	.box-container {
		border-radius: 5px;
		border: 1px solid rgba(0,0,0,0.8);
		padding: 20px;
		background: white;
		box-shadow: 0 3px 5px rgba(0,0,0,0.2);
		text-align: center;
		width: 400px;
	}
</style>
