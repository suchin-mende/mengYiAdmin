<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form :form="form">
        <a-form-item label="ᠡᠮ ᠢᠨ ᠨᠡᠷᠡᠢᠳᠡᠯ">
          <a-input
            :maxLength="50"
            v-decorator="['namecn', { rules: [{ required: true, message: 'error' }] }]"
            placeholder=""
          />
        </a-form-item>
        <a-form-item label="ᠥᠬᠡᠷᠡ ᠨᠡᠷ᠎ᠡ">
          <a-input :maxLength="50" v-decorator="['name']" placeholder="" />
        </a-form-item>
        <a-form-item label="ᠢᠷᠡᠯᠲᠡ">
          <a-checkbox-group class="checkbox" :options="laiyuan" />
        </a-form-item>
        <a-form-item label="ᠲᠠᠪᠤᠨ ᠮᠠᠬᠠᠪᠤᠳ">
          <a-checkbox-group class="ss" :options="wuyuan" />
        </a-form-item>
        <a-form-item label="ᠵᠢᠷᠭᠤᠭᠠᠨ ᠠᠮᠳᠠ">
          <a-checkbox-group :options="liuwei" />
        </a-form-item>
        <a-form-item label="ᠡᠮ ᠢᠨ ᠴᠢᠨᠠᠷ">
          <a-checkbox-group :options="yaoxing" />
        </a-form-item>
        <a-form-item label="ᠡᠮ ᠢᠨ ᠴᠢᠳᠠᠯ">
          <a-checkbox-group :options="yaoli" />
        </a-form-item>
        <a-form-item label="ᠡᠮ ᠢᠨ ᠠᠮᠳᠠ ᠢᠡᠷ ᠵᠠᠳᠠᠯᠬᠤ">
          <a-checkbox-group :options="fenjieyaowei" />
        </a-form-item>
        <a-form-item label="ᠠᠷᠪᠠᠨ ᠳᠤᠯᠤᠭᠠᠨ ᠴᠢᠳᠠᠯ">
          <a-checkbox-group :options="shiqigongxiao" />
        </a-form-item>
        <a-form-item label="ᠡᠮ ᠢᠨ ᠴᠢᠳᠠᠯ ᠢᠡᠷ ᠵᠠᠳᠠᠯᠬᠤ">
          <a-textarea placeholder="ᠡᠮ ᠢᠨ ᠴᠢᠳᠠᠯ ᠢᠡᠷ ᠵᠠᠳᠠᠯᠬᠤ" :rows="4" />
        </a-form-item>
        <a-form-item label="ᠡᠮ ᠢᠨ ᠴᠢᠳᠠᠯ ᠢᠨ ᠬᠡᠪ ᠴᠢᠨᠠᠷ">
          <a-textarea placeholder="ᠡᠮ ᠢᠨ ᠴᠢᠳᠠᠯ ᠢᠨ ᠬᠡᠪ ᠴᠢᠨᠠᠷ" :rows="4" />
        </a-form-item>
        <a-form-item label="ᠭᠤᠤᠯᠯᠠᠨ ᠵᠠᠰᠠᠬᠤ ᠡᠪᠡᠳᠴᠢᠨ">
          <a-textarea placeholder="ᠭᠤᠤᠯᠯᠠᠨ ᠵᠠᠰᠠᠬᠤ ᠡᠪᠡᠳᠴᠢᠨ" :rows="4" />
        </a-form-item>
        <a-form-item label="ᠴᠢᠳᠠᠯ ᠢᠨ ᠬᠡᠯᠪᠡᠷᠢ">
          <a-checkbox-group :options="gongxiaoleibie" />
        </a-form-item>
        <a-form-item label="ᠦᠢᠯᠡᠳᠦᠯ ᠦᠵᠡᠭᠦᠯᠬᠦ ᠬᠡᠯᠪᠡᠷᠢ">
          <a-checkbox-group :options="zuoyongfangshi" />
        </a-form-item>
        
        <a-form-item label="">
           <a-button type="danger" @click="handleSave">ᠬᠠᠳᠠᠭᠠᠯᠠᠬᠤ</a-button>
            <a-button type="danger" @click="handleCancel">ᠪᠤᠴᠠᠬᠤ</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import { drugDetail } from '@/api/drug'
const laiyuan = [
  { label: 'ᠡᠷᠳᠡᠨᠢ ᠢᠨ ᠲᠦᠷᠦᠯ', value: '1' },
  { label: 'ᠬᠠᠳᠠ ᠴᠢᠯᠠᠭᠤᠨ ᠲᠦᠷᠦᠯ', value: '2' },
  { label: 'ᠠᠭᠤᠷᠬᠠᠢ ᠢᠨ ᠲᠦᠷᠦᠯ', value: '3' },
  { label: 'ᠮᠤᠳᠤ ᠰᠠᠯᠠᠭᠠᠨ ᠤ ᠲᠦᠷᠦᠯ', value: '4' },
  { label: 'ᠤᠬᠢ ᠲᠦᠷᠦᠯ', value: '5' },
  { label: 'ᠭᠠᠭᠴᠠ ᠡᠮ', value: '6' },
  { label: 'ᠡᠪᠡᠰᠦᠨ ᠤ ᠲᠦᠷᠦᠯ', value: '7' },
  { label: 'ᠠᠮᠢᠳᠠᠨ ᠤ ᠲᠦᠷᠦᠯ', value: '8' },
]

const wuyuan = [
  { label: 'ᠰᠢᠷᠦᠢ', value: '1' },
  { label: 'ᠤᠰᠤ', value: '2' },
  { label: 'ᠭᠠᠯ', value: '3' },
  { label: 'ᠬᠡᠢ', value: '4' },
  { label: 'ᠤᠭᠳᠠᠷᠭᠤᠢ', value: '5' },
]
const liuwei = [
  { label: 'ᠰᠢᠬᠢᠷᠯᠢᠭ', value: '1' },
  { label: 'ᠱᠤᠷᠪᠤᠬ', value: '2' },
  { label: 'ᠬᠦᠴᠦᠯᠢᠭ', value: '3' },
  { label: 'ᠭᠠᠰᠢᠭᠤᠨ', value: '4' },
  { label: 'ᠭᠤᠱᠤᠭᠤᠨ', value: '5' },
  { label: 'ᠠᠷᠭᠤᠨ', value: '6' },
]
const yaoxing = [
  { label: 'ᠬᠠᠯᠠᠭᠤᠨ', value: '1' },
  { label: 'ᠪᠦᠯᠢᠶᠡᠨ', value: '2' },
  { label: 'ᠳᠡᠭᠰᠢ', value: '3' },
  { label: 'ᠰᠡᠷᠢᠭᠦᠨ', value: '4' },
  { label: 'ᠬᠦᠢᠲᠡᠨ', value: '5' },
]
const yaoli = [
  { label: 'ᠬᠦᠨᠳᠦ', value: '1' },
  { label: 'ᠭᠦᠯᠢᠭᠡᠷ', value: '2' },
  { label: 'ᠰᠡᠷᠢᠭᠦᠨ', value: '3' },
  { label: 'ᠴᠤᠯᠠ', value: '4' },
  { label: 'ᠬᠦᠨᠭᠭᠡᠨ', value: '5' },
  { label: 'ᠬᠠᠯᠠᠭᠤᠨ', value: '6' },
  { label: 'ᠬᠤᠷᠴᠠ', value: '7' },
  { label: 'ᠪᠦᠳᠦᠭᠦᠯᠢᠭ', value: '8' },
]
const fenjieyaowei = [
  { label: 'ᠰᠢᠬᠢᠷᠯᠢᠭ', value: '1' },
  { label: 'ᠱᠤᠷᠪᠤᠬ', value: '2' },
  { label: 'ᠬᠦᠴᠦᠯᠢᠭ', value: '3' },
  { label: 'ᠭᠠᠰᠢᠭᠤᠨ', value: '4' },
  { label: 'ᠭᠤᠱᠤᠭᠤᠨ', value: '5' },
  { label: 'ᠠᠷᠭᠤᠨ', value: '6' },
]
const shiqigongxiao = [
  { label: 'ᠬᠦᠨᠳᠦ', value: '1' },
  { label: 'ᠵᠦᠭᠡᠯᠡᠨ', value: '2' },
  { label: 'ᠬᠠᠲᠠᠭᠤ', value: '3' },
  { label: 'ᠪᠦᠯᠢᠶᠡᠨ', value: '4' },
  { label: 'ᠭᠦᠯᠢᠭᠡᠷ', value: '5' },
  { label: 'ᠰᠡᠷᠢᠭᠦᠨ', value: '6' },
  { label: 'ᠮᠤᠬᠤᠷ', value: '7' },
  { label: 'ᠡᠶᠡᠯᠳᠡᠭ', value: '8' },
  { label: 'ᠬᠦᠢᠲᠡᠨ', value: '9' },
  { label: 'ᠬᠠᠭᠤᠷᠠᠢ', value: '10' },
  { label: 'ᠰᠢᠨᠭᠭᠡᠨ', value: '11' },
  { label: 'ᠬᠦᠨᠭᠭᠡᠨ', value: '12' },
  { label: 'ᠰᠤᠯᠠ', value: '13' },
  { label: 'ᠬᠠᠯᠠᠭᠤᠨ', value: '14' },
  { label: 'ᠬᠤᠷᠴᠠ', value: '15' },
  { label: 'ᠬᠦᠳᠡᠯᠭᠡᠨ', value: '16' },
  { label: 'ᠪᠦᠳᠦᠭᠦᠯᠢᠭ', value: '17' },
]
const gongxiaoleibie = [
  { label: 'ᠬᠦᠨᠳᠦ', value: '1' },
  { label: 'ᠵᠦᠭᠡᠯᠡᠨ', value: '2' },
  { label: 'ᠬᠠᠲᠠᠭᠤ', value: '3' },
  { label: 'ᠪᠦᠯᠢᠶᠡᠨ', value: '4' },
  { label: 'ᠭᠦᠯᠢᠭᠡᠷ', value: '5' },
  { label: 'ᠰᠡᠷᠢᠭᠦᠨ', value: '6' },
  { label: 'ᠮᠤᠬᠤᠷ', value: '7' },
  { label: 'ᠡᠶᠡᠯᠳᠡᠭ', value: '8' },
  { label: 'ᠬᠦᠢᠲᠡᠨ', value: '9' },
  { label: 'ᠬᠠᠭᠤᠷᠠᠢ', value: '11' },
  { label: 'ᠰᠢᠨᠭᠭᠡᠨ', value: '22' },
  { label: 'ᠬᠦᠨᠭᠭᠡᠨ', value: '33' },
  { label: 'ᠰᠤᠯᠠ', value: '44' },
  { label: 'ᠬᠠᠯᠠᠭᠤᠨ', value: '55' },
  { label: 'ᠬᠤᠷᠴᠠ', value: '66' },
  { label: 'ᠬᠦᠳᠡᠯᠭᠡᠨ', value: '77' },
  { label: 'ᠪᠦᠳᠦᠭᠦᠯᠢᠭ', value: '88' },
]
const zuoyongfangshi = [
  { label: 'ᠬᠦᠨᠳᠦ', value: '1' },
  { label: 'ᠵᠦᠭᠡᠯᠡᠨ', value: '2' },
  { label: 'ᠬᠠᠲᠠᠭᠤ', value: '3' },
  { label: 'ᠪᠦᠯᠢᠶᠡᠨ', value: '4' },
  { label: 'ᠭᠦᠯᠢᠭᠡᠷ', value: '5' },
]

export default {
  components: {},
  data() {
    return {
      laiyuan,
      wuyuan,
      liuwei,
      yaoxing,
      yaoli,
      fenjieyaowei,
      shiqigongxiao,
      gongxiaoleibie,
      zuoyongfangshi,
      
      
      form: this.$form.createForm(this),
      drugId: null,
      drug: {},
    }
  },
  created() {
    this.drugId = this.$route.params.id
    this.getDrug()
  },
  methods: {
    getDrug() {},
    handleSave() {},
    handleCancel() {},
  },
}
</script>

<style lang="less" scoped>
.ss .ant-checkbox{
  vertical-align: baseline;
}
// vertical-align: baseline;
</style>
