<template>
  <page-header-wrapper>
    <!-- <a-card :bordered="false">
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
    </a-card> -->

    <a-card style="margin-top: 24px" :bordered="false">
      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all"> ᠨᠢᠭᠡ </a-radio-button>
          <a-radio-button value="processing"> ᠨᠢᠭᠡ ᠡᠭᠦᠯᠡᠨ ᠨᠠᠢᠷᠠᠭᠤᠯᠤᠭᠴᠢ </a-radio-button>
          <a-radio-button value="waiting">ᠡᠭᠦᠯᠡᠨ ᠨᠠᠢᠷᠠᠭᠤᠯᠤᠭᠴᠢ</a-radio-button>
        </a-radio-group>
        <!-- <a-input-search style="margin-left: 16px; width: 272px" /> -->
      </div>

      <!-- <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="add">添加</a-button>
      </div> -->

      <a-list size="large" :pagination="{ showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50 }">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.description">
            <a-checkbox @change="onChange"> Checkbox </a-checkbox>
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
              <span>Owner</span>
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <span> ᠰᠦᠯᠵᠢᠶᠡᠨ</span>
              <p>{{ item.startAt }}</p>
            </div>
            <!-- <div class="list-content-item">
              <a-progress
                :percent="item.progress.value"
                :status="!item.progress.status ? null : item.progress.status"
              />
            </div> -->
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  // 演示如何使用 this.$dialog 封装 modal 组件
  import TaskForm from './modules/TaskForm'
  import Info from './components/Info'

  const data = []
  data.push({
    title: 'ᠨᠢᠭᠡ',
    description: 'ᠡᠨᠡ ᠪᠣᠯ ᠨᠢᠭᠡ ᠡᠭᠦᠯᠡᠨ ᠨᠠᠢᠷᠠᠭᠤᠯᠤᠭᠴᠢ',
    owner: 'ᠨᠢᠭᠡ',
    startAt: '2018-07-26 22:44',
    progress: {
      value: 90
    }
  })
  data.push({
    title: 'ᠨᠢᠭᠡ',
    description: 'ᠡᠨᠡ ᠪᠣᠯ ᠨᠢᠭᠡ ᠡᠭᠦᠯᠡᠨ ᠨᠠᠢᠷᠠᠭᠤᠯᠤᠭᠴᠢ',
    owner: 'ᠨᠢᠭᠡ',
    startAt: '2018-07-26 22:44',
    progress: {
      value: 54
    }
  })
  data.push({
    title: 'ᠨᠢᠭᠡ',
    description: 'ᠡᠨᠡ ᠪᠣᠯ ᠨᠢᠭᠡ ᠡᠭᠦᠯᠡᠨ ᠨᠠᠢᠷᠠᠭᠤᠯᠤᠭᠴᠢ',
    owner: 'ᠨᠢᠭᠡ',
    startAt: '2018-07-26 22:44',
    progress: {
      value: 66
    }
  })
  data.push({
    title: 'Ant Design Pro',
    description: 'ᠡᠨᠡ ᠪᠣᠯ ᠨᠢᠭᠡ ᠡᠭᠦᠯᠡᠨ ᠨᠠᠢᠷᠠᠭᠤᠯᠤᠭᠴᠢ',
    owner: 'ᠨᠢᠭᠡ',
    startAt: '2018-07-26 22:44',
    progress: {
      value: 30
    }
  })
  data.push({
    title: 'Bootstrap',
    description: 'ᠡᠨᠡ ᠪᠣᠯ ᠨᠢᠭᠡ ᠡᠭᠦᠯᠡᠨ ᠨᠠᠢᠷᠠᠭᠤᠯᠤᠭᠴᠢ',
    owner: 'ᠨᠢᠭᠡ',
    startAt: '2018-07-26 22:44',
    progress: {
      status: 'exception',
      value: 100
    }
  })

  export default {
    name: 'StandardList',
    components: {
      TaskForm,
      Info
    },
    data() {
      return {
        data,
        status: 'all'
      }
    },
    methods: {
      add() {
        this.$dialog(
          TaskForm,
          // component props
          {
            record: {},
            on: {
              ok() {
                console.log('ok 回调')
              },
              cancel() {
                console.log('cancel 回调')
              },
              close() {
                console.log('modal close 回调')
              }
            }
          },
          // modal props
          {
            title: '新增',
            width: 700,
            centered: true,
            maskClosable: false
          }
        )
      },
      edit(record) {
        console.log('record', record)
        this.$dialog(
          TaskForm,
          // component props
          {
            record,
            on: {
              ok() {
                console.log('ok 回调')
              },
              cancel() {
                console.log('cancel 回调')
              },
              close() {
                console.log('modal close 回调')
              }
            }
          },
          // modal props
          {
            title: '操作',
            width: 700,
            centered: true,
            maskClosable: false
          }
        )
      }
    }
  }
</script>

<style lang="less" scoped>
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