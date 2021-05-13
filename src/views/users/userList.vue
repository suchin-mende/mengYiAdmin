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
        <div>
          <!-- writing-mode: vertical-lr;
               transform: rotate(90deg); -->
          <a-button class="editable-add-btn" @click="showModal" icon="plus"> ᠨᠡᠮᠡᠬᠦ </a-button>
          <a-modal
            style="writing-mode: vertical-lr"
            title="ᠬᠡᠷᠡᠭᠯᠡᠭᠴᠢ ᠨᠡᠮᠡᠬᠦ"
            :visible="visible"
            :confirm-loading="confirmLoading"
            
            @cancel="handleCancel"
            :footer="null"
            wrapClassName="se-wrapper"
            height="250px"
          >
            <a-form style="width: 250px; display: grid" layout="inline" :form="form" @submit="handleSubmit">
              <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
                <a-input
                  style="width: 32px; height: 150px; display: table-column;z-index: 999;"
                  v-decorator="['namecn', { rules: [{ required: true, message: ' ᠤᠪᠤᠭ ᠨᠡᠷ᠎ᠡ ᠪᠡᠨ ᠪᠢᠴᠢᠭᠡᠷᠠᠢ' }] }]"
                  placeholder=" ᠨᠡᠷ᠎ᠡ "
                >
                  <!-- <a-icon slot="prefix" type="user" style="color: rgba(0, 0, 0, 0.25)" /> -->
                </a-input>
              </a-form-item>
              <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
                <a-input
                  style="width: 32px; height: 150px; display: table-column;z-index: 999;"
                  v-decorator="['phonenum', { rules: [{ required: true, message: 'ᠤᠲᠠᠰᠤᠨ ᠨᠤᠮᠧᠷ ᠢᠡᠨ ᠪᠢᠴᠢᠭᠡᠷᠠᠢ ' }] }]"
                  placeholder="ᠤᠲᠠᠰᠤᠨ ᠨᠤᠮᠧᠷ"
                >
                  <!-- <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" /> -->
                </a-input>
              </a-form-item>
              <a-form-item style="transform: rotate(90deg); transform-origin: top left; z-index: 0">
                <a-button
                  style="bottom: 35px"
                  type="primary"
                  html-type="submit"
                  :disabled="hasErrors(form.getFieldsError())"
                >
                  ᠨᠡᠮᠡᠬᠦ
                </a-button>
              </a-form-item>
            </a-form>
          </a-modal>
        </div>
      </a-space>
    </div>

    <a-table bordered :data-source="data" :columns="columns" row-key="loginname">
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm v-if="data.length" title="Sure to delete?" @confirm="() => onDelete(record.key)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
//唯一id
function uuid() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;    // d是随机种子
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}
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
import { uSave } from '@/api/accounts'
export default {
  components: {
    EditableCell,
  },
  data() {
    return {
      // 弹出表单
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,

      defData: {
        deleteFlag: '0',
        namemn: '',
        nameother: '',
        namez: '',
        pwd: 'qweqwe',
        username: '1',
        revision: 1,
      },
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
          dataIndex: 'phonenum',
        },
        {
          title: 'ᠬᠦᠳᠡᠯᠭᠡᠭᠡᠨ',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    }
  },
  
  // 弹出表单
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  },

  created() {
    this.getUlist()
    
    
  },
  methods: {
    saveUser(userData) {
      uSave(userData).then((res) => {
        console.log(res)
      })
    },
    getUlist() {
      uList({
        page: this.paginiation.current,
        pageSize: 10,
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
        console.log("data-length:",data.records)
        // this.paginiation.total = data.pageSize * data.totalPage
      })
    },
    handlePageChange(p) {
      console.log(data)
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
    // 弹出表单
    showModal() {
      this.visible = true
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('namecn') && getFieldError('namecn')
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('phonenum') && getFieldError('phonenum')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.defData.namecn=values.namecn
          this.defData.phonenum=values.phonenum
          this.defData.loginname=uuid()
          
          


          this.saveUser(this.defData)
          this.form.validateFields()
          this.visible = false
          this.getUlist()

          console.log("finsh")
        }else{
          console.log("error")
          
        }
      })
    },
  },
}
</script>
<style>
.se-wrapper .ant-modal {
  left: 40vw;
  top: 20vh;
}
.se-wrapper .ant-modal .ant-modal-body {
  padding-top: 34px;
}

.se-wrapper .ant-modal .ant-modal-title {
  font-size: 25px;
  padding-top: 20px;
}

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
