<template>
	<div>
		<div class="table">
			<div class="table-row header">
				<div class="name">First Name</div>
				<div class="name">Last Name</div>
				<div class="email">Email Address</div>
				<div class="position">Position</div>
				<div class="field">Field</div>
				<div class="skill">Skill</div>
				<div class="delete">Delete</div>
			</div>
			<div class="table-row" v-for="user in getPage">
				<div class="name">{{ user.firstName }}</div>
				<div class="name">{{ user.lastName }}</div>
				<div class="email">{{ user.email }}</div>
				<div class="position">{{ user.position }}</div>
				<div class="field">{{ user.field }}</div>
				<div class="skill">{{ user.skillLevel }}</div>
				<div class="delete">
					<button type="button" @click="deleteUser(user.id)" class="btn btn-danger btn-xs">x</button>
				</div>
			</div>
		</div>

		<nav aria-label="Page navigation example">
			<ul class="pagination">
				<li class="page-item">
					<a class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
						<span class="sr-only">Previous</span>
					</a>
				</li>
				<li class="page-item" v-for="n in pages">
					<a class="page-link" @click="changePage(n)">{{ n }}</a>
				</li>
				<li class="page-item">
					<a class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
						<span class="sr-only">Next</span>
					</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	props: ['users', 'deleteUser', 'perPage'],
	data() {
		return {
			currentPage: 1
		}
	},
	computed: {
		pages() {
			const pages = Math.ceil(this.users.length / this.perPage)
			if (pages < 1) {
				return 1
			}

			return pages
		},
		getPage() {
			let start = 0
			let end = this.users.length

			if (this.currentPage > 1) {
				start = this.perPage * (this.currentPage - 1)
			}

			if (start + this.perPage < end) {
				end = start + this.perPage
			}

			return this.users.slice(start, end)
		}
	},
	methods: {
		changePage(pageNum) {
			this.currentPage = pageNum
		}
	}
}
</script>

<style lang="scss" scoped>
	.delete {
		height: 20px;
		padding-top: -10px;
	}

	.header {
		text-align: center;
		font-weight: bold;
		border-bottom: solid 1px lightgrey;
		margin-bottom: 10px;
	}

	.table-row {
		text-align: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 5px;

		.name {
			width: 80px;
		}

		.email {
			width: 150px;
		}

		.position {
			width: 60px;
		}

		.field {
			width: 60px;
		}

		.skill {
			width: 60px;
		}

		.delete {
			width: 50px;
		}
	}

	.table {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
