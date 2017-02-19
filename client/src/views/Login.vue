<template>
	<div>
		<navigation></navigation>

		<div class="page-container">
			<login-form></login-form>
		</div>

		<footer-template></footer-template>
	</div>
</template>

<script>
import FooterTemplate from '../components/Footer.vue'
import Navigation from '../components/Navigation.vue'
import LoginForm from '../components/LoginForm.vue'

export default {
	components: {
		Navigation,
		LoginForm,
		FooterTemplate
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
