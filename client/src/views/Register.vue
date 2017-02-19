<template>
	<div>
		<navigation></navigation>

		<div class="page-container">
			<register-form></register-form>
		</div>

		<footer-template></footer-template>
	</div>
</template>

<script>
import FooterTemplate from '../components/Footer.vue'
import Navigation from '../components/Navigation.vue'
import RegisterForm from '../components/RegisterForm.vue'

export default {
	components: {
		Navigation,
		RegisterForm,
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
