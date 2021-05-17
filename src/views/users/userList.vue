<template>
  <page-header-wrapper>
    <div class="page-inner-mgl">
      <div class="content-left">
        <div class="search-form">
          <div class="fields">
            <a-input placeholder="ᠨᠡᠷ᠎ᠡ" v-model="key" />
          </div>
          <div class="actions">
            <div>
              <a-button type="primary" @click="showModal">ᠨᠡᠮᠡᠬᠦ</a-button>
              <a-modal
                title="ᠬᠡᠷᠡᠭᠯᠡᠭᠴᠢ ᠨᠡᠮᠡᠬᠦ"
                :visible="visible"
                :confirm-loading="confirmLoading"
                @ok="handleOk"
                @cancel="handleCancel"
                okText="ᠨᠡᠮᠡᠬᠦ"
                cancelText="ᠪᠤᠴᠠᠬᠤ"
              >
                <div class="add-form">
                  <div class="fields">
                    <a-input placeholder="ᠨᠡᠷ᠎ᠡ" v-model="addUsername" />
                  </div>
                  <div class="fields">
                    <a-input placeholder="ᠤᠲᠠᠰᠤᠨ ᠨᠤᠮᠧᠷ" v-model="addPhonenum" />
                  </div>
                </div>
              </a-modal>
            </div>
            <a-button type="primary" @click="handleKeySearch">ᠬᠠᠢᠬᠤ</a-button>
            <a-button type="danger" @click="handleReset">ᠠᠷᠢᠯᠭᠠᠬᠤ</a-button>
          </div>
        </div>
      </div>
      <div class="content-right">
        <a-table
          row-key="loginname"
          :columns="columns"
          :data-source="data"
          :pagination="pagination"
          :loading="isLoading"
          @change="onSearch"
        >
          <template slot="username" slot-scope="unametext, text">
            <a-button type="link" @click="handleKeyDetail(text.userid)">{{ unametext }}</a-button>
          </template>
          <template slot="actions" slot-scope="text">
            <a-button type="link" @click="handleTest(text)">xx</a-button>
          </template>
        </a-table>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import { uList } from '@/api/accounts'
import { uSave } from '@/api/accounts'
import { uDetail } from '@/api/accounts'

const columns = [
  {
    title: 'ᠨᠡᠷ᠎ᠡ',
    dataIndex: 'username',
    key: 'username',
    scopedSlots: { customRender: 'username' },
  },
  {
    title: 'ᠤᠲᠠᠰᠤᠨ ᠨᠤᠮᠧᠷ',
    dataIndex: 'phonenum',
  },
  {
    title: 'ᠬᠦᠳᠡᠯᠭᠡᠭᠡᠨ',
    dataIndex: 'loginname',
    scopedSlots: { customRender: 'actions' },
  },
]

export default {
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      addUsername: '',
      addPhonenum: '',
      defData: {
        deleteFlag: '0',
        namemn: '',
        nameother: '',
        namez: '',
        pwd: 'qweqwe',
        revision: 1,
      },
      key: '',
      phonenum: '',
      data: [],
      columns,
      isLoading: false,
      pagination: {
        current: 1,
        total: 0,
        current: 1,
        pageSize: 10,
      },
    }
  },
  created() {
    this.onSearch()
  },

  methods: {
    uuid() {
      var d = new Date().getTime()
      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() //use high-precision timer if available
      }
      var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0 // d是随机种子
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })
      return uuid
    },
    showModal() {
      this.visible = true
    },
    handleSubmit() {
      this.defData.username = this.addUsername
      this.defData.phonenum = this.addPhonenum
      this.defData.loginname = this.uuid()
      this.saveUser(this.defData)
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      this.handleSubmit()
      setTimeout(() => {
        this.onSearch()
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    saveUser(userData) {
      uSave(userData).then((res) => {
        console.log(res)
      })
    },
    onSearch(params) {
      this.isLoading = true
      const page = (params && params.current) || this.pagination.current
      console.log(page)
      uList({
        page: page,
        pageSize: this.pagination.pageSize,
        username: this.key || '',
        loginname: '1',
      })
        .then((res) => {
          this.isLoading = false
          const { data } = res
          this.data = data.rows

          this.pagination = {
            ...this.pagination,
            current: page,
            total: data.pageSize * data.totalPage,
          }
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    getDetail(beanId) {
      uDetail({
        beanId: beanId,
      })
        .then((res) => {
          console.log(res)
        })
        .catch(() => {})
    },
    handleKeySearch() {
      this.pagination.current = 1
      this.pagination.total = 0
      this.onSearch()
    },
    handleReset() {
      this.key = ''
      this.handleKeySearch()
    },
    handleKeyDetail(uid) {
      this.$router.push({
        name: 'UserDetail',
        params: {
          uid: uid,
        },
      })
    },
    handleTest(text) {
      alert(text)
      console.log(text)
    },
  },
}
</script>

<style lang="less" scoped>
.content-right {
  width: 800px;
}

.add-form {
  .fields {
    writing-mode: vertical-lr;
    .ant-input {
      width: 32px;
      height: 150px;
      display: table-column;
    }
  }
}
</style>