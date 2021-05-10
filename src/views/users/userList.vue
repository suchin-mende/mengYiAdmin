<template>
  <page-header-wrapper>
    <!--<a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <info title="我的待办" value="8个任务" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="本周任务平均处理时间" value="32分钟" :bordered="true" />
        </a-col>
        <a-col :sm="8" :xs="24">
          <info title="本周完成任务数" value="24个" />
        </a-col>
      </a-row>
    </a-card>

    <a-card :bordered="false">
      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all"> ᠨᠢᠭᠡ </a-radio-button>
          <a-radio-button value="processing"> ᠨᠢᠭᠡ ᠡᠭᠦᠯᠡᠨ ᠨᠠᠢᠷᠠᠭᠤᠯᠤᠭᠴᠢ </a-radio-button>
          <a-radio-button value="waiting">ᠡᠭᠦᠯᠡᠨ ᠨᠠᠢᠷᠠᠭᠤᠯᠤᠭᠴᠢ</a-radio-button>
        </a-radio-group>
        
      </div>

      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="add">添加</a-button>
      </div>

      <a-list size="large" :pagination="{ showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50 }">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="edit(item)">ᠨᠠᠢᠷᠠᠭᠤᠯᠤᠭᠴᠢ</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a> ᠨᠢᠭᠡ </a></a-menu-item>
                <a-menu-item><a> ᠨᠢᠭᠡ </a></a-menu-item>
              </a-menu>
              <a>
                ᠨᠢᠭᠡ
                <a-icon type="down" />
              </a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <p>{{ item.startAt }}</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="item.progress.value"
                :status="!item.progress.status ? null : item.progress.status" />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card> -->
    <a-col :md="8" :sm="24">
      <a-form-item label=" ᠨᠡᠷ᠎ᠡ">
        <a-input placeholder=" ᠨᠡᠷ᠎ᠡ"/>
      </a-form-item>
    </a-col>
    <a-col :md="8" :sm="24">
      <a-form-item label=" ᠤᠲᠠᠰᠤᠨ ᠳ᠋ᠤᠭᠠᠷ">
        <a-input placeholder=" ᠤᠲᠠᠰᠤᠨ ᠳ᠋ᠤᠭᠠᠷ"/>
      </a-form-item>
    </a-col>
    <a-button type="primary"> ᠬᠠᠢᠬᠤ</a-button>
    <a-button style="margin-left: 8px"> ᠴᠡᠪᠡᠷᠯᠡᠬᠦ</a-button>
    <a-button type="primary" icon="plus" @click="handleUserAdd()"> ᠰᠢᠨ᠎ᠡ ᠪᠡᠷ ᠨᠡᠮᠡᠬᠦ</a-button>
    <a-table
      row-key="userid"
      :columns="columns"
      :data-source="data"
      :paginiation="paginiation"
      @change="handlePageChange"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>


  </page-header-wrapper>
</template>

<script>
  // 演示如何使用 this.$dialog 封装 modal 组件
  import {uList} from '@/api/accounts'

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'username'
    },
    {
      title: 'Phone Num',
      dataIndex: 'phonenum'
    }
    ,{
      title: 'Login Type',
      dataIndex: 'longintype'
    },
    {
      title: 'operation',
      dataIndex: 'deleteFlag'
    }
  ];

  export default {
    data() {
      return {
        data: [],
        columns,

        uList: null,
        username: '',
        phonenum: '',
        longintype:'',
        deleteFlag:'',
        paginiation: {
          current: 1,
          total: 0
        }
      };
    },
    created() {
      this.getUlist();
      // console.log('-------1')
      // console.log(this.getUlist())
    },

    methods: {
      getUlist() {
        uList({
          page: this.paginiation.current,
          pageSize: 1,
          username: '',
          loginname: ''
        })
          .then(res => {
            console.log('-------2')
            console.log(res)
            const { data } = res
            this.data = data.rows
            console.log(data.pageSize * data.totalPage)
            this.paginiation = {
              ...this.paginiation,
              total: 100//data.pageSize * data.totalPage
            }
            // this.paginiation.total = data.pageSize * data.totalPage
          })
      },
      handlePageChange(p) {
        console.log(data)
      },

/*
      onSearch() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          return false
        }
        this.pageNo = 1
        this.findList()
      })
    },
*/
    /** 新增目录 */

    handleUserAdd() {
      this.$router.push({ name: 'userAdd' })
    },

    /** 编辑目录 */
/*
    handleEditBlock(idx, row) {
      this.$router.push({ name: 'blockEdit', params: {
        projectId: row.projectId,
        blockId: row.blockId
      }
      })
    },
*/
    /** 删除目录 */
/*
    handleDelBlock(idx, row) {
      this.$confirm('确定要删除此目录吗?', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(async() => {
          await blockDel(row.blockId)
          this.findList()
          this.$message({
            type: 'success',
            message: '此目录删除成功!'
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
*/
    }

  }

</script>

<style lang="less" scoped>
  .ant-pro-basicLayout-content .ant-pro-page-header-wrap {
    display: flex;
  }

  .ant-page-header {
    padding: 10px;
  }

  .ant-card-head {
    padding: 0;
    margin-bottom: 0;
  }

  .ant-card-extra {
    float: unset;
    margin-left: unset;
    writing-mode: vertical-lr;
  }

  .ant-card {
    display: flex;
  }

  .ant-radio-button-wrapper {
    height: unset;
  }

  .ant-list-split .ant-list-item {
    border-bottom: unset;
    border-right: 1px solid #e8e8e8;
  }

  .ant-list {
    display: flex;
  }

  .ant-list-pagination {
    writing-mode: vertical-lr;

  }

  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }

  .list-content-item {
    color: rgba(0, 0, 0, 0.45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;

    span {
      line-height: 20px
    }

    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }
</style>