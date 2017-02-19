<template>
	<div class="full-page">
		<navigation></navigation>

		<div class="full-page">
			<div class="center-page">
				<router-view></router-view>
			</div>
		</div>

		<footer-template></footer-template>
	</div>
</template>

<script>
import FooterTemplate from '../components/Footer.vue'
import Navigation from '../components/Navigation.vue'

export default {
	components: {
		Navigation,
		FooterTemplate
	},
	data() {
		return {

		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
	text-align: center;
}
p {
	text-align: center;
}
</style>
