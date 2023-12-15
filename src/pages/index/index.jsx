import Navbar from "../../components/navbar/index";
import Head from "../../components/head/index";
import { AtGrid, AtNoticebar, AtTag, AtRate, AtIcon } from "taro-ui";
import { Swiper, SwiperItem, View, Image, Text } from "@tarojs/components";
import "./index.less";
import { banner, classify, man, work } from "../../request/api.js";
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

export default function Index() {
  const [bannerList, setBannnerList] = useState([]);
  const getBanner = async () => {
    const res = await banner();
    setBannnerList(res.data.list);
  };

  const [classifyList, setClassifyList] = useState([]);
  const getClassify = async () => {
    const res = await classify(null, "?is_show_icon=1");
    setClassifyList(res.data.list);
  };

  const [manList, setManList] = useState([]);
  const getMan = async () => {
    const res = await man(null, "?is_show_icon=1");
    setManList(res.data.list);
  };

  const [workList, setWorkList] = useState([]);
  const getWork = async () => {
    const res = await work();
    setWorkList(res.data.list);
  };

  useEffect(() => {
    getBanner();
    getClassify();
    getMan();
    getWork();
  }, []);

  return (
    <View className="home">
      <Head></Head>

      <Swiper
        className="sp"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        {bannerList.map((item, index) => {
          return (
            <SwiperItem key={index}>
              <View className="spItem">
                <Image src={item.image}></Image>
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>

      <AtGrid
        className="gd"
        columnNum={5}
        hasBorder={false}
        data={classifyList}
        onClick={(e) => {
          Taro.switchTab({
            url: "/pages/works/index?id=" + e.id,
          });
        }}
      />

      <AtNoticebar icon="volume-plus" marquee>
        寻找资深设计师，完成您满意的产品，深入市场获得盈利
      </AtNoticebar>

      <View className="content">
        <View className="title">
          <AtIcon size="14" value="bookmark" color="#000"></AtIcon>
          设计师
        </View>

        <View className="man">
          {manList.map((item, index) => {
            return (
              <View
                className="at-row item"
                key={index}
                onClick={() => {
                  Taro.navigateTo({
                    url: "/pages/manDetail/index?id=" + item.id,
                  });
                }}
              >
                <View className="at-col at-col-4">
                  <Image
                    src={item.head_img_url}
                    style="width: 90%;height: 100px;border-radius: 10px;"
                  ></Image>
                </View>
                <View className="at-col at-col-8">
                  <View className="cl">
                    <Text className="name">{item.name}</Text>
                    {item.tag.map((v, k) => {
                      return (
                        <AtTag
                          key={k}
                          className="mr"
                          type="primary"
                          active
                          size="small"
                        >
                          {v}
                        </AtTag>
                      );
                    })}
                  </View>
                  <View className="cl">
                    <AtRate size="14" value={item.stars} max={5} />
                  </View>
                  <View className="cl">
                    雇佣次数: {item.sell_num}
                    <AtTag className="mr" size="small" circle active>
                      {item.level}
                    </AtTag>
                  </View>
                  <View className="cl">
                    <Text className="red">{item.employment_price}￥</Text> / 月
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View className="title">
          <AtIcon size="14" value="bookmark" color="#000"></AtIcon>
          作品
        </View>

        <View className="at-row works at-row--wrap at-row__justify--between">
          {workList.map((item, index) => {
            return (
              <View
                className="at-col item at-col-6"
                key={index}
                onClick={() => {
                  Taro.navigateTo({
                    url: "/pages/manDetail/index?id=" + item.disigner_id,
                  });
                }}
              >
                <Image
                  src={item.thumbnail}
                  style="width: 100%;height: 150px"
                ></Image>
                <View className="bt">
                  <View className="name">{item.name}</View>
                  <View style="display:flex;align-items: center;">
                    <AtIcon value="eye" size="14" color="#999"></AtIcon>
                    <Text style="margin-left: 5px">{item.pv}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <Navbar />
    </View>
  );
}
