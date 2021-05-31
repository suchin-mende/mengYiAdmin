<template>
  <page-header-wrapper>
    <div class="page-inner-mgl">
      <div class="content-left">
        <div class="search-form">
          <div class="fields">
            <a-input placeholder="ᠡᠮ ᠊ᠤᠨ ᠨᠡᠷᠡᠢᠳᠡᠯ" v-model="key"/>
          </div>
          <div class="actions">
            <a-button type="danger" @click="handleKeySearch">ᠬᠠᠢᠬᠤ</a-button>
            <a-button type="danger" @click="handleReset">ᠠᠷᠢᠯᠭᠠᠬᠤ</a-button>
            <a-button type="primary" @click="handleCreate">ᠨᠡᠮᠡᠬᠦ</a-button>
          </div>
        </div>
      </div>
      <div class="content-right">
        <a-table
          row-key="drugid"
          :columns="columns"
          :data-source="data"
          :pagination="pagination"
          :loading="isLoading"
          @change="onSearch"
        >
          <template slot="namem" slot-scope="text">
            <a-tooltip placement="rightTop">
              <template slot="title">
               {{ text }}
             </template>
            <span>{{ text }}</span>
            </a-tooltip>
          </template>
          <template
            slot="actions"
            slot-scope="text, record">
            <a-button type="link" size="small" @click="handleDetail(text)">ᠨᠠᠷᠢᠨ ᠪᠠᠢᠳᠠᠯ</a-button>
            <a-button type="link" size="small" @click="handleEdit(text)">ᠵᠠᠰᠪᠤᠷᠢ ᠤᠷᠤᠭᠤᠯᠬᠤ</a-button>
            <a-popconfirm style="" cancelText="ᠦᠭᠡᠢ" okText="ᠲᠡᠢᠮᠦ ᠡ" @confirm="handleRemove(record)" title="ᠡᠨᠡ ᠡᠮ ᠊ᠢ ᠠᠷᠢᠯᠭᠠᠵᠤ ᠪᠤᠯᠬᠤ ᠊ᠤᠤ?">
              <a-button type="link" size="small">ᠠᠷᠢᠯᠭᠠᠬᠤ</a-button>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import {
  drugList,
  drugRemove
} from '@/api/drug'

const columns = [
  {
    title:'ᠡᠮ ᠊ᠤᠨ ᠨᠡᠷᠡᠢᠳᠡᠯ',
    dataIndex: 'namem',
    ellipsis: true,
    scopedSlots: { customRender: 'namem' }
  },
  {
    title: 'ᠳᠤᠬᠢᠷᠠᠭᠤᠯᠬᠤ',
    dataIndex: 'drugid',
    scopedSlots: { customRender: 'actions' }
  }
]

export default {
  data () {
    return {
      key: '',
      data: [],
      columns,
      isLoading: false,
      pagination: {
        current: 1,
        total: 0,
        current: 1,
        pageSize: 23
      }
    }
  },
  created () {
    this.onSearch()
  },

  methods: {
    onSearch (params) {
      this.isLoading = true
      const page = (params && params.current) || this.pagination.current
      console.log(page)
      drugList({
        page: page,
        pageSize: this.pagination.pageSize,
        drugName: this.key || null
      })
        .then(res => {
          this.isLoading = false
          const { data } = res
          this.data = data.rows

          this.pagination = {
            ...this.pagination,
            current: page,
            total: data.pageSize * data.totalPage
          }
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    handleKeySearch () {
      this.pagination.current = 1
      this.pagination.total = 0
      this.onSearch()
    },
    handleReset () {
      this.key = ''
      this.handleKeySearch()
    },
    handleDetail (id) {
      this.$router.push({
        name: 'DrugDetail',
        params: {
          id: id
        }
      })
    },
    handleCreate () {
      this.$router.push({
        name: 'DrugEdit'
      })
    },
    handleEdit (id) {
      this.$router.push({
        name: 'DrugEdit',
        params: {
          id: id
        }
      })
    },
    handleRemove (record) {
      drugRemove({
        beanId: record.drugid
      })
        .then(res => {
          this.$message.success('Success')
          this.onSearch()
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
  }
}

</script>

<style lang="less" scoped>
.ant-table-wrapper{
  height: 100%;
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

/deep/ .ant-table-body .ant-table-thead > tr > th:first-child{
   height: 46.6vh !important;
}
/deep/ .ant-table-body .ant-table-tbody > tr > td:first-child{
   height: 46.6vh !important;
   display:block !important;
   
}

/deep/ .ant-table-thead > tr th:last-child,/deep/ .ant-table-tbody .ant-table-row > td:last-child  {
  height: 44.2vh !important;
  place-content: center;

}
.content-right {
  width: 94%;
}
.page-inner-mgl .content-left .search-form .fields .ant-input {
  height: 485px;
}

@media (min-width: 1440px) and (max-width:1768px){
  
.ant-table-wrapper{
  height: 100%;
  /deep/ .ant-spin-nested-loading{
    height: 100% ;
    .ant-spin-container{
      height: 100%;
      .ant-table{
        height: 100%;
        .ant-table-content{
          height: 100%;
          .ant-table-body table{
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
	
/deep/ .ant-table-body .ant-table-thead > tr > th:first-child{
   height: 42.5vh !important;
}
/deep/ .ant-table-body .ant-table-tbody > tr > td:first-child{
   height: 42.5vh !important;
}

/deep/ .ant-table-thead > tr th:last-child,/deep/ .ant-table-tbody .ant-table-row > td:last-child  {
  height: 44.3vh !important;
  place-content: center;



}
}
</style>
