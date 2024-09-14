<template>
	<router-view />
</template>
<script>
	import { mapState, mapMutations } from './store'
	export default {
		data() {
			return {}
		},
		setup() {
			return {
				...mapState(['info', 'token'])
			}
		},
		methods: {
			...mapMutations(['getState']),
		},
		mounted() {
			this.getState(['info', 'token'])
		},
	}
</script>
