import Navbar from "../../components/navbar/index";
import Head from "../../components/head/index";
import { View } from "@tarojs/components";
import { AtAvatar, AtIcon, AtGrid } from "taro-ui";

export default function Index() {
  return (
    <View>
      <Head></Head>

      <View
        style="padding:40px 0;font-size: 14px;background: #ffd89b;"
        className="at-row at-row__justify--center"
      >
        <View className="at-col-2">
          <AtAvatar
            size="large"
            circle
            image="http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg"
          ></AtAvatar>
        </View>
        <View
          className="at-col-6"
          style="display: flex;flex-direction: column;justify-content: center;padding-left: 10px"
        >
          <View style="margin-bottom: 4px">18827335317</View>
          <View>余额:0.00元 托管金额:0.00元</View>
        </View>
      </View>

      <View className="title">
        <AtIcon size="14" value="bookmark" color="#000"></AtIcon>
        雇主信息
      </View>

      <View
        style="padding: 30px 0;border-bottom: 1px solid #d6e4ef;text-align: center;"
        className="at-row at-row__justify--center"
      >
        <View className="at-col-3">
          <View>0</View>
          <View>信息</View>
        </View>
        <View className="at-col-3">
          <View>0</View>
          <View>信息</View>
        </View>
        <View className="at-col-3">
          <View>0</View>
          <View>信息</View>
        </View>
        <View className="at-col-3">
          <View>0</View>
          <View>信息</View>
        </View>
      </View>

      <AtGrid
        className="gd"
        columnNum={3}
        data={[
          {
            image:
              "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
            value: "领取中心",
          },
          {
            image:
              "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
            value: "找折扣",
          },
          {
            image:
              "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
            value: "领会员",
          },
          {
            image:
              "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
            value: "新品首发",
          },
          {
            image:
              "https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png",
            value: "领京豆",
          },
          {
            image:
              "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
            value: "手机馆",
          },
        ]}
      />

      <Navbar />
    </View>
  );
}
