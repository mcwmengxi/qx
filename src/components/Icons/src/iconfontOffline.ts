
import { defineComponent, h } from "vue";
import { addIcon, Icon } from '@iconify/vue/dist/offline';

// 离线组件仅具有以下可用功能：
  // addIcon（）.添加一个图标。
  // addCollection（）.添加图标集。

// element-plus icon
import Check from "@iconify-icons/ep/check";
import HomeFilled from "@iconify-icons/ep/home-filled";
import Lollipop from "@iconify-icons/ep/lollipop";
import RefreshRight from "@iconify-icons/ep/refresh-right";
import Close from "@iconify-icons/ep/close";
import CloseBold from "@iconify-icons/ep/close-bold";
import Bell from "@iconify-icons/ep/bell";
import Search from "@iconify-icons/ep/search";
addIcon("check", Check);
addIcon("home-filled", HomeFilled);
addIcon("lollipop", Lollipop);
addIcon("refresh-right", RefreshRight);
addIcon("close", Close);
addIcon("close-bold", CloseBold);
addIcon("bell", Bell);
addIcon("search", Search);

// Iconify Icon在Vue里本地使用（用于内网环境）https://docs.iconify.design/icon-components/vue/offline.html
export default defineComponent({
  name: 'IconifyOfflineIcon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  render() {
    const attrs = this.$attrs
    return h(
      Icon,
      {
        icon: this.icon,
        style: attrs?.style
          ? Object.assign(attrs.style, { outline: "none" })
          : { outline: "none" },
        ...attrs
      }
    )
  }
})
