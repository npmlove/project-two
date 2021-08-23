<template>
  <div class="content">
    <!-- 顶部logo模块 -->
    <div class="header">
      <div class="header-img">
        <img class="logo" src="../../style/img/logo.png" />
        <img class="logo-title" src="../../style/img/header-title.png" />
      </div>
      <div class="header-user">登录</div>
    </div>
    <!-- 菜单栏 -->
    <div class="header-menu">
      <ul class="header-menu-list com-width">
        <li @click="menuClick(index)" class="header-menu-content" :class="{headerActive: menuIndex == index}" v-for="(item,index) in menuArr" :key="index">{{item.name}}</li>
      </ul>
    </div>
    <!-- banner -->
    <div class="banner-content">
      <el-carousel class="banner-carousel" :interval="5000" arrow="never">
        <el-carousel-item v-for="(item,index) in bannerArr" :key="index">
          <div class="banner-wrapper" :style="{backgroundImage: 'url('+item.imgUrl+')'}"></div>
        </el-carousel-item>
      </el-carousel>
      <!-- 搜索 -->
      <div class="mod-search">
        <div class="mod-search-top">
          <div class="s_tab">
            <div @click="searchTopClick(index)" v-for="(item,index) in searchTop" :key="index" :class="{s_tab_current: searchTopIndex == index}" class="s_tab_nocurrent">{{item.name}}</div>
          </div>
          <div class="search-box">
            <div v-if="searchTopIndex == 0">
              <div class="search-box-input" style="margin-top: 22px;">
                <div class="search-item">
                  <div class="search-item-input search-item-icon1">
                    <el-input v-model="searchYunDan" class="box-input" type="text" placeholder="输入起飞港"></el-input>
                  </div>
                  <div class="search-item-arrow"></div>
                  <div class="search-item-input search-item-icon3">
                    <el-input v-model="searchYunDan" class="box-input" type="text" placeholder="输入目的港"></el-input>
                  </div>
                </div>
                <el-button class="box-btn" type="primary" icon="el-icon-search">立即查询</el-button>
              </div>
              <div class="search-san-tip">支持城市，港口，三字码输入</div>
            </div>
            <div v-if="searchTopIndex == 1">
              <div class="search-box-input" style="margin-top: 22px;">
                <el-input v-model="searchYunDan" class="box-input box-textarea" type="textarea" resize="none" placeholder="复制粘贴，自动识别关键字，快速获取报价方案。例如  PVG-LAX   4/300/2"></el-input>
                <el-button class="box-btn" type="primary" icon="el-icon-search">立即查询</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="mod-search-bottom com-top30">
          <div class="s_tab s_tab_bak_color">
            <div @click="searchBottomClick(index)" v-for="(item,index) in searchBottom" :key="index" :class="{s_tab_current: searchBottomIndex == index}" class="s_tab_nocurrent">{{item.name}}</div>
          </div>
          <div class="search-box">
            <div v-if="searchBottomIndex == 0" class="search-box-input">
              <el-input v-model="searchYunDan" class="box-input" type="text" placeholder="全网货物跟踪，运单信息全掌握"></el-input>
              <el-button class="box-btn" type="warning" icon="el-icon-search">全网追踪</el-button>
            </div>
            <div v-if="searchBottomIndex == 1" class="search-box-input">
              <el-input v-model="searchYunDan" class="box-input" type="text" placeholder="全网航班查询，航班信息全掌握"></el-input>
              <el-button class="box-btn" type="primary" icon="el-icon-search">立即查询</el-button>
            </div>
            <div class="search-tips">
              <div class="qcode">
                <img src="../../style/img/qcode.png" />
              </div>
              <div class="qcode-text">
                <div class="qcode-text-tips1">关注公众号即可建立自己的<span>运单状态库</span></div>
                <div class="qcode-text-tips2">支持<span>全网全航线</span>运单状态<span>实时推送</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 航班 -->
    <div class="aircraft-route com-width">
      <div class="aircraft-city">
        <ul class="aircraft-city-ul">
          <li class="aircraft-city-li">起运港</li>
          <li @click="cityActiveClick(index)" class="aircraft-city-li" :class="{aircraft_city_li_active: cityIndex == index}" v-for="(item,index) in cityArr" :key="index">{{item.name}}</li>
        </ul>
        <div class="more-arrow" style="font-weight: 100;">更多</div>
      </div>
      <div class="aircraft-group">
        <el-radio-group v-model="aircraftRadio">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">特价航线</el-radio>
          <el-radio :label="2">直达航线</el-radio>
        </el-radio-group>
      </div>
      <div class="aircraft-home-low">
        <div class="home-low-port">
          <ul class="home-low-port-ul">
            <li class="home-low-port-li">目的港</li>
            <li class="home-low-port-li" v-for="(item,index) in portArr" :key="index">
              <el-popover
                popper-class="com-padding15"
                placement="right"
                width="280"
                trigger="hover">
                <ul class="popover-ul-country">
                  <li @click="countyClick(childer.name)" :class="{popover_li_active: countyName == childer.name}" class="popover-ul-country-li" v-for="(childer,childerIndex) in item.childer" :key="childerIndex">{{childer.name}}</li>
                </ul>
                <el-button class="home-low-port-li-btn" slot="reference">{{item.name}}</el-button>
              </el-popover>
            </li>
          </ul>
        </div>
        <div class="home-low-card">
          <div class="home-low-card-div" v-for="(item,index) in 6" :key="index">
            <div class="card-route-label">特价<span>最后2天</span></div>
            <div class="card-name">东方航空</div>
            <div class="card-route">
              <div class="card-route-item">
                <div class="card-route-item-info">
                  <div>PVG</div>
                  <div>上海浦东</div>
                </div>
                <div class="card-route-item-icon">直达</div>
                <div class="card-route-item-info">
                  <div>SGN</div>
                  <div>胡志明市</div>
                </div>
              </div>
              <div class="card-route-tips">
                <div class="card-route-tips-text">1天</div>
                <div class="card-route-tips-text">托盘 散货</div>
              </div>
            </div>
            <div class="card-price">
              <div class="card-price-text"><span>￥30</span><span>/KG起</span></div>
              <div class="card-store">收藏</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 精品航线 -->
    <div class="com-boutique">
      <div class="boutique-content">
        <div class="boutique-title">精品航线<span>BOUTIQUE ROUTE</span></div>
        <div class="boutique-swiper">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div :class="{swiper_card_active: boutiqueIndex == index}" v-for="(item,index) in boutiqueArr" :key="index" class="swiper-slide swiper-card">
                <div @click="boutiqueClick(index)">
                  <div :style="{backgroundImage: 'url('+item.imgUrl+')'}" class="swiper-card-img"></div>
                  <div class="swiper-card-content">
                    <div class="swiper-card-hang">
                      <div class="swiper-card-bb">
                        <div>{{item.qiSan}}</div>
                        <div>{{item.qiName}}</div>
                      </div>
                      <div class="swiper-card-arrow"></div>
                      <div class="swiper-card-bb">
                        <div>{{item.muSan}}</div>
                        <div>{{item.muName}}</div>
                      </div>
                    </div>
                    <div class="swiper-card-hang-tips">{{item.tips}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </div>

    <!-- 产品介绍 -->
    <div class="product-content">
      <div class="boutique-title">产品介绍<span>PRODUCT INTRODUCTION</span></div>
      <div class="product-item">
        <div v-if="productItemIndex == index" v-for="(item,index) in productDetailsArr" :key="index" :class="{product_item_img: productItemIndex == index}" class="product-item-tp">
          <div class="product-item-lf" style="width: 320px;">
            <div class="product-item-num">{{item.num}}</div>
            <div class="product-item-title">{{item.title}}</div>
            <div class="product-item-tip">{{item.tips}}</div>
          </div>
          <div class="product-item-rg">
            <img :src="item.imgUrl"/>
          </div>
        </div>
        <ul class="product-item-ul">
          <li @click="productItemClick(index)" v-for="(item,index) in productItemArr" :key="index" :class="{product_item_ul_li_active: productItemIndex == index}" class="product-item-ul-li">
            <div></div>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 国际货运 -->
    <div class="transport-img"></div>


    <!-- 新闻资讯 -->
    <div class="com-width">
      <div class="boutique-content">
        <div class="boutique-title" style="position: relative;">新闻资讯<span>NEWS RESOURCES</span><div class="more-arrow" style="bottom: 3px;font-weight: 100;">更多</div></div>
        <div class="new-item">
          <div class="new-item-content">
            <div class="new-item-content-img1"></div>
            <div class="new-item-content-total">
              <div class="new-item-content-text">
                <div class="new-item-content-title">回归二十年 内地与香港民航共发展</div>
                <div class="new-item-content-info">从1997到2017，花开花落的20年，岁月如歌的20年。“一国两制”下香港回归的20年，保持了GDP年均实质3.2%的增长速度。... </div>
              </div>
              <div class="new-item-content-date">
                <div>来源：中南局</div>
                <div>2017-07-03 10:50</div>
              </div>
            </div>
          </div>
          <div class="new-item-content">
            <div class="new-item-content-img2"></div>
            <div class="new-item-content-total">
              <div class="new-item-content-text">
                <div class="new-item-content-title">郑州新郑国际机场开通货运航线大盘点</div>
                <div class="new-item-content-info">1997年8月郑州新郑机场建成通航；2012年12月机场二期工程正式开工建设。2013年3月，郑州航空港经济综合实验区上升为国家战略... </div>
              </div>
              <div class="new-item-content-date">
                <div>来源：中南局</div>
                <div>2017-07-03 10:50</div>
              </div>
            </div>
          </div>
        </div>
        <ul class="new-item-ul">
          <li v-for="(item,index) in 8" class="new-item-ul-li">
            <div class="new-item-ul-li-title">
              <div>海南航空积极建设国际物流“空中通道”</div>
              <div>14:19</div>
            </div>
            <div class="new-item-ul-li-content">6月9日凌晨1:10，海航集团旗下海南航空HU797航班装载21.2吨货物从海口美兰……</div>
          </li>
        </ul>
      </div>
    </div>


    <!-- 合作伙伴 -->
    <div class="com-boutique">
      <div class="boutique-content">
        <div class="boutique-title">合作伙伴<span>COOPERATIVE PARTNER</span></div>
        <div class="cooperation-item">
          <ul class="cooperation-item-ul">
            <li class="cooperation-item-ul-li" :style="{backgroundImage: 'url('+item.imgUrl+')'}" v-for="item in cooperAtionArr" :key="item.imgUrl"></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="com-width">
      <ul class="service-ul">
        <li class="service-ul-li" v-for="(item,index) in serviceArr" :key="index">
          <div :style="{backgroundImage: 'url('+item.imgUrl+')'}" class="service-ul-li-img"></div>
          <div>{{item.text}}</div>
        </li>
      </ul>
    </div>

    <!-- 尾部 -->
    <div class="footer">
      <div class="com-width">
        <div class="footer-content">
          <div class="footer-label">
            <div class="footer-cool">
              <span>上海*****科技有限公司  丨  上海市青浦区虹桥世界中心</span>
            </div>
            <div class="footer-ipc">沪ICP备14047000号</div>
          </div>
          <div class="footer-img"><img src="../../style/img/qcode.png" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入插件
  import Swiper from 'swiper'
  export default{
    data() {
      return {
        bannerArr: [
          {
            imgUrl: require("@/style/img/banner.png")
          }
        ],
        menuArr: [
          {
            name: '首页',
            url: ''
          },
          {
            name: '订单跟踪',
            url: ''
          },
          {
            name: '行业咨询',
            url: ''
          },
          {
            name: '关于我们',
            url: ''
          }
        ],
        menuIndex: 0,
        searchTop: [
          {
            name: '智能订舱',
            value: ''
          },
          {
            name: '快捷粘贴',
            value: ''
          }
        ],
        searchTopIndex: 0,
        searchBottom: [
          {
            name: '运单查询',
            value: ''
          },
          {
            name: '航班查询',
            value: ''
          }
        ],
        searchBottomIndex: 0,
        searchYunDan: '',
        cityArr: [
          {
            name: '全部',
            value: ''
          },
          {
            name: '上海市',
            value: ''
          },
          {
            name: '广州市',
            value: ''
          },
          {
            name: '郑州市',
            value: ''
          },
          {
            name: '深圳市',
            value: ''
          },
          {
            name: '北京市',
            value: ''
          },
          {
            name: '昆明市',
            value: ''
          },
          {
            name: '重庆市',
            value: ''
          }
        ],
        cityIndex: 0,
        portArr: [
          {
            name: '亚洲',
            value: '',
            childer: [
              {
                name: '中国'
              },
              {
                name: '日本'
              },
              {
                name: '韩国'
              },
              {
                name: '越南'
              },
              {
                name: '新加坡'
              },
              {
                name: '泰国'
              }
            ]
          },
          {
            name: '北美',
            value: '',
            childer: [
              {
                name: '美国'
              },
              {
                name: '加拿大'
              },
              {
                name: '格陵兰'
              },
              {
                name: '百慕大'
              }
            ]
          },
          {
            name: '欧洲',
            value: '',
            childer: [
              {
                name: '德国'
              },
              {
                name: '英国'
              },
              {
                name: '法国'
              },
              {
                name: '瑞典'
              },
              {
                name: '丹麦'
              },
              {
                name: '波兰'
              },
              {
                name: '挪威'
              }
            ]
          },
          {
            name: '中东',
            value: '',
            childer: [
              {
                name: '沙特'
              },
              {
                name: '伊朗'
              },
              {
                name: '埃及'
              },
              {
                name: '土耳其'
              },
              {
                name: '黎巴嫩'
              },
              {
                name: '约旦'
              }
            ]
          }
        ],
        countyName: '',
        aircraftRadio: 0,
        productItemArr: [
          {
            name: '极速订舱'
          },
          {
            name: '在线报关'
          },
          {
            name: '航班跟踪'
          },
          {
            name: '舱单生成'
          }
        ],
        productDetailsArr: [
          {
            num: '1',
            title: '极速订舱',
            tips: '在线下单，订舱全程可视',
            imgUrl: require('@/style/img/product1_3.png')
          },
          {
            num: '2',
            title: '在线报关',
            tips: '用技术取代人工录单，智能审核把关，在线回执，时效保证',
            imgUrl: require('@/style/img/product2_3.png')
          },
          {
            num: '3',
            title: '航班跟踪',
            tips: '物流轨迹实时追踪，掌握最新动态',
            imgUrl: require('@/style/img/product3_3.png')
          },
          {
            num: '4',
            title: '舱单生成',
            tips: '系统自动校验，快速生成，时效保证',
            imgUrl: require('@/style/img/product4_3.png')
          }
        ],
        productItemIndex: 0,
        boutiqueIndex: 0,
        boutiqueArr: [
          {
            qiSan: 'PVG',
            qiName: '上海浦东',
            muSan: 'LAX',
            muName: '美国洛杉矶',
            tips: '上海直飞胡志明市，4月8号首飞',
            imgUrl: require('@/style/img/hang1.jpg')
          },
          {
            qiSan: 'PVG',
            qiName: '上海浦东',
            muSan: 'LAX',
            muName: '美国洛杉矶',
            tips: '上海直飞胡志明市，4月8号首飞',
            imgUrl: require('@/style/img/hang2.jpg')
          },
          {
            qiSan: 'PVG',
            qiName: '上海浦东',
            muSan: 'LAX',
            muName: '美国洛杉矶',
            tips: '上海直飞胡志明市，4月8号首飞',
            imgUrl: require('@/style/img/hang3.jpg')
          }
        ],
        cooperAtionArr: [
          {
            imgUrl: require('@/style/img/cooperation1.png')
          },
          {
            imgUrl: require('@/style/img/cooperation2.png')
          },
          {
            imgUrl: require('@/style/img/cooperation3.png')
          },
          {
            imgUrl: require('@/style/img/cooperation4.png')
          },
          {
            imgUrl: require('@/style/img/cooperation5.png')
          },
          {
            imgUrl: require('@/style/img/cooperation6.png')
          },
          {
            imgUrl: require('@/style/img/cooperation7.png')
          },
          {
            imgUrl: require('@/style/img/cooperation8.png')
          },
          {
            imgUrl: require('@/style/img/cooperation9.png')
          },
          {
            imgUrl: require('@/style/img/cooperation10.png')
          },
          {
            imgUrl: require('@/style/img/cooperation11.png')
          },
          {
            imgUrl: require('@/style/img/cooperation12.png')
          },
          {
            imgUrl: require('@/style/img/cooperation13.png')
          },
          {
            imgUrl: require('@/style/img/cooperation14.png')
          },
          {
            imgUrl: require('@/style/img/cooperation15.png')
          }
        ],
        serviceArr: [
          {
            text: '航线更多，全球覆盖',
            imgUrl: require('@/style/img/tips_label1.png')
          },
          {
            text: '不加差价，价格更低',
            imgUrl: require('@/style/img/tips_label2.png')
          },
          {
            text: '订单跟踪，实时反馈',
            imgUrl: require('@/style/img/tips_label3.png')
          },
          {
            text: '精致服务，售后无忧',
            imgUrl: require('@/style/img/tips_label4.png')
          }
        ]
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    created() {
      this.initShowBanners()
    },
    mounted() {
      new Swiper ('.swiper-container', {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 20,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
      })
    },
    methods: {
      menuClick(index) {
        this.menuIndex = index
      },
      searchTopClick(index) {
        this.searchTopIndex = index
      },
      searchBottomClick(index) {
        this.searchBottomIndex = index
      },
      cityActiveClick(index){
        this.cityIndex = index
      },
      productItemClick(index){
        this.productItemIndex = index
      },
      boutiqueClick(index) {
        this.boutiqueIndex = index
      },
      countyClick(name) {
        this.countyName = name
      },
      initShowBanners() {
        this.$http.get(this.$service.showBanners).then(data => {
          if(data.code == 200){
            this.roleOpt = data.data
          }
        })
      }

    }
  }
</script>

<style lang="less">
  .content{
    min-width: 1200px;
    margin: 0 auto;
  }
</style>
