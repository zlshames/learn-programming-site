<template>
	<div class="statistics">
		<div class="stat-box">
			<h4>General</h4>
			<p>Invitee count: {{ invitees.length }}</p>
			<p>Last week: {{ lastWeek().length }}</p>
		</div>
		<div class="stat-box">
			<h4>Skills</h4>
			<p>Beginner Invitees: {{ withSkill('beginner').length }}</p>
			<p>Intermediate Invitees: {{ withSkill('intermediate').length }}</p>
			<p>Advanced Invitees: {{ withSkill('advanced').length }}</p>
		</div>
		<div class="stat-box">
			<h4>Positions</h4>
			<p>Students: {{ withPosition('student').length }}</p>
			<p>Employed: {{ withPosition('employed').length }}</p>
			<p>Contractors: {{ withPosition('contractor').length }}</p>
			<p>Freelancers: {{ withPosition('freelancer').length }}</p>
			<p>Others: {{ withPosition('other').length }}</p>
		</div>
		<div class="stat-box">
			<h4>Fields</h4>
			<p>Front-end: {{ withField('front-end').length }}</p>
			<p>Back-end: {{ withField('back-end').length }}</p>
			<p>Full-stack: {{ withField('full-stack').length }}</p>
			<p>Mobile: {{ withField('mobile').length }}</p>
			<p>Other: {{ withField('other').length }}</p>
		</div>
	</div>
</template>

<script>
export default {
	props: ['invitees'],
	methods: {
		withSkill(level) {
			return this.invitees.filter(invitee => {
				return invitee.skillLevel == level
			})
		},
		withPosition(pos) {
			return this.invitees.filter(invitee => {
				return invitee.position == pos
			})
		},
		withField(field) {
			return this.invitees.filter(invitee => {
				return invitee.field == field
			})
		},
		lastWeek() {
			return this.invitees.filter(invitee => {
				const iDate = new Date(invitee.createdAt)
				let weekAgo = new Date()
				weekAgo.setDate(weekAgo.getDate() - 7)

				return iDate > weekAgo
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.statistics {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.stat-box {
		h4 {
			font-weight: bold;
		}

		height: 200px;
		width: 100%;
		text-align: center;
		border-radius: 5px;
		background-color: lightgrey;
		padding: 10px;
		margin: 10px;
	}
</style>
