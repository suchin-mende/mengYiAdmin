<template>
  <page-header-wrapper>
    <div class="page-inner-mgl">
      <div class="content-left">
        <div class="search-form">
          <div class="fields">
            <a-input placeholder="ᠨᠡᠷ᠎ᠡ" v-model="key" />
          </div>
          <div class="fields">
            <a-input placeholder="ᠤᠲᠠᠰᠤᠨ ᠨᠤᠮᠧᠷ" v-model="phonenum" />
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
                    <a-input placeholder="ᠨᠡᠷ᠎ᠡ" v-model="key" />
                  </div>
                  <div class="fields">
                    <a-input placeholder="ᠤᠲᠠᠰᠤᠨ ᠨᠤᠮᠧᠷ" v-model="key" />
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

const columns = [
  {
    title: 'ᠨᠡᠷ᠎ᠡ',
    dataIndex: 'namecn',
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
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    onSearch(params) {
      this.isLoading = true
      const page = (params && params.current) || this.pagination.current
      console.log(page)
      uList({
        page: page,
        pageSize: this.pagination.pageSize,
        username: '',
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
    handleKeySearch() {
      this.pagination.current = 1
      this.pagination.total = 0
      this.onSearch()
    },
    handleReset() {
      this.key = ''
      this.handleKeySearch()
    },
    handleTest(id) {
      alert(id)
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