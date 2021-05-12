<template>
  <page-header-wrapper>
    <div class="page-inner-mgl">
      <div class="content-left">
        <div class="search-form">
          <div class="fields">
            <a-input placeholder="请输入药品名称" v-model="key"/>
          </div>
          <div class="actions">
            <a-button type="primary" @click="handleKeySearch">查询</a-button>
            <a-button type="danger" @click="handleReset">重置</a-button>
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
            slot-scope="text">
            <a-button type="link" @click="handleTest(text)">xx</a-button>
          </template>          
        </a-table>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import {
  dragList
} from '@/api/drag'

const columns = [
  {
    title: '商品名称',
    dataIndex: 'namem'
  },
  {
    title: '操作',
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
        pageSize: 10
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
      dragList({
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
    handleTest (id) {
      alert(id)
    }
  }
}

</script>

<style lang="less" scoped>
.content-right {
  width: 800px;
}
</style>