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
            :rules="['namem', { rules: [{ required: true, message: 'error' }] }]">
            <a-input
              :maxLength="50"
            />
          </a-form-model-item>
          <a-form-model-item
            label="ᠥᠬᠡᠷᠡ ᠨᠡᠷ᠎ᠡ"
            :rules="['nameother', { rules: [{ required: true, message: 'error' }] }]">
            <a-input
              :maxLength="50"
            />
          </a-form-model-item>
          <a-form-model-item
            label="新蒙名"
            :rules="['namemn', { rules: [{ required: true, message: 'error' }] }]">
            <a-input
              :maxLength="50"
            />
          </a-form-model-item>
          <a-form-model-item
            label="中文名"
            :rules="['namecn', { rules: [{ required: true, message: 'error' }] }]">
            <a-input
              :maxLength="50"
            />
          </a-form-model-item>
          <a-form-model-item
            label="藏文名"
            :rules="['namez', { rules: [{ required: true, message: 'error' }] }]">
            <a-input
              :maxLength="50"
            />
          </a-form-model-item>

          <div class="drugs">
            <div
              class="drug"
              v-for="(d, idx) in formDrugList"
              :key="d.drugid">
              <a-form-model-item
                label="药品名称">
                <span>{{ d.drugName }}</span>
              </a-form-model-item>
              <a-form-item
                label="数量"
              >
                <a-input
                  :maxLength="50"
                  placeholder=""
                />
              </a-form-item>
              <a-form-item
                label="药品单位"
              >
                <a-input
                  :maxLength="50"
                  placeholder=""
                />
              </a-form-item>
              <a-form-item
                label=""
              >
                <a-button type="danger" @click="handleRemoveDrug(idx)">删除</a-button>
              </a-form-item>
              
            </div>
          </div>
          <a-form-item label="添加药品">
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
          </a-form-item>
          <a-form-item label="剂型">
            <a-checkbox-group class="checkbox" :options="drugCategory"
              v-decorator="['drugcat']"
            />
          </a-form-item>
          <a-form-item label="功效">
            <a-textarea placeholder="请输入" :rows="3" :maxLength="300" v-decorator="['effect']"/>
          </a-form-item>
          <a-form-item label="治法">
            <a-textarea placeholder="请输入" :rows="3" :maxLength="300" v-decorator="['therapymemo']"/>
          </a-form-item>
          <a-form-item label="功能主治">
            <a-textarea placeholder="请输入" :rows="3" :maxLength="300" v-decorator="['mainEffect']"/>
          </a-form-item>
          <a-form-item label="禁忌">
            <a-textarea placeholder="请输入" :rows="3" :maxLength="300" v-decorator="['taboo']"/>
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea placeholder="请输入" :rows="3" :maxLength="300" v-decorator="['remark']"/>
          </a-form-item>
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
  drugDetail,
  durgSave,
  drugList
} from '@/api/drug'
import {
  getDict
} from '@/api/dict'

export default {
  components: {},
  data() {
    return {
      isSubmit: false,

      form: this.$form.createForm(this),
      drugId: null,
      drug: {},
      drugCategory: [],
      drugKey: undefined,
      drugSearchResult: [],
      formDrugList: []
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
      drugDetail({
        beanId: this.drugId
      })
        .then(res => {
          const result = res.data
          this.drug = result
          const { drug, drugSource, fiveElement, sixTaste, drugProperty, drugPower, decomposedTaste,
              seventeenEffect, effectCat, actionMode } = result
          this.form.setFieldsValue({
            namem: drug.namem,
            nameother: drug.nameother,
            namemn: drug.namemn,
            namecn: drug.namecn,
            namez: drug.namez,
            decomEffect: drug.decomEffect,
            baseEffect: drug.baseEffect,
            baseFix: drug.baseFix,
            drugSource: drugSource.filter(d => d.checkflag === '1').map(d => d.dictid),
            fiveElement: fiveElement.filter(d => d.checkflag === '1').map(d => d.dictid),
            sixTaste: sixTaste.filter(d => d.checkflag === '1').map(d => d.dictid),
            drugProperty: drugProperty.filter(d => d.checkflag === '1').map(d => d.dictid),
            drugPower: drugPower.filter(d => d.checkflag === '1').map(d => d.dictid),
            decomposedTaste: decomposedTaste.filter(d => d.checkflag === '1').map(d => d.dictid),
            seventeenEffect: seventeenEffect.filter(d => d.checkflag === '1').map(d => d.dictid),
            effectCat: effectCat.filter(d => d.checkflag === '1').map(d => d.dictid),
            actionMode: actionMode.filter(d => d.checkflag === '1').map(d => d.dictid),
          })
        })
    },
    handleSave() {
      const { form: { validateFields } } = this
      validateFields((err, values) => {
        if (!err) {
          this.saveDrug(values)
        }
      })
    },
    saveDrug (values) {
      this.isSubmit = true
      const params = {
        ...values
      }
      delete params.namem
      delete params.nameother
      delete params.baseEffect
      delete params.baseFix
      delete params.decomEffect

      params.drug = {
        namem: values.namem,
        nameother: values.nameother,
        baseEffect: values.baseEffect,
        baseFix: values.baseFix,
        decomEffect: values.decomEffect
      }
      if (this.drugId) {
        params.drug.drugid = this.drugId
        params.drug.revision = this.drug.drug.revision
      }
      durgSave(params)
        .then(res => {
          this.isSubmit = false
          this.$message.success('Success')
          if (this.drugId) {
            this.getDrug()
          } else {
            this.form.resetFields()
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
      const { drugSearchResult, formDrugList } = this
      if (formDrugList.filter(d => d.drugid === id).length > 0) {
        return
      }
      formDrugList.push({
        unit: '',
        drugid: id,
        drugName: drugSearchResult.filter(d => d.drugid === id)[0].namem, 
        unitnum: 0
      })
    },
    handleRemoveDrug (idx) {
      this.formDrugList.splice(idx, 1)
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
