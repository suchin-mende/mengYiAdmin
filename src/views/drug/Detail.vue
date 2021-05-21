<template>
  <page-header-wrapper>
    <template v-slot:content>
      <a-descriptions :column="1">
        <a-descriptions-item label="药品图片">
          <div class="images-wrapper">
            <div v-for="(img, index) in images" :key="img.imgid" class="image">
              <img
                :src="img.thumb"
                @click="handlePreview(index)"
              />
              <a-popconfirm @confirm="handleImageRemove(index)" title="确定要删除该图片吗？">
                <span class="remove">x</span>
              </a-popconfirm>
              
            </div>
            <a-upload
              :multiple="false"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              :custom-request="customUploadRequest"          
            >
              <a-button><a-icon type="upload" block/>上传</a-button>
            </a-upload>
          </div>
        </a-descriptions-item>
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

export default {
  components: {
  },
  data() {
    return {
      drugId: null,
      drug: {},
      images: [],
      previewVisible: false,
      previewImage: ''
    };
  },
  created() {
    this.drugId = this.$route.params.id
    this.getDrug()
    this.getImageList()
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
        name: 'DrugEdit',
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
    }
  }
}

</script>

<style lang="less" scoped>

/deep/ .ant-pro-page-header-wrap-page-header-warp {
  width: 100%;
  
  .ant-descriptions-item > span {
    font-size: 20px;
  }
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