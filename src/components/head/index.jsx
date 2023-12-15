import { AtNavBar, AtMessage } from "taro-ui";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";
import { tabList } from "../../util/data.js";

export default function Index(props) {
  const current = props.name
    ? -1
    : tabList.reduce((init, val, k) => {
        if (useRouter().path.includes(val.url)) init = k;
        return init;
      }, 0);

  return (
    <View>
      <AtMessage />;
      {Taro.getEnv() === "WEB" ? (
        <View>
          <AtNavBar
            fixed
            leftIconType={current === -1 ? "chevron-left" : null}
            onClickLeftIcon={() => {
              if (current === -1) Taro.navigateBack();
            }}
          >
            <View className="nbTitle">
              {props.name || tabList[current].title}
            </View>
          </AtNavBar>
          <View className="tp"></View>
        </View>
      ) : null}
    </View>
  );
}
