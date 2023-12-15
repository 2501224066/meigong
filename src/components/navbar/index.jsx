import { AtTabBar } from "taro-ui";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";
import { tabList } from "../../util/data.js";

export default function Index() {
  const current = tabList.reduce((init, val, k) => {
    if (useRouter().path.includes(val.url)) init = k;
    return init;
  }, 0);

  return (
    <View>
      <View>
        <AtTabBar
          fixed
          backgroundColor="#fcfcfc"
          color="#999"
          selectedColor="ea6bb8"
          tabList={tabList}
          onClick={(e) => {
            Taro.switchTab({
              url: tabList[e].url,
            });
          }}
          current={current}
        />
      </View>
      <View className="ft"></View>
    </View>
  );
}
