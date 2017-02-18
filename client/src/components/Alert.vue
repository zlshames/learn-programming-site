<template>
	<div class="alert alert-danger">
		<strong>Error!</strong> {{ this.message }}
	</div>
</template>

<script>
export default {
	props: ['message']
}
</script>
