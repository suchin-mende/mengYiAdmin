<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <div class="content-hor">
        <a-form-model
          ref="form"
          :model="form"
          id="myform"
        >
          <a-form-model-item class="widthfix"
            label="ᠵᠤᠷ ᠎ᠤᠨ ᠨᠡᠷ᠎ᠠ"
            prop="namem"
            :rules="[{required: true, message: 'ᠬᠤᠭᠤᠰᠤᠨ ᠪᠠᠢᠵᠤ ᠪᠤᠯᠬᠤ ᠦᠭᠡᠢ', trigger: 'change'}]">
            <a-input
              :maxLength="50"
              v-model="form.namem"
            />
          </a-form-model-item>
          <a-form-model-item class="widthfix"
            label="ᠦᠭᠡᠷ᠎ᠠ ᠨᠡᠷ᠎ᠠ"
            prop="nameother"
            >
            <a-input
              :maxLength="50"
              v-model="form.nameother"
            />
          </a-form-model-item>
          <a-form-model-item class="widthfix"
            label="ᠺᠢᠷᠢᠯ ᠨᠡᠷ᠎ᠠ"
            prop="namemn"
            >
            <a-input
              :maxLength="50"
              v-model="form.namemn"
            />
          </a-form-model-item>
          <a-form-model-item class="widthfix"
            label="ᠭᠢᠲᠠᠳ ᠨᠡᠷ᠎ᠠ"
            prop="namecn"
            >
            <a-input
              :maxLength="50"
              v-model="form.namecn"
            />
          </a-form-model-item>
          <a-form-model-item class="widthfix"
            label="ᠲᠦᠪᠡᠳ ᠨᠡᠷ᠎ᠠ"
            prop="namez"
          >
            <a-input
              :maxLength="50"
              v-model="form.namez"
            />
          </a-form-model-item>

          <div class="drugs" ref="drugs">
            <div class="drugsdd" >
            <div
              class="drug"
              v-for="(d, idx) in form.resipeDrugList"
              :key="idx">
              <a-form-model-item class="widthfix"
                label="ᠡᠮ"
                :prop="`resipeDrugList[${idx}].drugid`"
                :rules="[{required: true, message: 'ᠬᠤᠭᠤᠰᠤᠨ ᠪᠠᠢᠵᠤ ᠪᠤᠯᠬᠤ ᠦᠭᠡᠢ', trigger: 'change'}]">
                <span>
                  
                  <a-select
                    show-search
                    v-model="d.drugid"
                    placeholder=""
                    :default-active-first-option="false"
                    :show-arrow="false"
                    :filter-option="false"
                    :not-found-content="null"
                    :dropdownMatchSelectWidth="true"
                    @inputKeydown="handleDrugKeydown(idx)"
                    @search="handleDrugSearch"
                    @change="handleDrugChange(idx)"
                    @focus="handleDrugFocus(idx)"
                  > 
                    
                      
                    <a-select-option v-for="d1 in drugSearchResult[idx]" :key="d1.drugid">
                      <a-tooltip placement="rightTop">
                        <template slot="title">
                           {{ d1.namem }}
                        </template>
                      {{ d1.namem }}
                      </a-tooltip>
                    </a-select-option>
                    
                  </a-select>
                </span>
              </a-form-model-item>
              <a-form-model-item class="widthfix"
                label="ᠬᠡᠮᠵᠢᠶ᠎ᠡ"
                :prop="`resipeDrugList[${idx}].unitnum`"
                :rules="[{required: true, message: 'ᠬᠤᠭᠤᠰᠤᠨ ᠪᠠᠢᠵᠤ ᠪᠤᠯᠬᠤ ᠦᠭᠡᠢ', trigger: 'change'}]"
              >
                <a-input class="dragsize"
                  :maxLength="10"
                  v-model="d.unitnum"
                  placeholder=""
                />
              </a-form-model-item>
              <a-form-model-item class="widthfix"
                label="ᠨᠢᠭᠡᠴᠢ"
                :prop="`resipeDrugList[${idx}].unit`"
                :rules="[{required: true, message: 'ᠬᠤᠭᠤᠰᠤᠨ ᠪᠠᠢᠵᠤ ᠪᠤᠯᠬᠤ ᠦᠭᠡᠢ', trigger: 'change'}]"
              >
                <a-radio-group class="radiofix"
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
              <a-form-model-item class="widthfix"
                label=""
              >
                <a-button type="danger" icon="minus-circle" @click="handleRemoveDrug(idx)">ᠠᠷᠢᠯᠭᠠᠬᠤ</a-button>
              </a-form-model-item>
            </div>
            </div>
          </div>
          <a-form-model-item>
            <a-button type="primary" icon="plus" @click="addDrug2()">ᠡᠮ ᠨᠡᠮᠡᠬᠦ</a-button>
          </a-form-model-item>
          <a-form-model-item class="widthfix" label="ᠨᠠᠢᠷᠠᠯᠭ᠎ᠠ ᠢᠨ ᠬᠡᠯᠪᠡᠷᠢ" prop="drugcat"
            :rules="[{required: true, message: 'ᠬᠤᠭᠤᠰᠤᠨ ᠪᠠᠢᠵᠤ ᠪᠤᠯᠬᠤ ᠦᠭᠡᠢ', trigger: 'change'}]"
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
          <a-form-model-item class="textwidthFix" label="ᠦᠢᠯᠡᠳᠦᠯ" prop="effect">
            <a-textarea placeholder="ᠣᠷᠣᠭᠤᠯᠤᠭᠠᠷᠠᠢ" :rows="3" :maxLength="300" v-model="form.effect"/>
          </a-form-model-item>
          <a-form-model-item class="textwidthFix" label="ᠵᠠᠰᠠᠬᠤ ᠠᠷᠭ᠎ᠠ" prop="therapymemo">
            <a-textarea placeholder="ᠣᠷᠣᠭᠤᠯᠤᠭᠠᠷᠠᠢ" :rows="3" :maxLength="300" v-model="form.therapymemo"/>
          </a-form-model-item>
          <a-form-model-item class="textwidthFix" label="ᠴᠢᠳᠠᠮᠵᠢ ᠪᠡᠷ ᠵᠠᠰᠠᠬᠤ " prop="mainEffect">
            <a-textarea placeholder="ᠣᠷᠣᠭᠤᠯᠤᠭᠠᠷᠠᠢ" :rows="3" :maxLength="300" v-model="form.mainEffect"/>
          </a-form-model-item>
          <a-form-model-item class="textwidthFix" label="ᠴᠡᠭᠡᠷᠯᠡᠬᠦ" prop="taboo">
            <a-textarea placeholder="ᠣᠷᠣᠭᠤᠯᠤᠭᠠᠷᠠᠢ" :rows="3" :maxLength="300" v-model="form.taboo"/>
          </a-form-model-item>
          <a-form-model-item class="textwidthFix" label="ᠲᠠᠢᠯᠪᠤᠷᠢ" prop="remark">
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
      tmpDrugIndex: -1,
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
          const result = res.data
          this.drug = result
          const { resipe, resipeDrugList } = result

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

          resipeDrugList.forEach((d, idx) => {
            this.searchDrug(d.namem, idx)
          })
        })
    },
    handleSave() {
      const { $refs: { form } } = this
      form.validate(valid => {
        if (valid) {
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
      const params = {
        resipeDrugList: form.resipeDrugList,
        resipe: {
          drugcat: form.drugcat,
          namecn: form.namecn,
          namem: form.namem,
          namemn: form.namemn,
          nameother: form.nameother,
          namez: form.namez,
        }
      }
      if (this.effect){
         params.resipe.effect=form.effect.replace(/\\n/g, '<br>')
      }else{
         params.resipe.effect=form.effect
      }
      if (this.mainEffect){
         params.resipe.mainEffect=form.mainEffect.replace(/\\n/g, '<br>')
      }else{
         params.resipe.mainEffect=form.mainEffect
      }
      
      if (this.remark){
         params.resipe.remark=form.remark.replace(/\\n/g, '<br>')
      }else{
         params.resipe.remark=form.remark
      }
      
      if (this.therapymemo){
         params.resipe.therapymemo=form.therapymemo.replace(/\\n/g, '<br>')
      }else{
         params.resipe.therapymemo=form.therapymemo
      }
      
      if (this.taboo){
         params.resipe.taboo=form.taboo.replace(/\\n/g, '<br>')
      }else{
         params.resipe.taboo=form.taboo
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
    handleDrugKeydown (idx) {
      this.tmpDrugIndex = idx
    },
    handleDrugFocus (idx) {
      this.calDrugSelectPosition(idx)
    },
    handleDrugSearch (value) {
      this.searchDrug(value, this.tmpDrugIndex)
    },
    handleDrugChange (idx) {
      console.log('----- key changed:' + idx)
      this.$nextTick(() => {
        const { $refs: { form } } = this
        form.validate(() =>{})
      })
    },
    calDrugSelectPosition (idx) {
      const { drugs } = this.$refs
      const selects = drugs.querySelectorAll('.ant-select')
      const drugSelect = selects[idx]
      const pos = this.getElementPosition(drugSelect)

      const dropdowns = document.querySelectorAll('.ant-select-dropdown')
      if (dropdowns.length === 0) {
        return
      } 
      const dropdown = dropdowns[idx]     
      setTimeout(() => {
        dropdown.style.left = pos.left + drugSelect.offsetWidth + 'px'
        dropdown.style.top = pos.top + 'px'
      }, 100)
    },
    searchDrug (key, drugIndex) {
      drugList({
        page: 1,
        pageSize: 30,
        drugName: key
      })
        .then(res => {
          const { data } = res
          this.drugSearchResult[drugIndex] = [
            ...data.rows
          ]
          this.drugSearchResult = [
            ...this.drugSearchResult
          ]
          this.calDrugSelectPosition(drugIndex)
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
    addDrug2 () {
      const { form: { resipeDrugList }, drugSearchResult } = this
      resipeDrugList.push({
        unit: '',
        drugid: '',
        namem: '',
        unitnum: ''
      })
      drugSearchResult[resipeDrugList.length - 1] = []
    },
    handleRemoveDrug (idx) {
      this.form.resipeDrugList.splice(idx, 1)
    },
    getElementPosition(element) {
      const result = {
        top: element.offsetTop,
        left: element.offsetLeft
      }
      var current = element.offsetParent
      while (current !== null) {
        result.top += current.offsetTop
        result.left += current.offsetLeft
        current = current.offsetParent
      }
      return result
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .ant-select-selection__rendered {
  display: flex;
}
/deep/ .anticon {
  margin-bottom: 5px;
}
.radiofix {
  display: flex !important;
}
.textwidthFix /deep/ .ant-form-item-label {
  min-width: 13vh;
}

.widthfix /deep/ .ant-form-item-label{
  min-width: 3vh;
}
/deep/ .ant-form-explain {
  padding-top: 1vh;
  font-size: 1vh;
}
/deep/ .has-error {
  display: grid;
  grid-auto-flow: column;
}

/deep/ .dragsize {
  height: 7vh !important;
}

.ant-btn {
  margin-bottom: 20px;
}
/deep/ .ant-select-selection-selected-value {
  float: unset;
  line-height: 28px;
}
/deep/ .ant-radio-group {
  text-align: justify;
  height: 62vh;
  display: table;
}

/deep/ .ant-form label {
  font-size: 2vh;
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
    padding:20px 32px 0px 32px !important;
    width: 100%;
    overflow-x: overlay;
    .content-hor {
      
      width: 100%;
      height: 100%;
      overflow-x: auto;
      display: flex;

      .ant-form {
        width: 85%;
        overflow-x: auto;
        overflow-y: hidden;
        .ant-radio {
          vertical-align:baseline;
          margin-top: 10px;
        }

        .drugs {
          border-left: 1px solid #f0f2f5;
          border-right: 1px solid #f0f2f5;
          display: flex;
          height: fit-content;

          .drug {
            display: block;
            background: #f0f2f5;
            padding: 15px 0;
            margin: 0 15px;

            .ant-form-item {
              
              .ant-form-item-label {
                height: auto;
              }

              .ant-input, .ant-select, .ant-select-selection, .ant-radio-group{
                height: 16vh;
              }
            }
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
@media screen and(-ms-high-contrast:active),(-ms-high-contrast:none){
  html.mgl .ant-form .ant-form-item .ant-form-item-control-wrapper .ant-form-item-control .ant-form-item-children span button {
    height: 14vh;
  }
}
</style>
