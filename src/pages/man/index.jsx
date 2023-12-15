import Navbar from "../../components/navbar/index";
import Head from "../../components/head/index";
import { View, Text, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtTag, AtRate, AtInput, AtButton } from "taro-ui";
import { useState, useEffect } from "react";
import "./index.less";
import { classify, man } from "../../request/api.js";
import Taro from "@tarojs/taro";

export default function Index() {
  const [current, setCurrent] = useState(0);

  const [word, setWord] = useState("");

  let [classifyList, setClassifyList] = useState([]);
  const getClassify = async () => {
    const res = await classify(null, "?is_show_icon=1");
    res.data.list.forEach((item) => {
      item.title = item.value;
      item.list = [];
    });
    res.data.list.push({ title: "全部", list: [] });
    classifyList = res.data.list;
  };

  const getMan = async (index, id, word = "") => {
    const res = await man(
      null,
      "?is_show_icon=1&category_id=" + id + "&keyword=" + word
    );
    classifyList[index].list = res.data.list;
    setClassifyList(classifyList);
  };

  useEffect(() => {
    (async () => {
      await getClassify();
      await getMan(0, classifyList[0].id);
    })();
  }, []);

  return (
    <View>
      <Head></Head>

      <AtInput
        name="value"
        type="text"
        placeholder="设计师名称"
        value={word}
        onChange={(e) => setWord(e)}
      >
        <View style="width: 60px;padding: 0 20px">
          <AtButton
            type="secondary"
            size="small"
            circle
            onClick={async () => {
              await getMan(classifyList.length - 1, null, word);
              if (current != classifyList.length - 1)
                setCurrent(classifyList.length - 1);
            }}
          >
            搜索
          </AtButton>
        </View>
      </AtInput>

      <AtTabs
        current={current}
        scroll
        tabDirection="vertical"
        height="530px"
        tabList={classifyList}
        onClick={async (e) => {
          setWord("");
          await getMan(e, classifyList[e].id);
          setCurrent(e);
        }}
      >
        {classifyList &&
          classifyList.map((item, index) => {
            return (
              <AtTabsPane
                tabDirection="vertical"
                current={current}
                index={index}
                key={index}
              >
                <View className="man">
                  {item.list.map((v, k) => {
                    return (
                      <View
                        className="at-row item"
                        key={k}
                        onClick={() => {
                          Taro.navigateTo({
                            url: "/pages/manDetail/index?id=" + v.id,
                          });
                        }}
                      >
                        <View className="at-col at-col-4">
                          <Image
                            src={v.head_img_url}
                            style="width: 90%;height: 80px;border-radius: 200px"
                          ></Image>
                        </View>
                        <View className="at-col at-col-8">
                          <View className="cl">
                            <Text className="name">{v.name}</Text>
                            {v.tag.map((i, a) => {
                              return (
                                <AtTag
                                  key={a}
                                  className="mr"
                                  type="primary"
                                  active
                                  size="small"
                                >
                                  {i}
                                </AtTag>
                              );
                            })}
                          </View>
                          <View className="cl">
                            <AtRate size="14" value={v.stars} max={5} />
                          </View>
                          <View className="cl">
                            雇佣次数: {v.sell_num}
                            <AtTag className="mr" size="small" circle active>
                              {v.level}
                            </AtTag>
                          </View>
                          <View className="cl">
                            <Text className="red">{v.employment_price}￥</Text>{" "}
                            / 月
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </AtTabsPane>
            );
          })}
      </AtTabs>

      <Navbar />
    </View>
  );
}
