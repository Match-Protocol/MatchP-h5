import { SearchBar, Swiper, Space, Card, Avatar } from "antd-mobile";
import { MoreOutline, ScanningOutline, DownFill } from "antd-mobile-icons";

import banner from "../assets/banner/banner2@2x.png";

export const Home = () => {
  return (
    <div
      className="flex flex-col bg-gray-100 h-[100%]"
      style={{
        background:
          "linear-gradient(180deg, rgba(112, 191, 255, 0.2706) 0%, rgba(226, 156, 228, 0) 80%)",
      }}
    >
      {/* 顶部导航栏 */}
      <div
        className="flex items-center p-3 bg-white border-b border-gray-200 w-[100vw]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(211, 232, 248) 0%, rgb(213, 233, 248) 5%)",
        }}
      >
        <img
          src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/inform_icon.png"
          width="27px"
          height="27px"
        />

        <div className="flex-1 mx-2">
          <SearchBar placeholder="搜索活动..." className="rounded-full" />
        </div>

        <Space>
          <ScanningOutline className="text-gray-600" fontSize={20} />
          <MoreOutline className="text-gray-600" fontSize={20} />
        </Space>
      </div>
      {/* 轮播图 */}
      <Swiper loop autoplay className="mb-[11px]">
        <Swiper.Item>
          <div className="px-[12px] pt-[12px] ">
            <img className="rounded-[5px]" src={banner} />
          </div>
        </Swiper.Item>
        <Swiper.Item>
          <div className="px-[12px] pt-[12px] ">
            <img className="rounded-[5px]" src={banner} />
          </div>
        </Swiper.Item>
      </Swiper>

      {/* 筛选列表 */}
      <div
        className="rounded-t-lg relative"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #fcfcfc 100%)",
          padding: "18px 18px 11px 18px",
        }}
      >
        <Space align="center">
          <div className="relative z-[2] text-[24px] leading-[28px]">推荐</div>
          <div
            className="absolute left-[18px] top-[35px]"
            style={{
              width: "48px",
              height: "11px",
              background: "linear-gradient(90deg, #F9A9F2 0%, #B9FBFF 100%)",
            }}
          ></div>
          <Space align="center">
            <img
              width="20px"
              height="20px"
              src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/home/ball.png"
            />
            <span className="-ml-[5px] text-[18px] text-[#767676] leading-[28px] font-bold ">
              运动户外
            </span>
          </Space>
          <Space align="center">
            <img
              width="20px"
              height="20px"
              src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/home/9.png"
            />
            <span className="-ml-[5px] text-[18px] text-[#767676] leading-[28px] font-bold">
              体验工坊
            </span>
          </Space>
        </Space>

        <div className="flex justify-between mt-[15px]">
          <div
            className="flex items-center gap-[3px]"
            style={{
              borderRadius: "34px",
              fontWeight: "500",
              color: "#3D3D3D",
              background: "#F7F7F7",
              height: "34px",
              fontSize: "16px",
              lineHeight: "18px",
              padding: "0 11px",
            }}
          >
            <div className="w-[18px] h-[18px]">
              <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/location_blue_icon.png"></img>
            </div>
            <span>定位</span>
          </div>

          <div className="flex gap-[5px]">
            <div
              className="flex items-center gap-[3px]"
              style={{
                borderRadius: "34px",
                fontWeight: "500",
                color: "rgb(96, 98, 102)",
                background: "#F7F7F7",
                height: "34px",
                fontSize: "13px",
                lineHeight: "18px",
                padding: "0 11px",
              }}
            >
              <span>时间</span>
              <DownFill fontSize={12} />
            </div>
            <div
              className="flex items-center gap-[3px]"
              style={{
                borderRadius: "34px",
                fontWeight: "500",
                color: "rgb(96, 98, 102)",
                background: "#F7F7F7",
                height: "34px",
                fontSize: "13px",
                lineHeight: "18px",
                padding: "0 11px",
              }}
            >
              <span>线上</span>
              <DownFill fontSize={12} />
            </div>
            <div
              className="flex items-center gap-[3px]"
              style={{
                borderRadius: "34px",
                fontWeight: "500",
                color: "rgb(96, 98, 102)",
                background: "#F7F7F7",
                height: "34px",
                fontSize: "13px",
                lineHeight: "18px",
                padding: "0 11px",
              }}
            >
              <span>玩籽抵扣</span>
              <DownFill fontSize={12} />
            </div>
          </div>
        </div>
      </div>

      {/* 活动列表 */}
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(251, 251, 251, 0.97) 0%, rgba(226, 156, 228, 0) 44%)",
        }}
      >
        <div className="m-[11px] mt-0">
          <Card
            style={
              { "--adm-card-padding-inline": "10px" } as React.CSSProperties
            }
          >
            <div className="flex gap-[5px]">
              <div className="relative min-w-[162px] h-[114px]">
                <img
                  className="rounded-[6px] w-full h-full"
                  src="https://goin.obs.cn-north-4.myhuaweicloud.com/wechat/1743674423563722261153646551.jpg"
                />
                <p
                  style={{
                    position: "absolute",
                    top: "0",
                    color: "#50F5FF",
                    background: "#454545",
                    fontWeight: "500",
                    fontSize: "13px",
                    lineHeight: "22px",
                    textAlign: "center",
                    width: "57px",
                    height: "22px",
                    borderTopLeftRadius: "6px",
                    borderBottomRightRadius: "6px",
                  }}
                >
                  报名中
                </p>
              </div>
              <div className="flex flex-col ml-[5px] gap-[5px]">
                <div className="title-h2">
                  漫谈dex：去中心化衍生品交易所新叙事
                </div>
                <div className="flex items-center">
                  <div
                    style={{
                      width: "17px",
                      height: "17px",
                      minWidth: "17px",
                      marginRight: "6px",
                      borderRadius: "50%",
                      backgroundImage:
                        "url('https://goin.obs.cn-north-4.myhuaweicloud.com/wechat/1743334295455001325351077815.jpg')",
                      backgroundPosition: "0% 0%",
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="tl-font">Variety Labs</div>
                  <div className="tl-tribe-type">
                    <span>DAO</span>
                  </div>
                </div>
                <div className="flex gap-[5px]">
                  <div className="image-24">
                    <div className="image-24-icon1">
                      <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/time.png" />
                    </div>
                  </div>
                  <div>04.11 15:00-17:00</div>
                </div>
                <div className="flex gap-[5px]">
                  <div className="image-24">
                    <div className="image-24-icon2">
                      <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/location.png" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div>284.5km</div>
                    <div className="tl-line"></div>
                    <div>潜能新天地</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex mt-[8px]">
                <Avatar
                  className="border-solid border border-white"
                  src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head03.jpg"
                  style={{ "--size": "28px", "--border-radius": "50%" }}
                />
                <Avatar
                  className="border-solid border border-white -translate-x-[8px]"
                  src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head01.jpg"
                  style={{ "--size": "28px", "--border-radius": "50%" }}
                />
                <Avatar
                  className="border-solid border border-white -translate-x-[16px]"
                  src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head03.jpg"
                  style={{ "--size": "28px", "--border-radius": "50%" }}
                />
                <Avatar
                  className="border-solid border border-white -translate-x-[24px]"
                  src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head02.jpg"
                  style={{ "--size": "28px", "--border-radius": "50%" }}
                />
              </div>
              <div className="flex flex-1 justify-between">
                <div className="mt-[10px]">4人已报名</div>
                <div className="mt-[6px] register-btn">
                  <div>免费</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
