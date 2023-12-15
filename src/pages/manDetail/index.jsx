import Head from "../../components/head/index";
import { View, Text, Image } from "@tarojs/components";
import { AtTag, AtRate, AtTabs, AtTabsPane, AtIcon, AtCurtain } from "taro-ui";
import { useState, useEffect } from "react";
import "./index.less";
import Taro, { useRouter } from "@tarojs/taro";
import { manDetail, work, comment } from "../../request/api.js";

export default function Index() {
  const id = useRouter().params.id;

  const [open, setOpen] = useState(false);

  const [detail, setDetail] = useState({});
  const getDetail = async () => {
    const res = await manDetail(null, "?id=" + id);
    setDetail(res.data);
  };

  const [workList, setWorkList] = useState([]);
  const getWorkList = async () => {
    const res = await work(null, "?designer_id=" + id);
    setWorkList(res.data.list);
  };

  const [commentList, setCommentList] = useState([]);
  const getCommentList = async () => {
    const res = await comment(null, "?id=" + id);
    setCommentList(res.data.list);
  };

  const wx = 'chi15927559762'

  useEffect(() => {
    getDetail();
    getWorkList();
    getCommentList();
  }, []);

  const [current, setCurrent] = useState(0);

  return (
    <View>
      <Head name="设计师详情"></Head>

      <View className="man" style="border-bottom: 1px solid #eee;">
        <View className="at-row item">
          <View className="at-col at-col-4">
            <Image
              src={detail.head_img_url}
              style="width: 90%;height: 100px;border-radius: 10px;"
            ></Image>
          </View>
          <View className="at-col at-col-8">
            <View className="cl">
              <Text className="name">{detail.name}</Text>
              {detail.tag &&
                detail.tag.map((v, k) => {
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
              性别: {detail.sex} | 年龄: {detail.age}
            </View>
            <View className="cl">
              客户评分: <AtRate size="14" value={detail.stars} max={5} />
            </View>
            <View className="cl" style="text-wrap: initial;">
              {detail.good}
            </View>
            <View className="cl">
              <Text className="red">{detail.employment_price}￥</Text> / 月
            </View>
          </View>
        </View>
      </View>

      <AtTabs
        current={current}
        tabList={[{ title: "设计作品" }, { title: "客户评价" }]}
        onClick={(e) => {
          setCurrent(e);
        }}
      >
        <View style="padding: 10px 0">
          <AtTabsPane current={current} index={0}>
            <View className="at-row works at-row--wrap at-row__justify--between">
              {workList.map((item, index) => {
                return (
                  <View className="at-col item at-col-6" key={index}>
                    <Image
                      src={item.thumbnail}
                      style="width: 100%;height: 150px"
                    ></Image>
                    <View>
                      <View className="name">{item.name}</View>
                      <View style="display:flex;align-items: center;">
                        <AtIcon value="eye" size="14" color="#999"></AtIcon>
                        <Text style="padding-left: 6px">{item.pv}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            {commentList.map((item, index) => {
              return (
                <View
                  key={index}
                  style="padding: 4px 10px;border-bottom: 1px solid #eee "
                >
                  <View>
                    <View>{item.content}</View>
                  </View>
                  <View style="color: #999">{item.created_at}</View>
                </View>
              );
            })}
          </AtTabsPane>
        </View>
      </AtTabs>

      <View className="buy">
        <View className="money">{detail.employment_price}￥</View>
        <View
          className="btn"
          onClick={() => {
            setOpen(true);
            Taro.setClipboardData({
              data: wx
            })
          }}
        >
          购买
        </View>
      </View>
      <View className="buy1"></View>

      <AtCurtain
        isOpened={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <View className="open">
          <View  style="margin-bottom: 20px;color:green">
            <AtIcon value="check-circle" size="40" color="green"></AtIcon>
            <Text style="margin-left: 5px">复制完成</Text>
          </View>
          <View>微信：{wx}</View>
          <View>添加微信号，为您联系设计师</View>
        </View>
      </AtCurtain>
    </View>
  );
}
