<template>
	<div class="container-bottom">
		<yu-transition name="opacity">
			<div class="shade" v-show="value" @tap="shadeStart"></div>
		</yu-transition>
		<div ref="bottom" class="bottom" @touchstart="start" @touchend="end" :style="style">
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
				bottom: 0,
				y: 0,
				height: 0,
				speeds: [],
			}
		},
		computed: {
			style() {
				return {
					height: this.size + 'vh',
					transform: `translateY(${this.bottom}px)`,
					top: 100 - this.size + 'vh'
				};
			}
		},
		watch: {
			value(n, o) {
				this.ani(n);
			},
			bottom(n, o) {
				n < 0 && (this.bottom = 0);
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
						transform: 'translateY(0)'
					}, {
						duration: 300
					}).then(() => {
						this.bottom = 0;
					});
				} else {
					queueAnimate(this.element, {
						transform: `translateY(${this.height}px)`
					}, {
						duration: 300
					}).then(() => {
						this.bottom = this.height;
					});
				}
			},
			move(e) {
				let y = e.changedTouches[0].clientY;
				let val = y - this.y;
				this.bottom += val
				if (this.speeds.length > 0 && ((this.speeds[0] > 0 && val < 0) || (this.speeds[0] < 0 && val > 0))) {
					this.speeds.splice(0);
				}
				this.speeds.push(val);
				this.y = y;
			},
			start(e) {
				this.element.style.transition = "";
				this.y = e.changedTouches[0].clientY;
				document.body.addEventListener('touchmove', this.move);
			},
			end(e) {
				document.body.removeEventListener('touchmove', this.move);
				if (this.bottom > this.height * 0.2) {
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
			this.element = this.$refs.bottom;
			this.height = this.element.offsetHeight;
			this.ani(this.value);
		}
	}
</script>

<style lang="less" scoped>
	.container-bottom {
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

		.bottom {
			position: absolute;
			left: 0;
			width: 100vw;
			background-color: #FFF;
		}
	}
</style>
