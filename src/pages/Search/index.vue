<template>
  <div>
    <TypeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li v-show="searchParams['categoryName']" class="with-x">
              {{ searchParams['categoryName'] }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li v-show="searchParams['keyword']" class="with-x">
              {{ searchParams['keyword'] }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌 面包屑-->
            <li v-if="searchParams['trademark']" class="with-x">
              {{ searchParams['trademark'].split(":")[1] }}
              <i @click="removeTradeMark">×</i>
            </li>
            <!-- 平台的售卖属性值展示-->
            <li v-for="(attrValue, index) in searchParams.props" :key="index" class="with-x">
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @attrInfo="attrInfo" @trademarkInfo="trademarkInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active: isOne}" @click="changeOrder('1')">
                  <a>综合 <span v-show="isOne" :class="{'icon-a-fangxianga0shang': isAsc,'icon-a-fangxianga1xia': isDesc}" 
                  class="iconfont"></span></a>
                </li>
                <li :class="{active: isTwo}" @click="changeOrder('2')">
                  <a>价格 <span v-show="isTwo" :class="{'icon-a-fangxianga0shang': isAsc,'icon-a-fangxianga1xia': isDesc}" 
                  class="iconfont"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li v-for="(good) in goodsList" :key="good.id" class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good['defaultImg']" alt=""/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i> {{ good['price'] }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a 
                    href="item.html" target="_blank" 
                    title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】" 
                    v-html="good['title']"/>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger" href="success-cart.html" target="_blank">加入购物车</a>
                    <a class="sui-btn btn-bordered" href="javascript:void(0);">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页的地方 -->
          <Pagination  :total=total :pageSize=searchParams.pageSize :pageNo=searchParams.pageNo :pagerCount="5" @currentPage="currentPage" />
          <!-- <Pagination :total=60 :pageSize=3 :pageNo=3 :continues="5"/> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import {mapGetters, mapState} from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categoryName: "", //商品的名字
        keyword: "", //用户搜索的关键字
        props: [], //商品属性的搜索条件
        trademark: "", //品牌的搜索条件
        order: "1:desc", //排序的参数 【默认初始值:1:desc】
        pageNo: 1, //当前分页器的页码  【默认初始值:1】
        pageSize: 10, //代表当前一页显示几条数据 【默认初始值:10】
      }
    }
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // 通知vuex发送请求获取数据
      this.$store.dispatch('getSearchList', this.searchParams);
    },
    // 清除商品名字面包屑
    removeCategoryName() {
      // 搜索条件-商品名字清空
      this.searchParams['categoryName'] = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 路由自己跳自己
      if (this.$route.params) {
        this.$router.push({name: "search", params: this.$route.params});
      }
    },
    // 删除关键字
    removeKeyword() {
      //  给服务器带的参数searchParams 的 keyword置空
      this.searchParams.keyword = undefined;
      //  再次发起请求
      this.getData();
      //  通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
      //  进行路由的跳转
      if (this.$route.query) {
        this.$router.push({name: "search", query: this.$route.query});
      }
    },
    //  自定义事件回调
    trademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark['tmId']}:${trademark['tmName']}`;
      this.getData();
    },
    // 删除品牌面包屑
    removeTradeMark() {
      this.searchParams.trademark = undefined;
      //  再次发起请求
      this.getData();
    },
    // 收集平台售卖属性回调 自定义事件回调
    attrInfo(attr, attrValue) {
      //["属性ID:属性值:属性名"]  参数格式整理
      let props = `${attr['attrId']}:${attrValue}:${attr['attrName']}`;
      //  数组去重
      if (this.searchParams.props.indexOf(props) === -1) this.searchParams.props.push(props);
      //  再次发起请求
      this.getData();
    },
    //  删除平台售卖属性面包屑
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      //  再次发起请求
      this.getData();
    },
    //排序操作
    changeOrder(flag) {
      //  flag 形参，他代表用户点击的是综合（1）还是价格（2）由用户点击传递进来的
      let originOrder = this.searchParams.order;
      //  这里获取到的是最开始的状态
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      //  准备一个新order属性
      let newOrder = '';
      //  点击的是综合
      if (flag === originFlag) {
        let sort =(originSort === "desc" ? "asc" : "desc");
        newOrder = `${originFlag}:${sort}`;
      } else {
        newOrder = `${flag}:desc`;
      }
      //  将新的order赋值给searchParams
      this.searchParams.order = newOrder;
      //再次发请求
      this.getData();
    },
    // 自定义事件的回调函数  --- 获取当前页数
    currentPage(pageNo){
      // 整理带给服务器的参数
      this.searchParams.pageNo = pageNo;
      // 再次发送请求
      this.getData();
    }
  },
  computed: {
    //  mapGetter里面的写法 ：传递的数组  因为getters计算没有划分模块 [home, search]
    ...mapGetters(['goodsList']),
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') !== -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1;
    },
    // 获取search模块展示数据的总数
    ...mapState({
      total: (state)=> state.search.searchList.total
    })
  },
  watch: {
    //  监听路由信息是否发生变化，如果发生变化 再次发起请求
    $route() {
      //  每一次请求完毕 应该把相应的1、2、3级分类的ID置空，让他接受下一次的1、2、3级分类ID
      //  再次发送请求之前整理带给服务器的数据
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //  再次发起Ajax请求
      this.getData();
      //  分类名字和关键字不用清理，因为每一次路由变化 都会赋予新值
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // this.searchParams.keyword = "";
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>

