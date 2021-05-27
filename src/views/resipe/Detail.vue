<template>
  <page-header-wrapper>
    <template v-slot:content>
      <a-descriptions :column="1">
        <a-descriptions-item label="ᠮᠤᠨᠭᠭᠤᠯ ᠨᠡᠷ ᠡ">{{ drug.namem }}</a-descriptions-item>
        <a-descriptions-item label="ᠪᠤᠰᠤᠳ ᠨᠡᠷ ᠡ">{{ drug.nameother }}</a-descriptions-item>
        <a-descriptions-item label="ᠺᠢᠷᠢᠯ ᠨᠡᠷ᠎ᠠ">{{ drug.namemn }}</a-descriptions-item>
        <a-descriptions-item label="ᠭᠢᠲᠠᠳ ᠨᠡᠷ᠎ᠠ">{{ drug.namecn }}</a-descriptions-item>
        <a-descriptions-item label="ᠲᠦᠪᠡᠳ ᠨᠡᠷ᠎ᠠ">{{ drug.namez }}</a-descriptions-item>

        <a-descriptions-item label="ᠴᠢᠳᠠᠯ">{{ drug.effect }}</a-descriptions-item>
        <a-descriptions-item label="ᠵᠠᠰᠠᠬᠤ ᠠᠷᠭᠠ">{{ drug.therapymemo }}</a-descriptions-item>
        
        <a-descriptions-item label="ᠭᠤᠤᠯᠯᠠᠨ ᠵᠠᠰᠠᠬᠤ ᠴᠢᠲᠠᠪᠦᠷᠢ">{{ drug.mainEffect }}</a-descriptions-item>
        <a-descriptions-item label="ᠬᠡᠷᠡᠭᠯᠡᠬᠦ ᠠᠷᠭᠠ"></a-descriptions-item>
        <a-descriptions-item label="ᠬᠡᠷᠡᠭᠯᠡᠬᠦ ᠬᠡᠮᠵᠢᠶᠡ"></a-descriptions-item>
        <a-descriptions-item label="ᠬᠢᠷᠢ ᠬᠡᠮᠵᠢᠶᠡ"></a-descriptions-item>
        <a-descriptions-item label="ᠡᠮ ᠵᠢᠨ ᠬᠦᠯᠭᠡ"></a-descriptions-item>
        <a-descriptions-item label="ᠨᠠᠢᠷᠠᠯᠭ᠎ᠠ ᠢᠨ ᠬᠡᠯᠪᠡᠷᠢ">{{ drug.drugcat }}</a-descriptions-item>
        <a-descriptions-item label="ᠡᠮᠨᠡᠬᠦ ᠠᠷᠭ᠎ᠠ"></a-descriptions-item>
        <a-descriptions-item label="ᠴᠡᠭᠡᠷᠯᠡᠬᠦ">{{ drug.taboo }}</a-descriptions-item>
        <a-descriptions-item label="ᠡᠮᠲᠦ ᠵᠠᠰᠠᠯᠭ᠎ᠠ"></a-descriptions-item>
        <a-descriptions-item label="ᠵᠣᠷ ᠤᠨ ᠡᠮ">{{ drug.drugs }}</a-descriptions-item>
        <a-descriptions-item label="ᠭᠤᠷᠪᠠᠨ ᠦᠨᠳᠦᠰᠦᠨ ᠨᠦᠯᠦᠭᠡ">{{ drug.effectCat }}</a-descriptions-item>
        <a-descriptions-item label="ᠠᠷᠪᠠᠨ ᠳᠤᠯᠤᠭᠠᠨ ᠴᠢᠳᠠᠯ">{{ drug.actionMode }}</a-descriptions-item>
        <a-descriptions-item label="ᠲᠠᠢᠯᠪᠤᠷᠢ">{{ drug.remark }}</a-descriptions-item>
        <a-descriptions-item>
          <a-button type="primary" @click="handleEdit">ᠵᠠᠰᠠᠪᠤᠷᠢ ᠤᠷᠤᠭᠤᠯᠬᠤ</a-button>
          <a-button type="primary" @click="handleCancel">ᠪᠤᠴᠠᠬᠤ</a-button>
        </a-descriptions-item>
      </a-descriptions>
    </template>
    <a-modal class="image-preview" :visible="previewVisible" :footer="null" @cancel="handlePreviewCancel">
      <img style="width: 100%" :src="previewImage" />
    </a-modal>
  </page-header-wrapper>
</template>

<script>

import {
  drugDetail,
  uploadImage,
  drugImageList,
  drugImagePreview,
  drugImageRemove
} from '@/api/drug'

import {
  resipeDetail
} from '@/api/resipe'

import {
  getDict
} from '@/api/dict'

export default {
  components: {
  },
  data() {
    return {
      drugId: null,
      drug: {},
      images: [],
      previewVisible: false,
      previewImage: '',
      drugCategory: []
    };
  },
  created() {
    this.drugId = this.$route.params.id
    this.setDict('M101', 'drugCategory')
    this.getObject()
    // this.getImageList()
  },
  methods: {
    async setDict (key, prop) {
      const result = await getDict(key)
      console.log(result)
      this[prop] = result.data.map(ds => {
        return {
          label: ds.namem,
          value: ds.dictid
        }
      })
    },
    getObject () {
      resipeDetail({
        beanId: this.drugId
      })
        .then(res => {
          console.log(res)
          const { resipe, resipeDrugList } = res.data
          const drug = {
            drugcat: this.drugCategory.filter(c =>  c.value === resipe.drugcat)[0].label,
            namecn: resipe.namecn,
            namem: resipe.namem,
            namemn: resipe.namemn,
            nameother: resipe.nameother,
            namez: resipe.namez,
            effect: resipe.effect,
            mainEffect: resipe.mainEffect,
            drugs: resipeDrugList.map(d => d.namem).join(', '),
            therapymemo: resipe.therapymemo,
            taboo: resipe.taboo,
            remark: resipe.remark
          }
          this.drug = drug
        })
    },
    getImageList () {
      drugImageList({
        beanId: this.drugId
      })
        .then(res => {
          const tmp = res.data
          tmp.forEach(t => {
            t.thumb = ''
          })
          this.images = tmp
          this.refreshImages()
        })
        .catch(err => {
        })
    },
    refreshImages () {
      const { images } = this
      images.forEach((img, index) => {
        drugImagePreview({
          beanId: img.imgidthumb
        })
          .then(res => {
            const src = 'data:image/png;base64,' +
              btoa(
                new Uint8Array(res).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              )
            images[index].thumb = src
          })
          .catch(err => {})
      })
    },
    handleEdit () {
      this.$router.push({
        name: 'ResipeEdit',
        params: {
          id: this.drugId
        }
      })
    },
    /**
     * 上传之前检测文件是否标准
     */
    beforeUpload (file) {
      if (['image/png'].indexOf(file.type) === -1) {
        this.$message.error('图片格式错误')
        return false
      }
      return true
    },
    customUploadRequest (info) {
      const formData = new FormData()
      formData.append('beanId', this.drugId)
      formData.append('drugimg', info.file)
      uploadImage(formData)
        .then(res => {
          this.$message.success('Success')
          this.getImageList()
        })
        .catch(err => {
          this.$message.error(err.message)
        }) 
    },
    handleImageRemove (idx) {
      const { images } = this
      drugImageRemove({
        beanId: images[idx].imgid
      })
        .then(res => {
          this.$message.success('Success')
          this.getImageList()
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    handlePreview (idx) {
      const { images } = this
      this.previewImage = images[idx].thumb
      drugImagePreview({
        beanId: images[idx].imgid
      })
        .then(res => {
          const src = 'data:image/png;base64,' +
            btoa(
              new Uint8Array(res).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            )
          this.previewImage = src
        })
        .catch(err => {})
      this.previewVisible = true
    },
    handlePreviewCancel () {
      this.previewVisible = false
    },
    handleCancel() {
      this.$router.go(-1)
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
.images-wrapper {
  display: flex;
  align-items: center;

  .image {
    margin-bottom: 15px;

    img {
      width:60px;
      height: 60px;
    }
    .remove {
      font-size: 14px;
      padding: 5px;
    }
  }
}
.image-preview {
  /deep/ .ant-modal-content {
    writing-mode: initial;
  }
}

</style>