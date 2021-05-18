<template>
  <page-header-wrapper>
    <template v-slot:content>
      <a-descriptions :column="1">
        <a-descriptions-item label="ᠥᠭᠡᠷᠡ ᠨᠡᠷᠡ">{{ drug.namem }}</a-descriptions-item>
        <a-descriptions-item label="ᠢᠷᠡᠯᠳᠡ">{{ drug.source }}</a-descriptions-item>
        <a-descriptions-item label="ᠲᠠᠪᠤᠨ ᠮᠠᠬᠠᠪᠤᠳ">{{ drug.five }}</a-descriptions-item>
        <a-descriptions-item label="ᠵᠢᠷᠭᠤᠭᠠᠨ ᠠᠮᠳᠠ">{{ drug.sixTaste }}</a-descriptions-item>
        <a-descriptions-item label="ᠡᠮ ᠢᠨ ᠴᠢᠨᠠᠷ">{{ drug.drugProperty }}</a-descriptions-item>
        <a-descriptions-item label="ᠡᠮ ᠢᠨ ᠴᠢᠳᠠᠯ">{{ drug.drugPower }}</a-descriptions-item>
        <a-descriptions-item label="ᠡᠮ ᠢᠨ ᠠᠮᠳᠠ ᠢᠡᠷ ᠵᠠᠳᠠᠯᠬᠤ">{{ drug.decomposedTaste }}</a-descriptions-item>
        <a-descriptions-item label="ᠠᠷᠪᠠᠨ ᠳᠤᠯᠤᠭᠠᠨ ᠴᠢᠳᠠᠯ">{{ drug.seventeenEffect }}</a-descriptions-item>
        <a-descriptions-item label="ᠡᠮ ᠢᠨ ᠴᠢᠳᠠᠯ ᠢᠡᠷ ᠵᠠᠳᠠᠯᠬᠤ">{{ drug.decomEffect }}</a-descriptions-item>
        <a-descriptions-item label="ᠡᠮ ᠢᠨ ᠴᠢᠳᠠᠯ ᠢᠨ ᠬᠡᠪ ᠴᠢᠨᠠᠷ">{{ drug.baseEffect }}</a-descriptions-item>
        <a-descriptions-item label="ᠭᠤᠤᠯᠯᠠᠨ ᠵᠠᠰᠠᠬᠤ ᠡᠪᠡᠳᠴᠢᠨ">{{ drug.baseFix }}</a-descriptions-item>
        <a-descriptions-item label="ᠴᠢᠳᠠᠯ ᠢᠨ ᠬᠡᠯᠪᠡᠷᠢ">{{ drug.effectCat }}</a-descriptions-item>
        <a-descriptions-item label="ᠦᠢᠯᠡᠳᠦᠯ ᠦᠵᠡᠭᠦᠯᠬᠦ ᠬᠡᠯᠪᠡᠷᠢ">{{ drug.actionMode }}</a-descriptions-item>
        <a-descriptions-item>
          <a-button type="primary" @click="handleEdit">修改</a-button>
        </a-descriptions-item>
      </a-descriptions>
    </template>
  </page-header-wrapper>
</template>

<script>

import {
  drugDetail
} from '@/api/drug'

export default {
  components: {
  },
  data() {
    return {
      drugId: null,
      drug: {}
    };
  },
  created() {
    this.drugId = this.$route.params.id
    this.getDrug()
  },
  methods: {
    getDrug () {
      drugDetail({
        beanId: this.drugId
      })
        .then(res => {
          const { data } = res
          const drug = {
            namem: data.drug.namem,
            source: data.drugSource.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            five: data.fiveElement.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            sixTaste: data.sixTaste.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            drugProperty: data.drugProperty.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            drugPower: data.drugPower.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            decomposedTaste: data.decomposedTaste.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            seventeenEffect: data.seventeenEffect.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            decomEffect: data.drug.decomEffect,
            baseEffect: data.drug.baseEffect,
            baseFix: data.drug.baseFix,
            effectCat: data.effectCat.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
            actionMode: data.actionMode.filter(d => d.checkflag === '1').map(d => d.namem).join(', '),
          }
          this.drug = drug
        })
    },
    handleEdit () {
      this.$router.push({
        name: 'DrugEdit',
        params: {
          id: this.drugId
        }
      })
    }
  }
}

</script>

<style lang="less" scoped>
/deep/ .ant-pro-page-header-wrap-page-header-warp {
  width: 100%;
  .ant-descriptions-row {
    padding: 0 10px;
    display: block;

  .ant-descriptions-item-content {
      margin-top: 30px;
    }
  }
  .ant-descriptions-row {
    &:last-child {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>