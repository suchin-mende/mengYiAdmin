<template>
  <div :class="wrpCls">
    
    <a-button class="logout" type="danger" icon="poweroff" :loading="iconLoading" @click="enterIconLoading">
    
    </a-button>
    <!-- <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" /> -->
    <!-- <select-lang :class="prefixCls" /> -->
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'
import { Modal } from 'ant-design-vue'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {},
      iconLoading: false,
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.currentUser = {
        name: 'Serati Ma'
      }
    }, 1500)
  },
  methods:{
    enterIconLoading() {
      this.handleLogout();
    },
    handleLogout (e) {
      Modal.confirm({
        okText:"ᠲᠡᠢᠮᠦ ᠡ",
        cancelText:"ᠦᠭᠡᠢ",
        title: "ᠠᠩᠬᠠᠷᠤᠭᠠᠷᠠᠢ！",
        content: "ᠲᠠ ᠦᠨᠡᠨᠬᠦ ᠰᠢᠰᠲᠧᠮ ᠡᠴᠡ ᠭᠠᠷᠬᠤ ᠤᠤ ?",
        onOk: () => {
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>
