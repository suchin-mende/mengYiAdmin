<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <div class="content-hor">
        <a-form-model
          ref="form"
          :model="form"
          id="myform"
        >
          <a-form-model-item
            label="ᠵᠤᠷ ᠎ᠤᠨ ᠨᠡᠷ᠎ᠠ"
            prop="namem"
            :rules="[{required: true, message: 'error', trigger: 'change'}]">
            <a-input
              :maxLength="50"
              v-model="form.namem"
            />
          </a-form-model-item>
          <a-form-model-item
            label="ᠦᠭᠡᠷ᠎ᠠ ᠨᠡᠷ᠎ᠠ"
            prop="nameother"
            >
            <a-input
              :maxLength="50"
              v-model="form.nameother"
            />
          </a-form-model-item>
          <a-form-model-item
            label="ᠺᠢᠷᠢᠯ ᠨᠡᠷ᠎ᠠ"
            prop="namemn"
            >
            <a-input
              :maxLength="50"
              v-model="form.namemn"
            />
          </a-form-model-item>
          <a-form-model-item
            label="ᠭᠢᠲᠠᠳ ᠨᠡᠷ᠎ᠠ"
            prop="namecn"
            >
            <a-input
              :maxLength="50"
              v-model="form.namecn"
            />
          </a-form-model-item>
          <a-form-model-item
            label="ᠲᠦᠪᠡᠳ ᠨᠡᠷ᠎ᠠ"
            prop="namez"
          >
            <a-input
              :maxLength="50"
              v-model="form.namez"
            />
          </a-form-model-item>

          <div class="drugs">
            <div
              class="drug"
              v-for="(d, idx) in form.resipeDrugList"
              :key="d.drugid">
              <a-form-model-item
                label="ᠡᠮ ᠎ᠤᠨ ᠨᠡᠷᠡᠢᠳᠦᠯ">
                <span>{{ d.namem }}</span>
              </a-form-model-item>
              <a-form-model-item
                label="ᠲᠣᠭ᠎ᠠ ᠬᠡᠮᠵᠢᠶ᠎ᠡ"
                :prop="`resipeDrugList[${idx}].unitnum`"
                :rules="[{required: true, message: 'error', trigger: 'change'}]"
              >
                <a-input
                  :maxLength="10"
                  v-model="d.unitnum"
                  placeholder=""
                />
              </a-form-model-item>
              <a-form-model-item
                label="ᠡᠮ ᠊ᠤᠨ ᠨᠢᠭᠡᠴᠢ"
                :prop="`resipeDrugList[${idx}].unit`"
                :rules="[{required: true, message: 'error', trigger: 'change'}]"
              >
                <a-radio-group
                  v-model="d.unit">
                  <a-radio
                    v-for="(unit, unitIdx) in drugUnits"
                    :key="unitIdx"
                    :value="unit.value"
                  >
                    {{ unit.label }}
                  </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item
                label=""
              >
                <a-button type="danger" @click="handleRemoveDrug(idx)">ᠠᠷᠢᠯᠭᠠᠬᠤ</a-button>
              </a-form-model-item>
            </div>
          </div>
          <a-form-model-item label="ᠡᠮ ᠨᠡᠮᠡᠬᠦ">
            <a-select
              show-search
              :value="drugKey"
              placeholder=""
              :default-active-first-option="false"
              :show-arrow="false"
              :filter-option="false"
              :not-found-content="null"
              @search="handleDrugSearch"
              @change="handleDrugChange"
            >
              <a-select-option v-for="d in drugSearchResult" :key="d.drugid">
                {{ d.namem }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="ᠨᠠᠢᠷᠠᠯᠭ᠎ᠠ ᠢᠨ ᠬᠡᠯᠪᠡᠷᠢ" prop="drugcat"
            :rules="[{required: true, message: 'error', trigger: 'change'}]"
          >
            <a-radio-group
              v-model="form.drugcat">
              <a-radio
                v-for="(cat, catIdx) in drugCategory"
                :key="catIdx"
                :value="cat.value"
              >
                {{ cat.label }}
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="ᠦᠢᠯᠡᠳᠦᠯ" prop="effect">
            <a-textarea placeholder="ᠣᠷᠣᠭᠤᠯᠤᠭᠠᠷᠠᠢ" :rows="3" :maxLength="300" v-model="form.effect"/>
          </a-form-model-item>
          <a-form-model-item label="ᠵᠠᠰᠠᠬᠤ ᠠᠷᠭ᠎ᠠ" prop="therapymemo">
            <a-textarea placeholder="ᠣᠷᠣᠭᠤᠯᠤᠭᠠᠷᠠᠢ" :rows="3" :maxLength="300" v-model="form.therapymemo"/>
          </a-form-model-item>
          <a-form-model-item label="ᠴᠢᠳᠠᠮᠵᠢ ᠪᠡᠷ ᠵᠠᠰᠠᠬᠤ " prop="mainEffect">
            <a-textarea placeholder="ᠣᠷᠣᠭᠤᠯᠤᠭᠠᠷᠠᠢ" :rows="3" :maxLength="300" v-model="form.mainEffect"/>
          </a-form-model-item>
          <a-form-model-item label="ᠴᠡᠭᠡᠷᠯᠡᠬᠦ" prop="taboo">
            <a-textarea placeholder="ᠣᠷᠣᠭᠤᠯᠤᠭᠠᠷᠠᠢ" :rows="3" :maxLength="300" v-model="form.taboo"/>
          </a-form-model-item>
          <a-form-model-item label="ᠲᠠᠢᠯᠪᠤᠷᠢ" prop="remark">
            <a-textarea placeholder="ᠣᠷᠣᠭᠤᠯᠤᠭᠠᠷᠠᠢ" :rows="3" :maxLength="300" v-model="form.remark"/>
          </a-form-model-item>
        </a-form-model>
        <div class="actions">
          <div class="actions-inner">
            <a-button type="danger" @click="handleSave" :loading="isSubmit">ᠬᠠᠳᠠᠭᠠᠯᠠᠬᠤ</a-button>
            <a-button type="danger" @click="handleCancel">ᠪᠤᠴᠠᠬᠤ</a-button>
          </div>
        </div>
      </div>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import {
  durgSave,
  drugList
} from '@/api/drug'

import {
  resipeDetail,
  resipeSave
} from '@/api/resipe'

import {
  getDict
} from '@/api/dict'

export default {
  components: {},
  data() {
    return {
      isSubmit: false,
      tep: 0,

      form: {
        namem: '',
        nameother: '',
        namemn: '',
        namecn: '',
        namez: '',
        resipeDrugList: [],
        drugcat: '',
        effect: '',
        therapymemo: '',
        mainEffect: '',
        taboo: '',
        remark: ''
      },
      drugId: null,
      drug: {},
      drugCategory: [],
      drugKey: undefined,
      drugSearchResult: [],
      formDrugList: [],
      drugUnits: []
    }
  },
  mounted () {
     document.getElementById('myform').addEventListener('mousewheel', this.handleScroll)
 },
  created() {
    this.drugId = this.$route.params.id
    this.initDicts()
    if (this.drugId) {
      this.getDrug()
    }
  },
  methods: {
    handleScroll (e) {
      const direction = e.deltaY > 0 ? 'down' : 'up' // deltaY为正则滚轮向下，为负滚轮向上
            if (direction == 'down') { // 125为用户一次滚动鼠标的wheelDelta的值
                // console.log(e.path[1].scrollLeft)
                this.tep = e.path[1].scrollLeft
                this.tep += 50
                e.path[1].scrollLeft = this.tep
                console.log('nono', e)
            }
            if (direction == 'up') {
                // alert('ss')
                this.tep = e.path[1].scrollLeft
                this.tep -= 50
                e.path[1].scrollLeft = this.tep
            }
    },
    initDicts () {
      this.setDict('M101', 'drugCategory')
      this.setDict('UNI', 'drugUnits')
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
    getDrug() {
      resipeDetail({
        beanId: this.drugId
      })
        .then(res => {
          console.log(res)
          const result = res.data
          this.drug = result
          const { resipe, resipeDrugList } = result
          console.log(resipe)
          this.form = {
            ...this.form,
            namem: resipe.namem,
            nameother: resipe.nameother,
            namemn: resipe.namemn,
            namecn: resipe.namecn,
            namez: resipe.namez,
            drugcat: resipe.drugcat,
            effect: resipe.effect,
            therapymemo: resipe.therapymemo,
            mainEffect: resipe.mainEffect,
            taboo: resipe.taboo,
            remark: resipe.remark,
            resipeDrugList: resipeDrugList 
          }
        })
    },
    handleSave() {
      const { $refs: { form } } = this
      form.validate(valid => {
        if (valid) {
          console.log('--- valid')
          if (this.form.resipeDrugList.length === 0) {
            this.$message.error('ᠡᠮ ᠨᠡᠮᠡᠭᠡᠷᠡᠢ')
            return
          }
          this.saveDrug()
        }
      })
    },
    saveDrug () {
      this.isSubmit = true

      const { form } = this
      console.log(form)
      const params = {
        resipeDrugList: form.resipeDrugList,
        resipe: {
          drugcat: form.drugcat,
          effect: form.effect.replace(/\\n/g, '<br>'),
          mainEffect: form.mainEffect.replace(/\\n/g, '<br>'),
          namecn: form.namecn,
          namem: form.namem,
          namemn: form.namemn,
          nameother: form.nameother,
          namez: form.namez,
          remark: form.remark.replace(/\\n/g, '<br>'),
          therapymemo: form.therapymemo.replace(/\\n/g, '<br>'),
          taboo: form.taboo.replace(/\\n/g, '<br>'),
        }
      }

      if (this.drugId) {
        params.resipe.tid = this.drugId
        params.resipe.revision = this.drug.resipe.revision
      }
      console.log(params)
      
      resipeSave(params)
        .then(res => {
          this.isSubmit = false
          this.$message.success('Success')
          if (this.drugId) {
            // this.getDrug()
          } else {
            this.$refs.form.resetFields()
            this.form.resipeDrugList = []
          }
        })
        .catch(err => {
          this.isSubmit = false
          this.$message.error(err.message)
        })
    },
    handleCancel() {
      this.$router.go(-1)
    },
    handleDrugSearch (value) {
      console.log('----- key search:')
      console.log(value)
      this.searchDrug(value)
    },
    handleDrugChange (value) {
      console.log('----- key changed:')
      console.log(value)
      // this.searchDrug()
      this.addDrug(value)
      this.drugKey = undefined
    },
    searchDrug (key) {
      drugList({
        page: 1,
        pageSize: 30,
        drugName: key
      })
        .then(res => {
          const { data } = res
          this.drugSearchResult = data.rows
        })
        .catch(() => {
        })
    },
    addDrug (id) {
      const { drugSearchResult, form: { resipeDrugList } } = this
      if (resipeDrugList.filter(d => d.drugid === id).length > 0) {
        return
      }
      resipeDrugList.push({
        unit: '',
        drugid: id,
        namem: drugSearchResult.filter(d => d.drugid === id)[0].namem, 
        unitnum: ''
      })
    },
    handleRemoveDrug (idx) {
      this.form.resipeDrugList.splice(idx, 1)
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .ant-radio-group {
  text-align: justify;
  height: 600px;
  display: table;
}

/deep/ .ant-form label {
  font-size: 20px;
}
//vertical-align: middle;
/deep/ .ant-form-item-children .ant-checkbox-group label span {
  vertical-align: middle;
}
.ss .ant-checkbox{
  vertical-align: baseline;
}
// vertical-align: baseline;
/deep/ .ant-pro-page-header-wrap-children-content {
  position: relative;
}
.ant-card {
  width: 100%;
  height: 100%;
  position: absolute;
  /deep/ .ant-card-body {
    width: 100%;
    overflow-x: auto;
    .content-hor {
      
      width: 100%;
      height: 100%;
      overflow-x: auto;
      display: flex;

      .ant-form {
        width: 85%;
        overflow-x: auto;
        label {
          // display: table;
        }

        .ant-radio {
          vertical-align:baseline;
          margin-top: 10px;
        }

        .drugs {
          border-left: 1px dashed #d9d9d9;
          border-right: 1px dashed #d9d9d9;
          display: flex;

          .drug {
            display: flex;
            background: #d6d6d6;
            padding: 15px 0;
            margin: 0 15px;
          }
        }
      }
      .actions {
        margin-left: 40px;
        border-left: solid 1px #d9d9d9;
        width: 15%;
        display: flex;
        align-items: baseline;
        justify-content: center;
        .actions-inner {
          display: inline-grid;
        }
      }
    }
  }
}
</style>
