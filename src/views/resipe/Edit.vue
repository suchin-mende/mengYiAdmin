<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <div class="content-hor">
        <a-form-model
          ref="form"
          :model="form"
        >
          <a-form-model-item
            label="处方名称"
            prop="namem"
            :rules="[{required: true, message: 'error', trigger: 'change'}]">
            <a-input
              :maxLength="50"
              v-model="form.namem"
            />
          </a-form-model-item>
          <a-form-model-item
            label="ᠥᠬᠡᠷᠡ ᠨᠡᠷ᠎ᠡ"
            prop="nameother"
            >
            <a-input
              :maxLength="50"
              v-model="form.nameother"
            />
          </a-form-model-item>
          <a-form-model-item
            label="新蒙名"
            prop="namemn"
            >
            <a-input
              :maxLength="50"
              v-model="form.namemn"
            />
          </a-form-model-item>
          <a-form-model-item
            label="中文名"
            prop="namecn"
            >
            <a-input
              :maxLength="50"
              v-model="form.namecn"
            />
          </a-form-model-item>
          <a-form-model-item
            label="藏文名"
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
                label="药品名称">
                <span>{{ d.namem }}</span>
              </a-form-model-item>
              <a-form-model-item
                label="数量"
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
                label="药品单位"
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
                <a-button type="danger" @click="handleRemoveDrug(idx)">删除</a-button>
              </a-form-model-item>
            </div>
          </div>
          <a-form-model-item label="添加药品">
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
          <a-form-model-item label="剂型" prop="drugcat"
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
          <a-form-model-item label="功效" prop="effect">
            <a-textarea placeholder="请输入" :rows="3" :maxLength="300" v-model="form.effect"/>
          </a-form-model-item>
          <a-form-model-item label="治法" prop="therapymemo">
            <a-textarea placeholder="请输入" :rows="3" :maxLength="300" v-model="form.therapymemo"/>
          </a-form-model-item>
          <a-form-model-item label="功能主治" prop="mainEffect">
            <a-textarea placeholder="请输入" :rows="3" :maxLength="300" v-model="form.mainEffect"/>
          </a-form-model-item>
          <a-form-model-item label="禁忌" prop="taboo">
            <a-textarea placeholder="请输入" :rows="3" :maxLength="300" v-model="form.taboo"/>
          </a-form-model-item>
          <a-form-model-item label="备注" prop="remark">
            <a-textarea placeholder="请输入" :rows="3" :maxLength="300" v-model="form.remark"/>
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
  created() {
    this.drugId = this.$route.params.id
    this.initDicts()
    if (this.drugId) {
      this.getDrug()
    }
  },
  methods: {
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
            this.$message.error('请添加药品')
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
          effect: form.effect,
          mainEffect: form.mainEffect,
          namecn: form.namecn,
          namem: form.namem,
          namemn: form.namemn,
          nameother: form.nameother,
          namez: form.namez,
          remark: form.remark,
          therapymemo: form.therapymemo,
          taboo: form.taboo
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
      overflow-x: auto;
      display: flex;

      .ant-form {
        width: 85%;
        overflow-x: auto;

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
