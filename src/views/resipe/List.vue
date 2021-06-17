<template>
  <page-header-wrapper>
    <div class="page-inner-mgl">
      <div class="content-left">
        <div class="search-form">
          <div class="fields">
            <a-input placeholder="ᠡᠮ ᠢᠨ ᠨᠡᠷᠡᠢᠳᠡᠯ" @keyup.enter="handleKeySearch" v-model="key"/>
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
          :pagination=false
          :loading="isLoading"
          @change="onSearch"
        >
        <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
        </span>
          <!-- <div slot="cat" slot-scope="text">
            {{ getCat(text).label }}
          </div> -->
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
            <a-popconfirm @confirm="handleRemove(record)" title="确定要删除该药品吗？">
              <a-button type="link" size="small">ᠠᠷᠢᠯᠭᠠᠬᠤ</a-button>
            </a-popconfirm>
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
    dataIndex: 'namem',
    ellipsis: true,
    scopedSlots: { customRender: 'namem' },
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
      ps:['10','15','20','50','100'],
      key: '',
      data: [],
      columns,
      isLoading: false,
      current:1,
      total:0,
      pageSize:20,
      drugCategory: [],
      totalrecord:0,
      defaultPageSize:20,
    };
  },
  created() {
  },
  mounted () {
    this.setDict('M101', 'drugCategory')
    this.onSearch()
  },

  methods: {
    onShowSizeChange(current, pageSize) {
      this.current=1
      this.pageSize=pageSize
      this.onSearch()
    },
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
     console.log("param",params)
      this.isLoading = true
      const page = (params) || this.current
      resipeList({
         page: page,
        pageSize: this.pageSize,
        rename: this.key || null
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
    handleKeySearch() {
      this.current = 1
      this.total = 0
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


.content-right {
  width: 94%;
  display: flex;
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

/deep/ .ant-table-body .ant-table-thead > tr > th,/deep/ .ant-table-body .ant-table-tbody > tr > td{
   height: 42.4vh !important;
}
/deep/ .ant-table-body .ant-table-tbody > tr > td{
  // display: block !important;
}

.content-right {
  width: 1200px;;
}
.page-inner-mgl .content-left .search-form .fields .ant-input {
  height: 50vh;
}
@media (min-width: 1440px) and (max-width:1768px){
  .ant-table-wrapper {
    max-width: 82% !important;
  }
}
</style>