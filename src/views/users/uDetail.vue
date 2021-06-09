<template>
  <page-header-wrapper>
    <template v-slot:content>
      <a-descriptions :column="1">
        <!-- <a-descriptions-item label="邮箱">{{ user.email }}</a-descriptions-item>
        <a-descriptions-item label="证件号">{{ user.identity }}</a-descriptions-item> -->
        <a-descriptions-item label="ᠨᠡᠷ᠎ᠡ">{{ user.loginname }}</a-descriptions-item>
        <!-- <a-descriptions-item label="中文名">{{ user.namecn }}</a-descriptions-item>
        <a-descriptions-item label="新蒙文名">{{ user.namemn }}</a-descriptions-item>
        <a-descriptions-item label="其他名">{{ user.nameother }}</a-descriptions-item>
        <a-descriptions-item label="藏文名">{{ user.namez }}</a-descriptions-item> -->
        <a-descriptions-item label="ᠤᠳᠠᠰᠤ">{{ user.phonenum }}</a-descriptions-item>
        <!-- <a-descriptions-item label="密码">{{ user.pwd }}</a-descriptions-item>
        <a-descriptions-item label="性别">{{ user.sex }}</a-descriptions-item> -->
        <a-descriptions-item label="ᠮᠤᠩᠭᠤᠯ ᠨᠡᠷ᠎ᠡ">{{ user.username }}</a-descriptions-item>
        <a-descriptions-item>
          <!-- <a-button type="primary">ᠵᠠᠰᠠᠪᠤᠷᠢ ᠤᠷᠤᠭᠤᠯᠬᠤ</a-button> -->
        </a-descriptions-item>
      </a-descriptions>
    </template>
  </page-header-wrapper>
</template>

<script>
import { uDetail } from '@/api/accounts'

export default {
  components: {},
  data() {
    return {
      userID: null,
      user: {},
    }
  },
  created() {
    this.userID = this.$route.params.uid
    this.getUser()
  },
  methods: {
    getUser() {
      uDetail({
        beanId: this.userID,
      }).then((res) => {
        const { data } = res
        const user = {
          email: data.email,
          identity: data.identity,
          loginname: data.loginname,
          namecn: data.namecn,
          namemn: data.namemn,
          nameother: data.nameother,
          namez: data.namez,
          phonenum: data.phonenum,
          pwd: data.pwd,
          sex: data.sex,
          username: data.username,
        }
        this.user = user
      })
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .ant-pro-page-header-wrap-page-header-warp {
  width: 100%;
  .ant-descriptions-row {
    padding: 0 10px;
    display: block;
    .ant-descriptions-item-content {
      margin-top: 30px;
    }
  }
  .ant-descriptions-row {
    &:last-child {
      display: flex;
      justify-content: flex-end;
    }
  }
}

/deep/ tbody > tr > td > span {
  font-size: 2vh;
  overflow-wrap: break-word;
}
</style>
