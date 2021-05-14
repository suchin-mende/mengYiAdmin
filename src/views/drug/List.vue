<template>
  <page-header-wrapper>
    <div class="page-inner-mgl">
      <div class="content-left">
        <div class="search-form">
          <div class="fields">
            <a-input placeholder="请输入药品名称" v-model="key"/>
          </div>
          <div class="actions">
            <a-button type="danger" @click="handleKeySearch">查询</a-button>
            <a-button type="danger" @click="handleReset">重置</a-button>
            <a-button type="primary" @click="handleCreate">新建</a-button>
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
            <a-button type="link" size="small" @click="handleDetail(text)">详情</a-button>
            <a-button type="link" size="small" @click="handleTest(text)">修改</a-button>
            <a-button type="link" size="small" @click="handleTest(text)">删除</a-button>
          </template>
        </a-table>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import {
  drugList
} from '@/api/drug'

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
    }
  }
}

</script>

<style lang="less" scoped>
.content-right {
  width: 800px;
}
</style>