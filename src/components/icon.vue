<template>
  <div>
    <svg class="svg-icon" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
  </div>
</template>

<script>
// import '../assets/icons/ts.svg'
export default {
  name: 'icon-svg',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName () {
      console.log(`#icon-${this.iconClass}`)
      return `#icon-${this.iconClass}`
    }
  }
}
</script>

<style>

.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
