<template>
  <page-header-wrapper>
    <div class="page-inner-mgl">
      <div class="content-left">
        <div class="search-form">
          <div class="fields">
            <a-input placeholder="请输入药品名称"/>
          </div>
          <div class="actions">
            <a-button type="primary">查询</a-button>
            <a-button type="danger">取消</a-button>
          </div>
        </div>
      </div>
      <div class="content-right" style="width: 800px;">
        <a-table
          row-key="drugid"
          :columns="columns"
          :data-source="data"
          :pagination="pagination"
          @change="handlePageChange"
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
      data: [],
      columns,
      pagination: {
        current: 1,
        total: 0,
        pageSize: 15
      }
    };
  },
  created() {
    this.onSearch()
  },

  methods: {
    onSearch(params) {
      dragList({
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        drugName: ''
      })
        .then(res => {
          const { data } = res
          this.data = data.rows

          this.pagination = {
            ...this.pagination,
            total: data.pageSize * data.totalPage
          }
        })
    },
    handleTest (id) {
      console.log(id)
    }
  }
}

</script>

<style lang="less" scoped>
</style>