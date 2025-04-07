import { NavBar, Swiper, Tabs, CapsuleTabs, FloatingBubble } from "antd-mobile";
import { MessageFill } from "antd-mobile-icons";
import { useNavigate } from "react-router";

import team from "../assets/team/teams.jpeg";
import detail1 from "../assets/detail/detail1.jpg";
import detail2 from "../assets/detail/detail2.jpg";
import detail3 from "../assets/detail/detail3.jpg";

export const Detail = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  return (
    <div
      className="h-[100vh] relative"
      style={{
        background:
          "linear-gradient(rgba(112, 191, 255, 0.27) 0%, rgba(226, 156, 228, 0) 80%)",
      }}
    >
      <NavBar
        className="w-full !h-[44px] fixed z-[10] bg-white"
        style={{ "--height": "23px", "--border-bottom": "5px" }}
        onBack={back}
      >
        <div className="flex items-center absolute left-[45px] top-[10px] z-10">
          <div
            style={{
              width: "26px",
              height: "26px",
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
          <div className="tl-font !text-[#000000] text-[17px] !font-[700]">
            Variety Labs
          </div>
          <div className="tl-tribe-type">
            <span>DAO</span>
          </div>
        </div>
      </NavBar>

      {/* 轮播图 */}
      <div className="relative bg-white pb-[10px]">
        <Swiper loop className="mb-[11px]">
          <Swiper.Item>
            <div className="px-[12px] pt-[50px] ">
              <img
                className="rounded-[10px]"
                src={detail1}
              />
            </div>
          </Swiper.Item>
          {/* <Swiper.Item>
            <div className="px-[12px] pt-[50px] ">
              <img
                className="rounded-[10px]"
                src={detail2}
              />
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="px-[12px] pt-[50px] ">
              <img
                className="rounded-[10px]"
                src={detail3}
              />
            </div>
          </Swiper.Item> */}
        </Swiper>
        <div
          className="flex gap-[3px] absolute rounded-[22px] bottom-[26px] right-[23px]"
          style={{
            background:
              "linear-gradient(87deg, #111E37 0%, rgba(35, 52, 87, 0.3) 63%, rgba(247, 247, 247, 0) 100%)",
          }}
        >
          <div className="w-[18px] h-[18px]">
            <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/wanzi.png" />
          </div>
          <div className="text-[#50F5FF] bg-[#454545] px-[6px]  rounded-[10px]">
            68元/人
          </div>
        </div>
      </div>

      {/* 活动详情 */}
      <div className="flex flex-col p-[17px] pt-0 gap-[5px] bg-white mb-[10px]">
        <div className="title-h2">AI Agent Hackathon</div>

        <div className="flex items-center gap-[5px]">
          <div className="flex flex-col gap-[5px] flex-1">
            <div className="flex gap-[5px] items-center">
              <div className="w-[17px] h-[17px] ">
                <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/time_n.png" />
              </div>
              <div className="text-[#6D6C6B] text-[14px] leading-[23px] font-[400]">
                活动时间: 04.07 10:00-04.09 18:00
              </div>
            </div>
            <div className="flex gap-[5px] items-center">
              <div className="w-[17px] h-[17px] ">
                <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/location_n.png" />
              </div>
              <div className="text-[#6D6C6B] text-[14px] leading-[23px] font-[400]">
                活动地址: 香港湾仔港湾道23号...
              </div>
            </div>
          </div>
          <div
            className="tl-line !h-[40px]"
            style={{
              borderColor: "rgba(0, 0, 0, 0.05)",
            }}
          ></div>
          <div className="flex items-center rounded-[44px] h-[32px] w-[93px] bg-[#50F5FF] px-[5px] gap-[5px]">
            <div className="w-[25px] h-[25px]">
              <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/navigation.png" />
            </div>
            <div className="text-[14px] leading-[14px] text-[#454545]">
              去这里
            </div>
          </div>
        </div>
      </div>

      {/* 发布人 */}
      <div className="flex justify-between items-center p-[17px] gap-[5px] bg-white">
        <div className="flex flex-1 gap-[10px]">
          <div className="relative">
            <div
              className="w-[49px] h-[49px] rounded-full"
              style={{
                border: "3px solid rgb(26, 205, 232)",
              }}
            >
              <img
                className="rounded-full"
                src="https://goin.obs.cn-north-4.myhuaweicloud.com/wechat/1743395768327881612810102006.jpg"
              />
            </div>
            <div className="w-[17px] h-[17px] absolute right-0 bottom-0">
              <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/boy.png"></img>
            </div>
          </div>

          <div className="flex flex-col  gap-[5px]">
            <div className="flex items-center gap-[5px]">
              <div className="text-[14px] font-[600] opacity-[0.8]">leo</div>
              <div
                className="text-[10px] text-[#1ACDE8] text-center rounded-[4px] w-[42px] h-[17px] leading-[17px]"
                style={{
                  background: "rgba(26, 205, 232, 0.1)",
                }}
              >
                发布人
              </div>
            </div>
            <div className="text-[11px]  opacity-[0.5]">
              有喜欢交易的朋友欢迎沟通。
            </div>
          </div>
        </div>

        <div
          className="tl-line !h-[23px] "
          style={{
            borderColor: "rgba(0, 0, 0, 0.05)",
          }}
        ></div>
        <div>
          <div className="w-[25px] h-[25px]">
            <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/contact_n.png" />
          </div>
        </div>
      </div>
      <div>
        <img src={team} />
      </div>
      {/* 赛事简介 */}
      <Tabs
        className="customTabs"
        activeLineMode="fixed"
        style={
          {
            marginTop: 12,
            "--adm-color-primary": "rgb(29,204,225)",
            "--active-line-height": "4px",
          } as React.CSSProperties
        }
      >
        <Tabs.Tab
          title={
            <div className="text-[#3D3D3D] leading-[20px] font-[600]">
              赛事简介
            </div>
          }
          key="1"
        >
          {/* <div className="flex flex-col p-[17px] gap-[10px]  text-[14px]">
            <div className="text-[#303133">
              🔥
              深度揭秘链上永续合约交易所——如何找到真正安全、低滑点、高流动性的交易平台？避免踩坑！
            </div>
            <div className="text-[#303133">
              💥
              Hyperliquid金库狙击事件全解析——巨鲸如何得手？项目方应对是否到位？我们将复盘攻击细节，探讨如何提升资金安全策略。
            </div>
            <div className="text-[#303133">
              🎤 大咖圆桌激辩——安全专家、量化团队现场交锋：CEX vs
              DEX永续合约，谁更胜一筹？
            </div>
            <div className="text-[#303133">
              🤖
              实盘数据演示——用链上工具实时分析交易所流动性、资金费率，教你用数据选择最佳交易场所！
            </div>
            <div className="text-[#303133">
              💡
              自由交流+资源对接——结识交易高手、开发者和机构伙伴，拓展你的defi人脉圈！
            </div>
            <div className="text-[#303133">
              无论你是交易员、DeFi玩家还是安全研究员，这场活动都会让你满载而归！
            </div>
          </div> */}
          <img src={detail2} />
          <img src={detail3} />
        </Tabs.Tab>
        <Tabs.Tab
          title={
            <div className="text-[#3D3D3D] leading-[20px] font-[600]">
              Match P
            </div>
          }
          key="2"
        >
          <CapsuleTabs>
            <CapsuleTabs.Tab title="赛程" key="fruits"></CapsuleTabs.Tab>
            <CapsuleTabs.Tab
              title="赛事评分"
              key="vegetables"
            ></CapsuleTabs.Tab>
            <CapsuleTabs.Tab title="赛事投资" key="animals"></CapsuleTabs.Tab>
          </CapsuleTabs>

          <Tabs
            className="customInnerTabs bg-white"
            activeLineMode="fixed"
            style={
              {
                marginTop: 12,
                "--adm-color-primary": "rgb(29,204,225)",
                "--active-line-height": "4px",
              } as React.CSSProperties
            }
          >
            <Tabs.Tab
              title={
                <div className="text-[#3D3D3D] leading-[20px] font-[600]">
                  A组小组赛
                </div>
              }
              key="1"
            >
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col shadow rounded-[5px] p-[10px]">
                  <div className="flex justify-center gap-[10px] items-center">
                    <div className="flex items-center  gap-[15px]">
                      <div className="flex flex-col items-center">
                        <div className="w-[40px] h-[40px]">
                          <img
                            className="rounded-full"
                            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head03.jpg"
                          />
                        </div>
                        <div className="opacity-[0.5]">筑梦少年</div>
                      </div>
                      {/* <div
                        className="w-[50px] h-[20px] text-[#454545] font-[700] text-center rounded-[23px]"
                        style={{
                          background:
                            "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
                        }}
                      >
                        Vote
                      </div> */}
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-[40px] p-[3px] text-center rounded-[5px] bg-[#50F5FF]">
                        3 : 5
                      </div>
                      <div className="font-bold">赛后</div>
                    </div>
                    <div className="flex items-center  gap-[15px]">
                      <div className="flex flex-col items-center ">
                        <div className="w-[40px] h-[40px]">
                          <img
                            className="rounded-full"
                            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head02.jpg"
                          />
                        </div>
                        <div className="opacity-[0.5]">铠甲战刀</div>
                      </div>

                      {/* <div
                        className="w-[50px] h-[20px] text-[#454545] font-[700] text-center rounded-[23px]"
                        style={{
                          background:
                            "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
                        }}
                      >
                        Vote
                      </div> */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[5px] flex-1 mt-[20px]">
                    <div className="flex gap-[5px] items-center">
                      <div className="w-[17px] h-[17px] ">
                        <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/time_n.png" />
                      </div>
                      <div className="text-[#6D6C6B] text-[12px] leading-[20px] font-[400]">
                        比赛时间: 2024.06.01 20:30-22:30
                      </div>
                    </div>
                    <div className="flex gap-[5px] items-center">
                      <div className="w-[17px] h-[17px] ">
                        <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/location_n.png" />
                      </div>
                      <div className="text-[#6D6C6B] text-[12px] leading-[20px] font-[400]">
                        地址: 四川省成都市武侯区天府大道中段1388号
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col shadow rounded-[5px] p-[10px]">
                  <div className="flex justify-center items-center gap-[10px]">
                    <div className="flex items-center  gap-[15px]">
                      <div
                        className="w-[50px] h-[20px] text-[#454545] font-[700] text-center rounded-[23px]"
                        style={{
                          background:
                            "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
                        }}
                      >
                        Vote
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-[40px] h-[40px]">
                          <img
                            className="rounded-full"
                            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head03.jpg"
                          />
                        </div>
                        <div className="opacity-[0.5]">筑梦少年</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-[40px] p-[3px] text-center rounded-[5px] bg-[#50F5FF]">
                        竞猜
                      </div>
                      <div className="font-bold">赛前</div>
                    </div>
                    <div className="flex items-center  gap-[15px]">
                      <div className="flex flex-col items-center ">
                        <div className="w-[40px] h-[40px]">
                          <img
                            className="rounded-full"
                            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head02.jpg"
                          />
                        </div>
                        <div className="opacity-[0.5]">铠甲战刀</div>
                      </div>

                      <div
                        className="w-[50px] h-[20px] text-[#454545] font-[700] text-center rounded-[23px]"
                        style={{
                          background:
                            "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
                        }}
                      >
                        Vote
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[5px] flex-1 mt-[20px]">
                    <div className="flex gap-[5px] items-center">
                      <div className="w-[17px] h-[17px] ">
                        <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/time_n.png" />
                      </div>
                      <div className="text-[#6D6C6B] text-[12px] leading-[20px] font-[400]">
                        比赛时间: 2024.06.01 20:30-22:30
                      </div>
                    </div>
                    <div className="flex gap-[5px] items-center">
                      <div className="w-[17px] h-[17px] ">
                        <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/location_n.png" />
                      </div>
                      <div className="text-[#6D6C6B] text-[12px] leading-[20px] font-[400]">
                        地址: 四川省成都市武侯区天府大道中段1388号
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col shadow rounded-[5px] p-[10px]">
                  <div className="flex justify-center items-center gap-[10px]">
                    <div className="flex items-center  gap-[15px]">
                      {/* <div
                        className="w-[50px] h-[20px] text-[#454545] font-[700] text-center rounded-[23px]"
                        style={{
                          background:
                            "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
                        }}
                      >
                        Vote
                      </div> */}
                      <div className="flex flex-col items-center">
                        <div className="w-[40px] h-[40px]">
                          <img
                            className="rounded-full"
                            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head03.jpg"
                          />
                        </div>
                        <div className="opacity-[0.5]">筑梦少年</div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-[40px] p-[3px] text-center rounded-[5px] bg-[#50F5FF]">
                        竞猜
                      </div>
                      <div className="font-bold">赛中</div>
                    </div>
                    <div className="flex items-center  gap-[15px]">
                      <div className="flex flex-col items-center ">
                        <div className="w-[40px] h-[40px]">
                          <img
                            className="rounded-full"
                            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head02.jpg"
                          />
                        </div>
                        <div className="opacity-[0.5]">铠甲战刀</div>
                      </div>

                      {/* <div
                        className="w-[50px] h-[20px] text-[#454545] font-[700] text-center rounded-[23px]"
                        style={{
                          background:
                            "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
                        }}
                      >
                        Vote
                      </div> */}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[5px] flex-1 mt-[20px]">
                    <div className="flex gap-[5px] items-center">
                      <div className="w-[17px] h-[17px] ">
                        <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/time_n.png" />
                      </div>
                      <div className="text-[#6D6C6B] text-[12px] leading-[20px] font-[400]">
                        比赛时间: 2024.06.01 20:30-22:30
                      </div>
                    </div>
                    <div className="flex gap-[5px] items-center">
                      <div className="w-[17px] h-[17px] ">
                        <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/location_n.png" />
                      </div>
                      <div className="text-[#6D6C6B] text-[12px] leading-[20px] font-[400]">
                        地址: 四川省成都市武侯区天府大道中段1388号
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tabs.Tab>
            <Tabs.Tab
              title={
                <div className="text-[#3D3D3D] leading-[20px] font-[600]">
                  B组小组赛
                </div>
              }
              key="2"
            ></Tabs.Tab>
            <Tabs.Tab
              title={
                <div className="text-[#3D3D3D] leading-[20px] font-[600]">
                  半决赛
                </div>
              }
              key="3"
            ></Tabs.Tab>
            <Tabs.Tab
              title={
                <div className="text-[#3D3D3D] leading-[20px] font-[600]">
                  决赛
                </div>
              }
              key="4"
            ></Tabs.Tab>
          </Tabs>
        </Tabs.Tab>
      </Tabs>

      <div className="h-[96px]"></div>
      <div className="bottom-menu">
        <div className="flex gap-[5px] w-[69px] justify-between ">
          <div className="flex flex-col gap-[5px] items-center">
            <div className="w-[23px] h-[23px]">
              <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/share_n.png" />
            </div>
            <div>转发</div>
          </div>
          <div className="flex flex-col gap-[5px] items-center">
            <div className="w-[23px] h-[23px]">
              <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/collect_n.png" />
            </div>
            <div>收藏</div>
          </div>
        </div>
        <div className="w-2/3">
          <div
            className="text-[17px] text-[#454545] font-[700] h-[42px] leading-[42px] text-center rounded-[23px]"
            style={{
              background: "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
            }}
          >
            报名 (¥120/人)
          </div>
        </div>
      </div>

      <FloatingBubble
        style={{
          "--initial-position-bottom": "110px",
          "--initial-position-right": "14px",
          "--edge-distance": "24px",
          "--background": "rgba(80, 245, 255, 1)",
        }}
      >
        <MessageFill fontSize={32} />
      </FloatingBubble>
    </div>
  );
};
