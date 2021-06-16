<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <div class="content-hor">
        <a-form
          :form="form"
          id="myform">
          <a-form-item label="ᠮᠤᠨᠭᠭᠤᠯ ᠨᠡᠷ᠎ᠡ">
            <a-input
              :maxLength="200"
              v-decorator="['namem', { rules: [{ required: true, message: 'ᠬᠤᠭᠤᠰᠤᠨ ᠪᠠᠢᠵᠤ ᠪᠤᠯᠬᠤ ᠦᠭᠡᠢ' }] }]"
              placeholder=""
            />
          </a-form-item>
          <a-form-item label="ᠥᠭᠡᠷ᠎ᠡ ᠨᠡᠷ᠎ᠡ">
            <a-input
              :maxLength="200"
              v-decorator="['nameother']"
              placeholder=""
            />
          </a-form-item>
          <a-form-item label="ᠺᠢᠷᠢᠯ ᠨᠡᠷ᠎ᠡ">
            <a-input
              :maxLength="200"
              v-decorator="['namemn']"
              placeholder=""
            />
          </a-form-item>
          <a-form-item label="ᠬᠢᠲᠠᠳ ᠨᠡᠷ᠎ᠡ">
            <a-input
              :maxLength="200"
              v-decorator="['namecn']"
              placeholder=""
            />
          </a-form-item>
          <a-form-item label="ᠲᠦᠪᠡᠳ ᠨᠡᠷ᠎ᠡ">
            <a-input
              :maxLength="200"
              v-decorator="['namez']"
              placeholder=""
            />
          </a-form-item>
          <a-form-item label="ᠢᠷᠡᠯᠳᠡ">
            <a-checkbox-group
              class="checkbox"
              :options="drugSource"
              v-decorator="['drugSource']"
            />
          </a-form-item>
          <a-form-item label="ᠲᠠᠪᠤᠨ ᠮᠠᠬᠠᠪᠤᠳ">
            <a-checkbox-group :options="fiveElement" v-decorator="['fiveElement']" />
          </a-form-item>
          <a-form-item label="ᠵᠢᠷᠭᠤᠭᠠᠨ ᠠᠮᠳᠠ">
            <a-checkbox-group :options="sixTaste" v-decorator="['sixTaste']"/>
          </a-form-item>
          <a-form-item label="ᠴᠢᠨᠠᠷ">
            <a-checkbox-group :options="drugProperty" v-decorator="['drugProperty']"/>
          </a-form-item>
          <a-form-item label="ᠨᠠᠢᠮᠠᠨ ᠴᠢᠳᠠᠯ">
            <a-checkbox-group :options="drugPower" v-decorator="['drugPower']"/>
          </a-form-item>
          <a-form-item label="ᠰᠢᠨᠭᠭᠡᠯᠲᠡ ᠵᠢᠨ ᠰᠡᠭᠦᠯ ᠊ᠤᠨ ᠠᠮᠲᠠ">
            <a-checkbox-group :options="decomposedTaste" v-decorator="['decomposedTaste']"/>
          </a-form-item>
          <a-form-item label="ᠠᠷᠪᠠᠨ ᠳᠤᠯᠤᠭᠠᠨ ᠡᠷᠳᠡᠮ">
            <a-checkbox-group :options="seventeenEffect" v-decorator="['seventeenEffect']"/>
          </a-form-item>
          <a-form-item label="ᠰᠢᠨᠭᠭᠡᠯᠳᠡ ᠵᠢᠨ ᠰᠡᠭᠦᠯ ᠊ᠤᠨ ᠡᠷᠳᠡᠮ">
            <a-textarea placeholder="ᠰᠢᠨᠭᠭᠡᠯᠳᠡ ᠵᠢᠨ ᠰᠡᠭᠦᠯ ᠊ᠤᠨ ᠡᠷᠳᠡᠮ" :rows="3" :maxLength="300" v-decorator="['decomEffect']"/>
          </a-form-item>
          <a-form-item label="ᠮᠦᠨ ᠴᠢᠨᠠᠷ ᠊ᠤᠨ ᠴᠢᠳᠠᠯ">
            <a-textarea placeholder="ᠮᠦᠨ ᠴᠢᠨᠠᠷ ᠊ᠤᠨ ᠴᠢᠳᠠᠯ" :rows="3" :maxLength="300" v-decorator="['baseEffect']"/>
          </a-form-item>
          <a-form-item label="ᠭᠤᠤᠯᠳᠠᠭᠤ ᠵᠠᠰᠠᠬᠤ">
            <a-textarea placeholder="ᠭᠤᠤᠯᠳᠠᠭᠤ ᠵᠠᠰᠠᠬᠤ" :rows="3" :maxLength="300" v-decorator="['baseFix']"/>
          </a-form-item>
          <a-form-item label="ᠢᠯᠭᠠᠯ">
            <div class="yilgal">
            <a-checkbox-group :options="effectCat" v-decorator="['effectCat']"/>
            </div>
          </a-form-item>
          <a-form-item label="ᠦᠢᠯᠡᠳᠦᠯ ᠦᠵᠡᠭᠦᠯᠬᠦ ᠬᠡᠯᠪᠡᠷᠢ">
            <a-checkbox-group :options="actionMode" v-decorator="['actionMode']"/>
          </a-form-item>
          <a-form-item label="ᠲᠠᠢᠯᠪᠤᠷᠢ">
            <a-textarea placeholder="ᠲᠠᠢᠯᠪᠤᠷᠢ" :rows="3" :maxLength="300" v-decorator="['remark']"/>
          </a-form-item>
        </a-form>
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
  durgSave
} from '@/api/drug'
import {
  getDict
} from '@/api/dict'

export default {
  components: {},
  data () {
    return {
      tep: 0,
      isSubmit: false,
      drugSource: [],
      fiveElement: [],
      sixTaste: [],
      drugProperty: [],
      drugPower: [],
      decomposedTaste: [],
      seventeenEffect: [],
      effectCat: [],
      actionMode: [],
      form: this.$form.createForm(this),
      drugId: null,
      drug: {}
    }
  },
  mounted () {
     document.getElementById('myform').addEventListener('mousewheel', this.handleScroll)
 },
  created () {
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
      this.setDict('M011', 'drugSource')
      this.setDict('M021', 'fiveElement')
      this.setDict('M041', 'sixTaste')
      this.setDict('M031', 'drugProperty')
      this.setDict('M061', 'drugPower')
      this.setDict('M041', 'decomposedTaste')
      this.setDict('M051', 'seventeenEffect')
      this.setDict('M071', 'effectCat')
      this.setDict('M081', 'actionMode')
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
    getDrug () {
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
            remark:drug.remark,
            drugSource: drugSource.filter(d => d.checkflag === '1').map(d => d.dictid),
            fiveElement: fiveElement.filter(d => d.checkflag === '1').map(d => d.dictid),
            sixTaste: sixTaste.filter(d => d.checkflag === '1').map(d => d.dictid),
            drugProperty: drugProperty.filter(d => d.checkflag === '1').map(d => d.dictid),
            drugPower: drugPower.filter(d => d.checkflag === '1').map(d => d.dictid),
            decomposedTaste: decomposedTaste.filter(d => d.checkflag === '1').map(d => d.dictid),
            seventeenEffect: seventeenEffect.filter(d => d.checkflag === '1').map(d => d.dictid),
            effectCat: effectCat.filter(d => d.checkflag === '1').map(d => d.dictid),
            actionMode: actionMode.filter(d => d.checkflag === '1').map(d => d.dictid)
          })
        })
    },
    handleSave () {
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
      delete params.remark
      delete params.decomEffect
      params.drug = {
        namem: values.namem,
        nameother: values.nameother,
        namecn: values.namecn,
        namemn: values.namemn,
        namez: values.namez,
      }
      if (this.remark){
         params.drug.remark=values.remark.replace(/\\n/g, '<br>')
      }else{
         params.drug.remark=values.remark
      }
      if (this.baseEffect){
         params.drug.baseEffect=values.baseEffect.replace(/\\n/g, '<br>')
      }else{
         params.drug.baseEffect=values.baseEffect
      }
      
      if (this.baseFix){
         params.drug.baseFix=values.baseFix.replace(/\\n/g, '<br>')
      }else{
         params.drug.baseFix=values.baseFix
      }
      
      if (this.decomEffect){
         params.drug.decomEffect=values.decomEffect.replace(/\\n/g, '<br>')
      }else{
         params.drug.decomEffect=values.decomEffect
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
    handleCancel () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-btn {
  margin-bottom: 20px;
  
}

/deep/ .ant-form label {
  font-size: 2vh;

}
//vertical-align: middle;

/deep/ .ant-checkbox-group {
  text-align: justify;
  height: 65vh;
  display: table;
}

/deep/ .ant-form-item-children .ant-checkbox-group label  {
  margin-bottom: 10px;
  
  span {
  vertical-align: middle;
  }

}

/deep/ .ant-pro-page-header-wrap-children-content {
  position: relative;
}
.ant-card {
  width: 100%;
  height: 100%;
  position: absolute;
  /deep/ .ant-card-body {
    width: 100%;
    overflow-x: overlay;
    .content-hor {
      width: 100%;
      height: 100%;
      // overflow-x: auto;
      display: flex;

      .ant-form {
        width: 85%;
        overflow-x: auto;
        overflow-y: hidden;
        .ant-form-item {
          padding: 0px 0px 0px 38px;
          border-left: solid 1px #f0f2f5 ;
        }
      }
      .actions {
        margin-left: 40px;
        width: 15%;
        display: flex;
        align-items: baseline;
        justify-content: center;
        border-left: solid 1px #eff1f4;
        .actions-inner {
          display: inline-grid;
        }
      }
    }
  }
}
</style>
