<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">

      <a-descriptions :column="1">
        <a-descriptions-item label="ᠡᠮ ᠊ᠤᠨ ᠵᠢᠷᠤᠭ">
          <div class="images-wrapper">
            <div v-for="(img, index) in images" :key="img.imgid" class="image">
              <img
                :src="img.thumb"
                @click="handlePreview(index)"
              />
              <a-popconfirm okText="ᠲᠡᠢᠮᠦ ᠡ" cancelText="ᠦᠭᠡᠢ" @confirm="handleImageRemove(index)" title="ᠡᠨᠡ ᠵᠢᠷᠤᠭ ᠊ᠢ ᠠᠷᠢᠯᠭᠠᠬᠤ ᠊ᠤᠤ?">
                <a class="remove">x</a>
              </a-popconfirm>

            </div>
            <a-upload
              :multiple="false"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              :custom-request="customUploadRequest"
            >
              <a-button class="upup"><a-icon type="upload" block/>ᠵᠢᠷᠤᠭ ᠤᠷᠤᠭᠤᠯᠬᠤ</a-button>
            </a-upload>
          </div>
        </a-descriptions-item>
        <a-descriptions-item label="ᠮᠤᠨᠭᠭᠤᠯ ᠨᠡᠷ᠎ᠡ">{{ drug.namem }}</a-descriptions-item>
        <a-descriptions-item label="ᠥᠭᠡᠷ᠎ᠡ ᠨᠡᠷ᠎ᠡ">{{ drug.nameother }}</a-descriptions-item>
        <a-descriptions-item label="ᠺᠢᠷᠢᠯ ᠨᠡᠷ᠎ᠠ">{{ drug.namemn }}</a-descriptions-item>
        <a-descriptions-item label="ᠬᠢᠲᠠᠳ ᠨᠡᠷ᠎ᠡ">{{ drug.namecn }}</a-descriptions-item>
        <a-descriptions-item label="ᠲᠦᠪᠡᠳ ᠨᠡᠷ᠎ᠡ">{{ drug.namez }}</a-descriptions-item>
        <a-descriptions-item label="ᠢᠷᠡᠯᠳᠡ">{{ drug.source }}</a-descriptions-item>
        <a-descriptions-item label="ᠲᠠᠪᠤᠨ ᠮᠠᠬᠠᠪᠤᠳ">{{ drug.five }}</a-descriptions-item>
        <a-descriptions-item label="ᠵᠢᠷᠭᠤᠭᠠᠨ ᠠᠮᠳᠠ">{{ drug.sixTaste }}</a-descriptions-item>
        <a-descriptions-item label="ᠴᠢᠨᠠᠷ">{{ drug.drugProperty }}</a-descriptions-item>
        <a-descriptions-item label="ᠨᠠᠢᠮᠠᠨ ᠴᠢᠳᠠᠯ">{{ drug.drugPower }}</a-descriptions-item>
        <a-descriptions-item label="ᠰᠢᠨᠭᠭᠡᠯᠲᠡ ᠵᠢᠨ ᠰᠡᠭᠦᠯ ᠊ᠤᠨ ᠠᠮᠲᠠ">{{ drug.decomposedTaste }}</a-descriptions-item>
        <a-descriptions-item label="ᠠᠷᠪᠠᠨ ᠳᠤᠯᠤᠭᠠᠨ ᠡᠷᠳᠡᠮ">{{ drug.seventeenEffect }}</a-descriptions-item>
        <a-descriptions-item label="ᠰᠢᠨᠭᠭᠡᠯᠳᠡ ᠵᠢᠨ ᠰᠡᠭᠦᠯ ᠊ᠤᠨ ᠡᠷᠳᠡᠮ">{{ drug.decomEffect }}</a-descriptions-item>
        <a-descriptions-item label="ᠮᠦᠨ ᠴᠢᠨᠠᠷ ᠊ᠤᠨ ᠴᠢᠳᠠᠯ">{{ drug.baseEffect }}</a-descriptions-item>
        <a-descriptions-item label="ᠭᠤᠤᠯᠳᠠᠭᠤ ᠵᠠᠰᠠᠬᠤ">{{ drug.baseFix }}</a-descriptions-item>
        <a-descriptions-item label="ᠢᠯᠭᠠᠯ">{{ drug.effectCat }}</a-descriptions-item>
        <a-descriptions-item label="ᠦᠢᠯᠡᠳᠦᠯ ᠦᠵᠡᠭᠦᠯᠬᠦ ᠬᠡᠯᠪᠡᠷᠢ">{{ drug.actionMode }}</a-descriptions-item>
        <a-descriptions-item label="ᠲᠠᠢᠯᠪᠤᠷᠢ">{{ drug.remark }}</a-descriptions-item>
        <a-descriptions-item class="activebtn">
          <a-button type="primary" @click="handleEdit">ᠵᠠᠰᠠᠪᠤᠷᠢ ᠤᠷᠤᠭᠤᠯᠬᠤ</a-button>
          <a-button type="primary" @click="handleCancel">ᠪᠤᠴᠠᠬᠤ</a-button>
        </a-descriptions-item>
      </a-descriptions>

      <a-modal class="image-preview" :visible="previewVisible" :footer="null" @cancel="handlePreviewCancel">
        <img style="width: 100%" :src="previewImage" />
      </a-modal>
    </a-card>
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
  data () {
    return {
      drugId: null,
      drug: {},
      images: [],
      previewVisible: false,
      previewImage: ''
    }
  },
  created () {
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
            nameother: data.drug.nameother,
            namemn: data.drug.namemn,
            namecn: data.drug.namecn,
            namez: data.drug.namez,
            remark:data.drug.remark,
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
            actionMode: data.actionMode.filter(d => d.checkflag === '1').map(d => d.namem).join(', ')
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

.upup {
  position: absolute;
  right: -30px;
  top: 10px;
}

/deep/ .ant-pro-page-header-wrap-children-content {
  position: relative;
}
.ant-card {
  writing-mode: vertical-lr;;
  width: 100%;
  height: 100%;
  position: absolute;
  /deep/ .ant-card-body {
    width: 100%;
    height: 100%;
    overflow-x: overlay;
    tbody {

      display: grid;
      grid-row-gap:30px;
      height: 100%;;
    }
    tbody > tr > td {
      display: grid;
      height: 100%;
    }
    tbody > tr > td > span {
      font-size: 2vh;
      height: 86vh;
      overflow-wrap: break-word;
    }
  }
}
/deep/ .ant-page-header-content {
  height: 90vh;
}

/deep/ .ant-pro-page-header-wrap-page-header-warp {

  .ant-descriptions-item > span {
    font-size: 2vh;
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

  align-items: center;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .image {
    margin: 10px;
    background: #ffffff;

    img {
      display: flex;
      width:60px;
      height: 60px;;
    }

    .remove {
      color:#ff4d4f;
      font-size: 17px;
      padding: 5px;
    }
  }
}
.image-preview {
  /deep/ .ant-modal-content {
    writing-mode: initial;
  }
}
@-moz-document url-prefix() {
.ant-descriptions-row:last-child > td > span{
    display: grid;
    grid-auto-flow: column;
    height: 2vh !important;
}
}
</style>
