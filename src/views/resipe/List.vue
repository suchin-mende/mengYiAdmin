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
          row-key="tid"
          :columns="columns"
          :data-source="data"
          :pagination="pagination"
          :loading="isLoading"
          @change="onSearch"
        >
        <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
        </span>
          <div slot="cat" slot-scope="text">
            {{ getCat(text).label }}
          </div>
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
  resipeList,
  resipeRemove
} from '@/api/resipe'

import {
  getDict
} from '@/api/dict'

const columns = [
    {  
    title: 'ᠳ᠋ᠤᠭᠠᠷ',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: 'ᠵᠤᠷ ᠎ᠤᠨ ᠨᠡᠷ᠎ᠠ',
    dataIndex: 'namem'
  },
  {
    title: 'ᠳᠤᠬᠢᠷᠠᠭᠤᠯᠬᠤ',
    dataIndex: 'tid',
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
      },
      drugCategory: []
    };
  },
  created() {
  },
  mounted () {
    this.setDict('M101', 'drugCategory')
    this.onSearch()
  },

  methods: {
    async setDict (key, prop) {
      const result = await getDict(key)
      this[prop] = result.data.map(ds => {
        return {
          label: ds.namem,
          value: ds.dictid
        }
      })
    },
    getCat (id) {
      return this.drugCategory.filter(c =>  c.value === id)[0]
    },
    onSearch(params) {
      this.isLoading = true
      const page = (params && params.current) || this.pagination.current
      console.log(page)
      resipeList({
        page: page,
        pageSize: this.pagination.pageSize,
        rename: this.key || null
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
        name: 'ResipeDetail',
        params: {
          id: id
        }
      })
    },
    handleCreate () {
      this.$router.push({
        name: 'ResipeEdit'
      })
    },
    handleEdit (id) {
      this.$router.push({
        name: 'ResipeEdit',
        params: {
          id: id
        }
      })
    },
    handleRemove (record) {
      resipeRemove({
        beanId: record.tid
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
/deep/ .ant-table-body .ant-table-thead > tr > th:first-child {
  height: 6vh !important;
}
/deep/ .ant-table-body .ant-table-tbody > tr > td:first-child {
  writing-mode: unset !important;
  height: 6vh !important;
  display: block !important;
  text-align: center;
}

/deep/ .ant-table-body .ant-table-thead > tr > th,/deep/ .ant-table-body .ant-table-tbody > tr > td{
   height: 42.4vh !important;
}

.content-right {
  width: 1200px;;
}
.page-inner-mgl .content-left .search-form .fields .ant-input {
  height: 485px;
}
</style>