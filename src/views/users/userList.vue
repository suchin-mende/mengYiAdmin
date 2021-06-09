<template>
  <page-header-wrapper>
    <div class="page-inner-mgl">
      <div class="content-left">
        <div class="search-form">
          <div class="fields">
            <a-input placeholder="ᠨᠡᠷ᠎ᠡ" @keyup.enter="handleKeySearch" v-model="key" />
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
          :pagination=false
          :loading="isLoading"
          @change="onSearch"
        >
        <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
        </span>
          <template slot="username" slot-scope="unametext, text">
            <a-button type="link" @click="handleKeyDetail(text.userid)">{{ unametext }}</a-button>
          </template>
          <template slot="actions" slot-scope="text">
            <a-button type="link" @click="handleTest(text)">ᠠᠷᠢᠯᠭᠠᠬᠤ</a-button>
          </template>
        </a-table>
        <div><div class="totalnum">ᠨᠡᠢᠲᠡ {{totalrecord}} ᠵᠤᠷᠪᠤᠰ</div>
        <a-pagination
          show-size-changer
          :defaultPageSize="defaultPageSize"
          :total="total"
          :current="current"
          :pageSizeOptions="ps"
          @change="onSearch"
          @showSizeChange="onShowSizeChange"
        />
        </div>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import { uList, uSave, uDetail } from '@/api/accounts'

const columns = [
  {  
    title: 'ᠳ᠋ᠤᠭᠠᠷ',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: 'ᠨᠡᠷ᠎ᠡ',
    dataIndex: 'username',
    key: 'username',
    scopedSlots: { customRender: 'username' }
  },
  {
    title: 'ᠤᠲᠠᠰᠤᠨ ᠨᠤᠮᠧᠷ',
    dataIndex: 'phonenum'
  },
]

export default {
  data () {
    return {
      ps:['10','15','20','50','100'],
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
        revision: 1
      },
      key: '',
      phonenum: '',
      data: [],
      columns,
      isLoading: false,
      current:1,
      total:0,
      pageSize:20,
      totalrecord:0,
      defaultPageSize:20,
    }
  },
  created () {
    this.onSearch()
  },

  methods: {
    onShowSizeChange(current, pageSize) {
      this.current=1
      this.pageSize=pageSize
      this.onSearch()
    },
    uuid () {
      var d = new Date().getTime()
      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() // use high-precision timer if available
      }
      var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0 // d是随机种子
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })
      return uuid
    },
    showModal () {
      this.visible = true
    },
    handleSubmit () {
      this.defData.username = this.addUsername
      this.defData.phonenum = this.addPhonenum
      this.defData.loginname = this.uuid()
      this.saveUser(this.defData)
    },
    handleOk (e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      this.handleSubmit()
      setTimeout(() => {
        this.onSearch()
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    saveUser (userData) {
      uSave(userData).then((res) => {
        console.log(res)
      })
    },
    onSearch (params) {
      console.log("param",params)
      this.isLoading = true
      const page = (params) || this.current
      uList({
        page: page,
        pageSize: this.pageSize,
        username: this.key || '',
        loginname: '1'
      })
        .then((res) => {
          this.isLoading = false
          const { data } = res
          this.totalrecord = data.records
          this.data = data.rows
          this.current=page
          this.total=data.pageSize * data.totalPage

        })
        .catch(() => {
          this.isLoading = false
        })
    },
    getDetail (beanId) {
      uDetail({
        beanId: beanId
      })
        .then((res) => {
          console.log(res)
        })
        .catch(() => {})
    },
    handleKeySearch () {
      this.current = 1
      this.total = 0
      this.onSearch()
    },
    handleReset () {
      this.key = ''
      this.handleKeySearch()
    },
    handleKeyDetail (uid) {
      this.$router.push({
        name: 'UserDetail',
        params: {
          uid: uid
        }
      })
    },
    handleTest (text) {
      alert(text)
      console.log(text)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .add-form {
  display: grid;
  grid-row-gap: 20px;
}

.ant-table-wrapper{
  height: 100%;
  max-width: 90%;
  /deep/ .ant-spin-nested-loading{
    height: 100% ;
    .ant-spin-container{
      height: 100%;
      .ant-table{
        height: 100%;
        .ant-table-content{
          height: 100%;
          .ant-table-body table{
            overflow-y: hidden;
            height: 100%;
            .ant-table-thead > tr{
              height: 100%;
            }
          }
        }
      }
    }
  }
}

.ant-pagination {
  writing-mode: vertical-lr;
  margin-top: 20px;
  margin-left: 10px;
  /deep/ .ant-pagination-prev {
    margin-right: 0px;
  }
  /deep/ .ant-pagination-item {
    margin-right: 0px;
  }
  /deep/ .ant-pagination-item a {
   padding: 0px;
  }
  /deep/ .ant-pagination-options-size-changer.ant-select {
    margin: 0px;
  }
  /deep/ .ant-select-selection--single {  
    // width:34px;
    height: 90px;
    width: 34px;
  }
  /deep/ .ant-select-selection__rendered{
    margin: 0px;
  }
  /deep/ .ant-select-arrow {
    top: 85%;
    left: 32%;
  }
  /deep/ .ant-select-selection-selected-value {
    margin-top: 4px;
  }
  /deep/ .ant-select-dropdown{
    width: unset !important;
  }
}

.ant-pagination /deep/ li{
  margin: 2px 0px;
}

/deep/ .ant-table-body .ant-table-thead > tr > th:first-child {
  height: 6vh !important;
}
/deep/ .ant-table-body .ant-table-tbody > tr > td:first-child {
  writing-mode: unset !important;
  height: 6vh !important;
  display: grid !important;
  align-content: center;
  justify-content: center;
}

/deep/ .ant-table-body .ant-table-thead > tr > th{
   height: 61vh !important;
}
/deep/ .ant-table-body .ant-table-tbody > tr > td{
   height: 61vh !important;
}


.content-right {
   width: 94%;
  display: flex;
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
/deep/ .ant-table-thead > tr th:last-child,/deep/ .ant-table-tbody .ant-table-row > td:last-child  {
  height: 24vh !important;
  place-content: center;

}
/deep/ .ant-modal-title {
  font-size: 2vh;
}
@media (min-width: 1440px) and (max-width:1768px){
	/deep/ .ant-table-body .ant-table-thead > tr > th{
   height: 29.6vh !important;
}
/deep/ .ant-table-body .ant-table-tbody > tr > td{
   height: 29.6vh !important;
}

}
</style>
