<template>
	<div class="container-right">
		<yu-transition name="opacity">
			<div class="shade" v-show="value" @tag="shadeStart"></div>
		</yu-transition>
		<div ref="right" class="right" @touchstart="start" @touchend="end" :style="{ width:size+'vw',transform:`translateX(${right}px)`,left:100-size+'vw' }">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import { queueAnimate } from 'yu-front';
	export default {
		props: {
			size: {
				type: [Number],
				default: 100
			},
			value: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				element: null,
				right: 0,
				x: 0,
				width: 0,
				speeds: [],
			}
		},
		watch: {
			value(n, o) {
				this.ani(n);
			},
			right(n, o) {
				n < 0 && (this.right = 0);
			}
		},
		methods: {
			shadeStart() {
				this.ani(false);
				this.$emit('input', false);
			},
			ani(bool) {
				if (bool) {
					queueAnimate(this.element, {
						transform: 'translateX(0)'
					}, {
						duration: 300
					}).then(() => {
						this.right = 0;
					});
				} else {
					queueAnimate(this.element, {
						transform: `translateX(${this.width}px)`
					}, {
						duration: 300
					}).then(() => {
						this.right = this.width;
					});
				}
			},
			move(e) {
				let x = e.changedTouches[0].clientX;
				let val = x - this.x;
				this.right += val
				if (this.speeds.length > 0 && ((this.speeds[0] > 0 && val < 0) || (this.speeds[0] < 0 && val > 0))) {
					this.speeds.splice(0);
				}
				this.speeds.push(val);
				this.x = x;
			},
			start(e) {
				this.element.style.transition = "";
				this.x = e.changedTouches[0].clientX;
				document.body.addEventListener('touchmove', this.move);
			},
			end(e) {
				document.body.removeEventListener('touchmove', this.move);
				if (this.right > this.width * 0.2) {
					if (!this.value) {
						this.ani(false);
					} else {
						this.$emit('input', false);
					}
				} else {

					if (this.value) {
						this.ani(true);
					} else {
						this.$emit('input', true);
					}
				}

			}
		},
		mounted() {
			this.element = this.$refs.right;
			this.width = this.element.offsetWidth;
			this.ani(this.value);
		}
	}
</script>

<style lang="less" scoped>
	.container-right {
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 0;

		.shade {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background: rgba(0, 0, 0, 0.2);
		}

		.right {
			position: absolute;
			top: 0;
			height: 100vh;
			background: #FFF;
		}
	}
</style>
