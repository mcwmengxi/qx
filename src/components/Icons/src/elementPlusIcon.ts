import { defineComponent, h, resolveComponent } from 'vue'
import { ElIcon } from 'element-plus'
export default defineComponent({
  name: "ElementPlusIcon",
  render(){
    // const ElIcon = resolveComponent("el-icon")
    return h(
      ElIcon as any,
      {},
      {
        // default: () => [this.$slots.default && this.$slots.default()]
        // 类型断言
        default: () => [this.$slots.default!()]
      }
    )
  }
})
