<template>
  <page-header-wrapper>
    <div class="page-inner-mgl">
      <div class="content-left">
        <div class="search-form">
          <div class="fields">
            <a-input placeholder="ᠡᠮ ᠢᠨ ᠨᠡᠷᠡᠢᠳᠡᠯ" v-model="key"/>
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
          <template
            slot="actions"
            slot-scope="text, record">
            <a-button type="link" size="small" @click="handleDetail(text)">ᠨᠠᠷᠢᠨ ᠪᠠᠢᠳᠠᠯ</a-button>
            <a-button type="link" size="small" @click="handleEdit(text)">ᠵᠠᠰᠪᠤᠷᠢ ᠤᠷᠤᠭᠤᠯᠬᠤ</a-button>
            <a-popconfirm @confirm="handleRemove(record)" title="确定要删除该药品吗？">
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
    title: 'ᠡᠮ ᠢᠨ ᠨᠡᠷᠡᠢᠳᠡᠯ',
    dataIndex: 'namem'
  },
  {
    title: 'ᠳᠤᠬᠢᠷᠠᠭᠤᠯᠬᠤ',
    dataIndex: 'drugid',
    scopedSlots: { customRender: 'actions' }
  }
];

export default {
  data() {
    return {
      key: '',
      data: [],
      columns,
      isLoading: false,
      pagination: {
        current: 1,
        total: 0,
        current: 1,
        pageSize: 15
      }
    };
  },
  created() {
    this.onSearch()
  },

  methods: {
    onSearch(params) {
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
    handleKeySearch() {
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
/deep/ .ant-table-body .ant-table-thead > tr > th:first-child{
   height: 480px !important;
}
/deep/ .ant-table-body .ant-table-tbody > tr > td:first-child{
   height: 480px !important;
}

.content-right {
  width: 1200px;;
}
.page-inner-mgl .content-left .search-form .fields .ant-input {
  height: 485px;
}
</style>