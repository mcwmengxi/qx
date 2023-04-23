<!-- eslint-disable vue/no-export-in-script-setup -->
<!-- <template>
	<div>
		<canvas id="myCanvas" />
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
const props = defineProps<{
	collapsed: boolean
}>()
onMounted(() => {
	drawCirCle()
})
function draw() {
	const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
	const ctx = canvas.getContext('2d')
	ctx.beginPath() // 创建一条path
	ctx.moveTo(50, 50) // 画笔开始位置
	ctx.lineTo(200, 100)
	ctx.closePath()
	ctx.stroke() // 绘制路径
}
function drawCirCle() {
	const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
	const ctx = canvas.getContext('2d')
	ctx.beginPath() // 创建一条path
	// 圆形坐标、半径、开始弧度、结束弧度、顺逆时针
	// 圆弧的长度和半径相等，那么这个角度就是一弧度
	ctx.arc(150, 150, 160, 0, Math.PI * 4, false)
	// ctx.closePath()
	ctx.stroke() // 绘制路径
}

class Flower {
	r = r
	color = color
	cx = 800
  cy = 500

    const { ctx, cx, cy, r: R } = this
    ctx.save();
    ctx.strokeStyle = "#fff";

    const ax0 = cx + R / 3 * Math.cos((a * part + 2 * part / 6) / rad);
    const ay0 = cy + R / 3 * Math.sin((a * part + 2 * part / 6) / rad);
    const ax1 = cx + R / 2 * Math.cos((a * part + 3 * part / 6) / rad);
    const ay1 = cy + R / 2 * Math.sin((a * part + 3 * part / 6) / rad);
    const ax2 = cx + R / 3 * Math.cos((a * part + 4 * part / 6) / rad);
    const ay2 = cy + R / 3 * Math.sin((a * part + 4 * part / 6) / rad);
    let ary = []
    // 如果半径大于40
    if (R > 40) {
      ary = [{
        x: ax0,
        y: ay0
      }, {
        x: ax1,
        y: ay1
      }, {
        x: ax2,
        y: ay2
      }];
    } else {
      ary = [{
        x: ax1,
        y: ay1
      }];
    }

    ctx.beginPath();
    for (let i = 0; i < ary.length; i++) {
      ctx.moveTo(cx, cy);
      ctx.lineTo(ary[i].x, ary[i].y);
      ctx.arc(ary[i].x, ary[i].y, 2, 0, 2 * Math.PI)
    }
    ctx.stroke();
    ctx.restore();
}
</script>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
	name: 'CanvasCom'
})
</script>
<style scoped lang="less"></style> -->

<template>
	<div>
		<canvas ref="canvas" :width="width" :height="height" />
	</div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref, toRefs } from 'vue'
interface SakuraPetal {
	x: number
	y: number
	r: number
	a: number
	va: number
}

const angle = ref(0)
const speed = 0.05
const radius = 80

const x = 0
const y = 0
const width = 300
const height = 400
const petals = 5
const petalSize = 8
const petalColor = '#ff9999'
const centerColor = '#ffcccc'
const centerX = 150
const centerY = 200

let canvas: HTMLCanvasElement | undefined
let ctx: CanvasRenderingContext2D | undefined

const sakuraPetals = ref<SakuraPetal[]>([])
// const canvasRef = ref<HTMLCanvasElement>(null)
onMounted(() => {
	// init()
	// canvas = canvasRef.value as HTMLCanvasElement
	const currentInstance = getCurrentInstance()
	const canvas = currentInstance.proxy.$refs.canvas as HTMLCanvasElement
	ctx = canvas.getContext('2d')!
	for (let i = 0; i < petals; i++) {
		sakuraPetals.value.push(createSakuraPetal(i))
	}
	setInterval(() => {
		draw(ctx)
	}, 30)
})

function createSakuraPetal(index: number): SakuraPetal {
	const r = getRandom(10, 15)
	const a = (index * Math.PI * 2) / petals
	const va = getRandom(0.01, 0.02)
	return {
		x: centerX,
		y: centerY,
		r,
		a,
		va
	}
}

function draw(ctx) {
	// 清空画布
	ctx?.clearRect(0, 0, width, height)

	// 绘制花瓣
	sakuraPetals.value.forEach((petal) => {
		const { x, y, r, a, va } = petal
		petal.x = centerX + r * Math.cos(a)
		petal.y = centerY + r * Math.sin(a)
		petal.a += va
		ctx.fillStyle = petalColor
		ctx?.beginPath()
		ctx?.moveTo(centerX, centerY)
		drawSakuraPetal(petal.x, petal.y, r, a, ctx!)
		ctx?.closePath()
		ctx?.fill()
	})

	// 绘制花心
	ctx.fillStyle = centerColor
	ctx?.beginPath()
	ctx?.arc(centerX, centerY, petalSize, 0, Math.PI * 2)
	ctx?.closePath()
	ctx?.fill()
}

function drawSakuraPetal(x: number, y: number, r: number, a: number, context: CanvasRenderingContext2D) {
	const part = 360 / petals
	const R1 = r * Math.sin((2 * Math.PI) / 5 / 2)
	const R2 = r * Math.cos((2 * Math.PI) / 5 / 2)

	const x0 = x + r * Math.cos((a * part) / 180)
	const y0 = y + r * Math.sin((a * part) / 180)
	const x1 = x + R1 * Math.cos((a * part) / 180 + (((2 * part) / 6) * Math.PI) / 180)
	const y1 = y + R1 * Math.sin((a * part) / 180 + (((2 * part) / 6) * Math.PI) / 180)
	const x2 = x + R2 * Math.cos((a * part) / 180 + (((3 * part) / 6) * Math.PI) / 180)
	const y2 = y + R2 * Math.sin((a * part) / 180 + (((3 * part) / 6) * Math.PI) / 180)
	const x3 = x + R1 * Math.cos((a * part) / 180 + (((4 * part) / 6) * Math.PI) / 180)
	const y3 = y + R1 * Math.sin((a * part) / 180 + (((4 * part) / 6) * Math.PI) / 180)
	const x4 = x + r * Math.cos((a * part) / 180 + (part * Math.PI) / 180)
	const y4 = y + r * Math.sin((a * part) / 180 + (part * Math.PI) / 180)

	context.quadraticCurveTo(x0, y0, x1, y1)
	context.lineTo(x2, y2)
	context.lineTo(x3, y3)
	context.quadraticCurveTo(x4, y4, x0, y0)
}

function getRandom(min: number, max: number): number {
	return Math.random() * (max - min) + min
}
</script>

<style scoped>
canvas {
	border: 1px solid #ccc;
	margin: 20px auto;
}
</style>
