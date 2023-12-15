import Navbar from "../../components/navbar/index";
import Head from "../../components/head/index";
import { View, Text, Image } from "@tarojs/components";
import { AtTabs, AtTabsPane, AtIcon } from "taro-ui";
import { useState, useEffect } from "react";
import "./index.less";
import { classify, work } from "../../request/api.js";
import Taro, { useRouter } from "@tarojs/taro";

export default function Index() {
  const id = +useRouter().params.id;

  let [current, setCurrent] = useState(0);

  let [classifyList, setClassifyList] = useState([]);
  const getClassify = async () => {
    const res = await classify(null, "?is_show_icon=1");
    res.data.list.forEach((item) => {
      item.title = item.value;
      item.list = [];
    });
    classifyList = res.data.list;

    if (id)
      classifyList.forEach((item, index) => {
        if (item.id === id) {
          current = index;
          setCurrent(current);
        }
      });
  };

  const getWork = async (index, id) => {
    const res = await work(null, "?category_id=" + id);
    classifyList[index].list = res.data.list;
    console.log(classifyList)
    setClassifyList(classifyList);
  };

  useEffect(() => {
    (async () => {
      await getClassify();
      await getWork(current, classifyList[current].id);
    })();
  }, []);

  return (
    <View>
      <Head></Head>

      <AtTabs
        current={current}
        scroll
        tabList={classifyList}
        onClick={async (e) => {
          await getWork(e, classifyList[e].id);
          setCurrent(e);
        }}
      >
        {classifyList && classifyList.map((item, index) => {
          return (
            <AtTabsPane
              current={current}
              index={index}
              key={index}
            >
              <View className="at-row works at-row--wrap at-row__justify--between">
                {item.list.map((v, k) => {
                  return (
                    <View
                      className="at-col item at-col-6"
                      key={k}
                      onClick={() => {
                        Taro.navigateTo({
                          url: "/pages/manDetail/index?id=" + v.disigner_id,
                        });
                      }}
                    >
                      <Image
                        src={v.thumbnail}
                        style="width: 100%;height: 150px"
                      ></Image>
                      <View className="bt">
                        <View className="name">{v.name}</View>
                        <View style="display:flex;align-items: center;">
                          <AtIcon value="eye" size="14" color="#999"></AtIcon>
                          <Text style="margin-left: 5px">{v.pv}</Text>
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
