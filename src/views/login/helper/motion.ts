import { h,defineComponent, ref } from "vue";

export default defineComponent({
  name: "Motion",
  props: {
    delay: {
      type: Number,
      default: 50
    }
  },
  render() {
    return h(
      'div',
      {},
      {
        default: () => [this.$slots.default()]
      }
    )
  }
})
