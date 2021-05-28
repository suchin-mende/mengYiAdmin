<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a style="" href="https://halgai.com/" target="_blank">奥谷达  ᠤᠲᠠᠴᠢ</a>
      
    </template>
    <template v-slot:copyright>
      <a href="https://github.com/vueComponent" target="_blank">Copyright  2021 蒙ICP备2XXXXXX号</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
