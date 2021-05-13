<template>
  <div style="writing-mode: vertical-lr; height: 90%">
    
    <div style="width: 80px; height: 100%">
      <a-space :size="25" direction="vertical" class="l-space">
        <p style="margin-bottom: -20px">ᠨᠡᠷ᠎ᠡ᠄</p>
        <input style="width: 32px; height: 150px; display: table-column; vertical-align: -webkit-baseline-middle" />
        <p style="margin-bottom: -20px">ᠤᠲᠠᠰᠤᠨ ᠨᠤᠮᠧᠷ᠄</p>
        <input style="width: 32px; height: 150px; display: table-column; vertical-align: -webkit-baseline-middle" />
        <a-button class="editable-add-btn" @click="handleAdd" type="primary"> ᠬᠠᠢᠬᠤ </a-button>
        <a-button class="editable-add-btn" @click="handleAdd"> ᠠᠷᠢᠯᠭᠠᠬᠤ </a-button>

        <a-button class="editable-add-btn" @click="handleUserAdd()" icon="plus"> ᠨᠡᠮᠡᠬᠦ </a-button>
      </a-space>
    </div>

    <a-table bordered :data-source="data" :columns="columns" row-key="userid">
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="() => onDelete(record.key)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
const EditableCell = {
  template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
          <a-input :value="value" @change="handleChange" @pressEnter="check" /><a-icon
            type="check"
            class="editable-cell-icon-check"
            @click="check"
          />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ value || ' ' }}
          <a-icon type="edit" class="editable-cell-icon" @click="edit" />
        </div>
      </div>
    `,
  props: {
    text: String,
  },
  data() {
    return {
      value: this.text,
      editable: false,
    }
  },
  methods: {
    handleChange(e) {
      const value = e.target.value
      this.value = value
    },
    check() {
      this.editable = false
      this.$emit('change', this.value)
    },
    edit() {
      this.editable = true
    },
  },
}
import { uList } from '@/api/accounts'

export default {
  components: {
    EditableCell,
    
  },
  data() {
    return {
      data: [],
      uList: null,
      username: '',
      phonenum: '',
      longintype: '',
      deleteFlag: '',
      paginiation: {
        current: 1,
        total: 0,
      },
      count: 2,
      columns: [
        {
          title: 'ᠨᠡᠷ᠎ᠡ',
          dataIndex: 'namecn',
          width: '30%',
          scopedSlots: { customRender: 'namecn' },
        },
        {
          title: 'ᠤᠲᠠᠰᠤᠨ ᠨᠤᠮᠧᠷ',
          dataIndex: 'identity',
        },
        {
          title: 'ᠬᠦᠳᠡᠯᠭᠡᠭᠡᠨ',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  created() {
    this.getUlist()
  },
  methods: {
    getUlist() {
      uList({
        page: this.paginiation.current,
        pageSize: 1,
        username: '',
        loginname: '',
      }).then((res) => {
        console.log(res)
        const { data } = res

        this.data = data.rows
        console.log(data.pageSize * data.totalPage)
        this.paginiation = {
          ...this.paginiation,
          total: 100, //data.pageSize * data.totalPage
        }
        console.log()
        // this.paginiation.total = data.pageSize * data.totalPage
      })
    },
    handlePageChange(p) {
      console.log(data)
    },

    handleUserAdd() {
      this.$router.push({ name: 'userAdd' })
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find((item) => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource]
      this.dataSource = dataSource.filter((item) => item.key !== key)
    },
    handleAdd() {
      const { count, dataSource } = this
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`,
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
    },
  },
}
</script>
<style>
.l-space {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 25px;
  text-align: inherit;
}
.s {
  writing-mode: vertical-lr;
  transform: rotate(90deg);
}
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  transform: rotate(90deg);
  margin: 15px 0px;
  font-size: 20px;
  padding: 0px 8px;
  width: 75px;
  height: 32px;
  /* transform: rotate(90deg);transform-origin: top left; */
}
</style>
