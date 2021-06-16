<template>
  <page-header-wrapper>
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-descriptions :column="1">
        
        <a-descriptions-item label="ᠵᠤᠷ ᠎ᠤᠨ ᠨᠡᠷ᠎ᠠ">{{ drug.namem }}</a-descriptions-item>
        <a-descriptions-item label="ᠦᠭᠡᠷ᠎ᠠ ᠨᠡᠷ᠎ᠠ">{{ drug.nameother }}</a-descriptions-item>
        <a-descriptions-item label="ᠺᠢᠷᠢᠯ ᠨᠡᠷ᠎ᠠ">{{ drug.namemn }}</a-descriptions-item>
        <a-descriptions-item label="ᠭᠢᠲᠠᠳ ᠨᠡᠷ᠎ᠠ">{{ drug.namecn }}</a-descriptions-item>
        <a-descriptions-item label="ᠲᠦᠪᠡᠳ ᠨᠡᠷ᠎ᠠ">{{ drug.namez }}</a-descriptions-item>
        
        <a-descriptions-item label="ᠵᠤᠷ ᠎ᠤᠨ ᠡᠮ">{{ drug.drugs }}</a-descriptions-item>
        <a-descriptions-item label="ᠨᠠᠢᠷᠠᠯᠭ᠎ᠠ ᠢᠨ ᠬᠡᠯᠪᠡᠷᠢ">{{ drug.drugcat }}</a-descriptions-item>
        <a-descriptions-item label="ᠦᠢᠯᠡᠳᠦᠯ">{{ drug.effect }}</a-descriptions-item>
        <a-descriptions-item label="ᠵᠠᠰᠠᠬᠤ ᠠᠷᠭ᠎ᠠ">{{ drug.therapymemo }}</a-descriptions-item>
        
        <a-descriptions-item label="ᠴᠢᠳᠠᠮᠵᠢ ᠪᠡᠷ ᠵᠠᠰᠠᠬᠤ">{{ drug.mainEffect }}</a-descriptions-item>
        <!-- <a-descriptions-item label="ᠬᠡᠷᠡᠭᠯᠡᠬᠦ ᠠᠷᠭᠠ"></a-descriptions-item>
        <a-descriptions-item label="ᠬᠡᠷᠡᠭᠯᠡᠬᠦ ᠬᠡᠮᠵᠢᠶᠡ"></a-descriptions-item>
        <a-descriptions-item label="ᠬᠢᠷᠢ ᠬᠡᠮᠵᠢᠶᠡ"></a-descriptions-item>
        <a-descriptions-item label="ᠡᠮ ᠵᠢᠨ ᠬᠦᠯᠭᠡ"></a-descriptions-item> -->
        <!-- <a-descriptions-item label="ᠡᠮᠨᠡᠬᠦ ᠠᠷᠭ᠎ᠠ"></a-descriptions-item> -->
        <a-descriptions-item label="ᠴᠡᠭᠡᠷᠯᠡᠬᠦ">{{ drug.taboo }}</a-descriptions-item>
        <!-- <a-descriptions-item label="ᠡᠮᠲᠦ ᠵᠠᠰᠠᠯᠭ᠎ᠠ"></a-descriptions-item> -->
        <!-- <a-descriptions-item label="ᠭᠤᠷᠪᠠᠨ ᠦᠨᠳᠦᠰᠦᠨ ᠨᠦᠯᠦᠭᠡ">{{ drug.effectCat }}</a-descriptions-item> -->
        <!-- <a-descriptions-item label="ᠠᠷᠪᠠᠨ ᠳᠤᠯᠤᠭᠠᠨ ᠴᠢᠳᠠᠯ">{{ drug.actionMode }}</a-descriptions-item> -->
        <a-descriptions-item label="ᠲᠠᠢᠯᠪᠤᠷᠢ">{{ drug.remark }}</a-descriptions-item>
        <a-descriptions-item label="">
          <div class="chart-wrapper">
            <div>
              <div class="biaotd title">ᠪᠦᠷᠢᠯᠳᠦᠬᠦᠨ</div>
              <div id="burildugun" class="rotatediv chartclass" ></div>
            </div>
          </div>
          <div class="chart-wrapper">
            <div>
              <div>
                <div class="biaotd title">ᠱᠢᠩᠭᠡᠭᠡᠯᠲᠡ᠎ᠶᠢᠨ ᠡᠮᠦᠨᠡᠬᠢ ᠠᠮᠲᠠ</div>
                <div id="sixtast" class="rotatediv chartclass" ></div>
              </div>
              <div>
                <div class="biaotd title">ᠲᠠᠪᠤᠨ ᠮᠠᠬᠠᠪᠤᠳ</div>
                <div id="tastFive" class="rotatediv chartclass" ></div>
              </div>
            </div>
            <div>
              <div>
                <div class="biaotd title">ᠱᠢᠩᠭᠡᠭᠡᠯᠲᠡ᠎ᠶᠢᠨ  ᠰᠡᠭᠦᠯ᠎ᠦᠨ ᠠᠮᠲᠠ</div>
                <div id="threeList" class="rotatediv chartclass" ></div>
              </div>
              <div>
                <div class="biaotd title">ᠲᠠᠪᠤᠨ ᠮᠠᠬᠠᠪᠤᠳ （ ᠱᠢᠩᠭᠡᠭᠡᠯᠲᠡ᠎ᠶᠢᠨ  ᠰᠡᠭᠦᠯ᠎）</div>
                <div id="threetastFive" class="rotatediv chartclass" ></div>
              </div>
            </div>
          </div>
          <div class="chart-wrapper">
            <div>
              <div>
                <div class="biaotd title">ᠠᠷᠪᠠᠨ ᠳᠤᠯᠤᠭᠠᠨ ᠡᠷᠳᠡᠮ</div>
                <div id="seventeenList" class="chartbar" ></div>
              </div>
              <div>
                <div class="biaotd title">ᠦᠯᠡᠳᠡᠬᠦ᠌ ᠠᠷᠪᠠᠨ ᠳᠤᠯᠤᠭᠠᠨ ᠡᠷᠳᠡᠮ</div>
                <div id="seventeenListEnd" class="chartbar" ></div>
              </div>
            </div>
            <div>
              <div>
                <div class="biaotd title">ᠨᠠᠢ᠍ᠮᠠᠨ ᠴᠢᠳᠠᠯ</div>
                <div id="eightList" class="chartbar" ></div>
              </div>
              <div>
                <div class="biaotd title">ᠦᠯᠡᠳᠡᠬᠦ᠌ ᠨᠠᠢ᠍ᠮᠠᠨ ᠴᠢᠳᠠᠯ</div>
                <div id="eightListEnd" class="chartbar" ></div>
              </div>
            </div>
          </div>
          <div class="chart-wrapper">
            <div>
              <div>
                <div class="biaotd title">ᠬᠤᠶᠠᠷ ᠬᠦᠴᠦ᠍</div>
                <div id="twoPowerList" class="rotatediv chartclass" ></div>
              </div>
              <div>
                <div class="biaotd title">ᠬᠤᠶᠠᠷ ᠬᠦᠴᠦ᠍  ᠰᠡᠭᠦᠯ</div>
                <div id="twoPowerListEnd" class="rotatediv chartclass" ></div>
              </div>
            </div>
            <div>
              <div>
                <div class="biaotd title">ᠭᠤᠷᠪᠠᠨ ᠭᠡᠮ᠎ᠢ ᠳᠠᠷᠤᠬᠤ ᠬᠡᠮᠵᠢᠶ᠎ᠡ</div>
                <div id="hxbList" class="rotatediv chartclass" ></div>
              </div>
              <div>
                <div class="biaotd title">ᠭᠤᠷᠪᠠᠨ ᠭᠡᠮ᠎ᠢ ᠳᠠᠷᠤᠬᠤ ᠬᠡᠮᠵᠢᠶ᠎ᠡ</div>
                <div id="hxbListEnd" class="rotatediv chartclass" ></div>
              </div>
            </div>
          </div>
          <div class="chart-wrapper">
            <div>
              <div>
                <div class="biaotd title">ᠬᠤᠷᠢᠨ ᠪᠡᠯᠭᠡ ᠴᠢᠨᠠᠷ᠎ᠢ ᠳᠠᠷᠤᠬᠤ ᠬᠡᠮᠵᠢᠶ᠎ᠡ</div>
                <div id="twentyList" class="chartbar" ></div>
              </div>
              <div>
                <div class="biaotd title">ᠬᠤᠷᠢᠨ ᠪᠡᠯᠭᠡ ᠴᠢᠨᠠᠷ᠎ᠢ ᠳᠠᠷᠤᠬᠤ ᠬᠡᠮᠵᠢᠶ᠎ᠡ</div>
                <div id="twentyListEnd" class="chartbar" ></div>
              </div>
            </div>
          </div>
        </a-descriptions-item>
      </a-descriptions>
    
    <a-modal class="image-preview" :visible="previewVisible" :footer="null" @cancel="handlePreviewCancel">
      <img style="width: 100%" :src="previewImage" />
    </a-modal>
    </a-card>
    <div class="actions">
      <div class="actions-inner">
         <a-button type="primary" @click="handleEdit" :loading="isSubmit">ᠵᠠᠰᠠᠪᠤᠷᠢ ᠤᠷᠤᠭᠤᠯᠬᠤ</a-button>
         <a-button type="primary" @click="handleCancel">ᠪᠤᠴᠠᠬᠤ</a-button>
      </div>
    </div>
  </page-header-wrapper>
</template>

<script>
import * as echarts from 'echarts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components';
import {
    PieChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

import {
  drugDetail,
  uploadImage,
  drugImageList,
  drugImagePreview,
  drugImageRemove
} from '@/api/drug'

import {
  resipeDetail,
  resipeCharts
} from '@/api/resipe'

import {
  getDict
} from '@/api/dict'

const isRotateAxis = navigator.userAgent.indexOf("Firefox") === -1
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
    this.getResipeCharts()
  },
  mounted () {
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
    },
    getResipeCharts () {
      resipeCharts({
        beanId: this.drugId
      })
        .then(res => {
          this.renderCharts(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    renderCharts (res) {
      const { data } = res
      this.setPieburildu(data.burildugun, 'burildugun')
      this.setPieburildu(data.sixtast, 'sixtast')
      this.setPieburildu(data.tastFive, 'tastFive')
      this.setPieburildu(data.threeList, 'threeList')
      this.setPieburildu(data.threetastFive, 'threetastFive')
      this.bar17(data.seventeenList, 'seventeenList')
      this.bar17(data.seventeenListEnd, 'seventeenListEnd')
      this.bar8(data.eightList, 'eightList')
      this.bar8(data.eightListEnd, 'eightListEnd')
      this.setPieburildu(data.twoPowerList, 'twoPowerList')
      this.setPieburildu(data.twoPowerListEnd, 'twoPowerListEnd')
      this.bar20(data.twentyList, 'twentyList')
      this.bar20(data.twentyListEnd, 'twentyListEnd')
      this.setPieburildu(data.hxbList, 'hxbList')
      this.setPieburildu(data.hxbListEnd, 'hxbListEnd')
    },
    setPieburildu (piedata,pieid) {
      const options = {
    		title: {
          text: ''
    		},
        tooltip: {
          trigger: 'item',
          // extraCssText:'writing-mode: tb-lr; -webkit-writing-mode: vertical-lr;-webkit-text-orientation: sideways-right',
    	    textStyle:{
  		      fontSize:16,
            fontFamily:'MQG8200'
    		  },
    		  formatter: '{b0}: {c0}<br />'
        },

        legend: {
    		  show:true,
          right:10,
    		  top: 'bottom',
          bottom: 20,
    		  left:50,
          textStyle: {
    		    fontFamily: "MQG8200"
    		  }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '40%',
            data: [
              ...piedata
            ],
            label:{
							align: 'left',
							rotate:0,
							fontSize:14,
							fontFamily:'MQG8200',
							position:'outside',
							formatter: '{b} {@name}% '
						}
          }
        ],
        labelLine: {
		      smooth: true
				}
      }
      const chart = echarts.init(document.getElementById(pieid))
      chart.setOption(options)
    },
    bar17(seventeenList, domid) {
      const myChart = echarts.init(document.getElementById(domid))
    	var xAxisData=[];
    	var yAxisData=[];
    	if(seventeenList!=null&&seventeenList.length>0){
    		for(var i =0 ;i<seventeenList.length;i++){
    			var obj = seventeenList[i];
    			xAxisData.push(obj.name);
    			yAxisData.push(obj.value);
    		}
    	}
    	var color = ["#1A73E8","#FF4500","#FFD700"]
    	const option = {
    	    tooltip: {
		        trigger: 'item',
    	      extraCssText:'writing-mode: tb-lr; -webkit-writing-mode: vertical-lr;-webkit-text-orientation: sideways-right',
    		    textStyle:{
              fontSize:18,
    		        fontFamily:'MQG8200'
    	      },
  	        formatter: '{b0}: {c0} %<br />'
    		  },
    		  xAxis: {
            axisLabel :{
    		      interval: 0,
    	        rotate: isRotateAxis ? '-90': 0,
              fontSize:'18',
    		      margin:2,
              padding: [0, 0, 0, isRotateAxis ? 0 : 40],
    		      fontFamily:'MQG8200'
    		      },
    		      type: 'category',
    		      data: xAxisData
    		  },
    		  yAxis: {
            type: 'value'
    		  },
    		  series: [{
    		    data: yAxisData,
    	      type: 'bar',
    		    itemStyle:{
              color:function(p){
    		        var colorindex = 0;
    		        var curindex =   p.dataIndex;
    		        if(curindex<5){
    		          colorindex=0;
    		        }else if(curindex>=5&&curindex<11){
    		          colorindex=1;
    		        }else{
    		          colorindex=2;
    		        }
//     		                console.log(p)
    		        return color[colorindex]
    		      }
    		    }
    		  }]
    	};
    	myChart.setOption(option);
    },
    bar8(eightList, domid) {
      const myChart = echarts.init(document.getElementById(domid))
    		var xAxisData=[];
    		var yAxisData=[];
    		if(eightList!=null&&eightList.length>0){
    			for(var i =0 ;i<eightList.length;i++){
    				var obj = eightList[i];
    				xAxisData.push(obj.name);
    				yAxisData.push(obj.value);
    			}
    		}
    		var color = ["#1A73E8","#1A73E8","#FF4500","#FF4500","#FFD700","#FFD700","#FFD700","#FFD700"]
    		const option = {
    		    tooltip: {
    		        trigger: 'item',
    		        extraCssText:'writing-mode: tb-lr; -webkit-writing-mode: vertical-lr;-webkit-text-orientation: sideways-right',
    		        textStyle:{
    		            fontSize:18,
    		            fontFamily:'MQG8200'
    		        },
    		        formatter: '{b0}: {c0} %<br />'
    		    },
    		    xAxis: {
    		        axisLabel :{
    		             interval:0,
    		             rotate: isRotateAxis ? '-90': 0,
    		             fontSize:'18',
    		             margin:10,
                     padding: [0, 0, 0, isRotateAxis ? 0 : 30],
    		             fontFamily:'MQG8200'
    		        },
    		        type: 'category',
    		        data: xAxisData
    		    },
    		    yAxis: {
    		        type: 'value'
    		    },
    		    series: [{
    		        data: yAxisData,
    		        type: 'bar',
    		        itemStyle:{
    		            color:function(p){
    		                return color[ p.dataIndex]
    		            }
    		        }
    		    }]
    		};
    	myChart.setOption(option);
    },
    bar20(datalist,domid){
    		const myChart = echarts.init(document.getElementById(domid))
    		var xAxisData=[];
    		var yAxisData=[];
    		if(datalist!=null&&datalist.length>0){
    			for(var i =0 ;i<datalist.length;i++){
    				var obj = datalist[i];
    				xAxisData.push(obj.name);
    				yAxisData.push(obj.value);
    			}
    		}
    		var color = ["#1A73E8","#FF4500","#FFD700"]
    		const option = {
    		    tooltip: {
    		        trigger: 'item',
    		        extraCssText:'writing-mode: tb-lr; -webkit-writing-mode: vertical-lr;-webkit-text-orientation: sideways-right',
    		        textStyle:{
    		            fontSize:18,
    		            fontFamily:'MQG8200'
    		        },
    		        formatter: '{b0}: {c0} %<br />'
    		    },
    		    xAxis: {
    		        axisLabel :{
    		             interval:0,
    		             rotate: isRotateAxis ? '-90' : 0,
    		             fontSize:'18',
    		             margin:2,
                     padding: [0, 0, 0, isRotateAxis ? 0 : 40],
    		             fontFamily:'MQG8200'
    		        },
    		        type: 'category',
    		        data: xAxisData
    		    },
    		    yAxis: {
    		        type: 'value'
    		    },
    		    series: [{
    		        data: yAxisData,
    		        type: 'bar',
    		        itemStyle:{
    		            color:function(p){
    		                var colorindex = 0;
    		                var curindex =   p.dataIndex;
    		                if(curindex<6){
    		                    colorindex=0;
    		                }else if(curindex>=6&&curindex<13){
    		                    colorindex=1;
    		                }else{
    		                    colorindex=2;
    		                }
//     		                console.log(p)
    		                return color[colorindex]
    		            }
    		        }
    		    }]
    		};
    		
    		myChart.setOption(option);
    	}
  }
}

</script>


<style lang="less" scoped>

.ant-card {
  writing-mode: vertical-lr;;
  width: 98%;
  height: 93vh;
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
/deep/ .actions {
  position: absolute;
  right: -5vh;
  margin-top: 20px;
  float: right;
  width: 20px;
}
/deep/ .ant-page-header-content {
  overflow: auto;
}
// /deep/ .ant-descriptions {
//   zoom:0.8;
// }
/deep/ .ant-descriptions-row > td {
  display: grid;
}
.ant-btn {
  margin-bottom: 20px;
  
}
/deep/ .ant-pro-grid-content {
}

.ant-pro-page-header-wrap-content {
  height: 100%;
}

.ant-page-header-heading {
  width: 32px;
}
/deep/ .ant-page-header.has-breadcrumb {
  height: 100%;
  padding-right: 12px;
}

/deep/ tbody > tr > td > span {
  font-size: 2vh;
  overflow-wrap: break-word;
}

/deep/ .ant-pro-page-header-wrap-page-header-warp {
  width: 7vh;
  
  .ant-descriptions-row {
    padding: 0 10px;
    display: block;

  .ant-descriptions-item-content {
      // margin-top: 30px;
      height: 87vh;
      white-space: break-spaces;
    }
  }
  .ant-descriptions-row {
    &:last-child td{
      display: table-cell;
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
/deep/ .ant-pro-page-header-wrap-page-header-warp .ant-descriptions-row .ant-descriptions-item-no-label + .ant-descriptions-item-content{
  margin-top: 0px;
}

.rotatediv{
	transform:rotate(90deg);
	-ms-transform:rotate(90deg); 	/* IE 9 */
	-moz-transform:rotate(90deg); 	/* Firefox */
	-webkit-transform:rotate(90deg); /* Safari 和 Chrome */
	-o-transform:rotate(90deg); 	/* Opera */
}

.biaotd{
	-moz-writing-mode: vertical-lr;
	writing-mode: vertical-lr;
	-webkit-writing-mode: vertical-lr;
	-o-writing-mode: vertical-lr;
	-ms-writing-mode: tb-lr;
	writing-mode: tb-lr;
	-webkit-text-orientation: sideways-right;
	text-orientation: sideways-right;
	height: 300px;
}
.title{
	text-align: center;
	font-size: 2vh;
}
.chartclass{
	width: 40vh;
	height:40vh;
}
.chartbar{
	width: 60vh;
	height:40vh;
  writing-mode: vertical-lr;
}
.chart-wrapper {
  display: flex;
  .chartclass {
    writing-mode:horizontal-tb;
  }
}
@media screen and(-ms-high-contrast:active),(-ms-high-contrast:none){
  .chart-wrapper .chartclass {
    -ms-writing-mode:tb-lr !important
  }
  }
</style>