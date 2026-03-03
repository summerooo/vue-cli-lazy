<template>
	<router-view />
</template>
<script>
	import { useUserStore } from './store/user'
	import { mapState } from 'pinia'

	export default {
		computed: {
			...mapState(useUserStore, ['info', 'token'])
		}
	}
</script>
