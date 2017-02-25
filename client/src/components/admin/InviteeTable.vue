<template>
	<div>
		<div class="table">
			<div class="table-row header">
				<div class="name">Name</div>
				<div class="email">Email Address</div>
				<div class="position">Position</div>
				<div class="field">Field</div>
				<div class="skill">Skill</div>
				<div class="delete">Delete</div>
			</div>
			<div class="table-row" v-for="invitee in getPage">
				<div class="name">{{ invitee.name }}</div>
				<div class="email">{{ invitee.email }}</div>
				<div class="position">{{ invitee.position }}</div>
				<div class="field">{{ invitee.field }}</div>
				<div class="skill">{{ invitee.skillLevel }}</div>
				<div class="delete">
					<button type="button" @click="deleteInvitee(invitee.id)" class="btn btn-danger btn-xs">x</button>
				</div>
			</div>
		</div>

		<div class="table-footer">
			<div>
				<label>Results per page:</label>
				<select v-model="perPage" >
					<option v-for="n in 15" :value="n">{{ n }}</option>
				</select>
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
	</div>
</template>

<script>
export default {
	props: ['invitees', 'deleteInvitee', 'perPage'],
	data() {
		return {
			currentPage: 1
		}
	},
	computed: {
		pages() {
			const pages = Math.ceil(this.invitees.length / this.perPage)
			if (pages < 1) {
				return 1
			}

			return pages
		},
		getPage() {
			let start = 0
			let end = this.invitees.length

			if (this.currentPage > 1) {
				start = this.perPage * (this.currentPage - 1)
			}

			if (start + this.perPage < end) {
				end = start + this.perPage
			}

			return this.invitees.slice(start, end)
		}
	},
	methods: {
		changePage(pageNum) {
			if (pageNum <= this.pages && pageNum > 0) {
				this.currentPage = pageNum
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.page-item {
		cursor: pointer;
	}

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

	.table-footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
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
