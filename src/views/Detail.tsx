import {
  NavBar,
  Swiper,
  Tabs,
  CapsuleTabs,
  FloatingBubble,
  Popup,
  Avatar,
  Badge,
  Toast,
} from "antd-mobile";
import { MessageFill } from "antd-mobile-icons";
import { useNavigate } from "react-router";
import { Bubble, Sender, useXChat, useXAgent } from "@ant-design/x";
import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import team from "../assets/team/teams.jpeg";
import detail1 from "../assets/detail/detail1.jpg";
import detail2 from "../assets/detail/detail2.jpg";
import detail3 from "../assets/detail/detail3.jpg";
import tintinland from "../assets/icon/tintinland.png";
import adam from "../assets/icon/adam.jpeg";

import { matchPABI } from "../abis/matchP";
import { matchTokenABI } from "../abis/matchToken";
import { matchTokenAddress, matchPAddress } from "../constants";

import { useEffect, useState } from "react";

const playerAddress1 = "0xA52aD924E5A65149c211E4b90410f4ee84a8E167";
const playerAddress2 = "0x1CF7452c1455f95D3d7Ba5f4Fa359c0b6bD24520";

export const Detail = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  const [visible, setVisible] = useState(false);
  const [showBadgeCount, setShowBadgeCount] = useState(true);

  const [voteLoading, setVoteLoading] = useState(false);
  const [approveHash, setApproveHash] = useState<`0x${string}` | undefined>();
  const { writeContractAsync } = useWriteContract();
  const { isSuccess: isApproveConfirmed, isError: approveError } =
    useWaitForTransactionReceipt({
      hash: approveHash,
      query: {
        enabled: !!approveHash,
      },
    });

  useEffect(() => {
    if (approveError) {
      Toast.show({ content: "投票授权交易执行失败！" });
      console.error("投票授权交易执行失败！");
      setVoteLoading(false);
    }
  }, [approveError]);

  const handleVote = async (leftVote: boolean) => {
    const playerAddress = leftVote ? playerAddress1 : playerAddress2;
    const value = leftVote ? 30 : 50;

    // todo
    // matchToken.approve(address, value)
    // matchP.stake(address, value)
    try {
      setVoteLoading(true);
      Toast.show({ icon: "loading", content: "授权中...", duration: 0 });
      // 保存投票信息到本地存储，以便在授权确认后使用
      localStorage.setItem(
        "voteInfo",
        JSON.stringify({ playerAddress, value })
      );
      const hash = await writeContractAsync({
        address: matchTokenAddress,
        abi: matchTokenABI,
        functionName: "approve",
        args: [matchPAddress, BigInt(value)],
      });

      setApproveHash(hash);
      Toast.clear();
      Toast.show({ content: "授权已提交，等待确认..." });
    } catch (error) {
      Toast.clear();
      Toast.show({ content: "授权失败！" });
      console.error("授权失败:", error);
      setVoteLoading(false);
    }
  };

  // 当授权确认后，执行stake操作
  useEffect(() => {
    const executeStake = async () => {
      if (isApproveConfirmed && approveHash) {
        try {
          Toast.show({ content: "授权成功，正在投票...", duration: 0 });

          // 从本地存储获取投票信息
          const voteInfo = JSON.parse(localStorage.getItem("voteInfo") || "{}");
          const { playerAddress, value } = voteInfo;

          localStorage.setItem("txType", "vote");

          // 调用stake方法
          const hash = await writeContractAsync({
            address: matchPAddress,
            abi: matchPABI,
            functionName: "stake",
            args: [BigInt(1), playerAddress, BigInt(value)],
          });

          setTxHash(hash);
          // 清除授权哈希和本地存储
          setApproveHash(undefined);
          localStorage.removeItem("voteInfo");
        } catch (error) {
          Toast.clear();
          Toast.show({ content: "投票失败！" });
          console.error("投票失败:", error);
          setVoteLoading(false);
          setApproveHash(undefined);
        }
      }
    };

    executeStake();
  }, [isApproveConfirmed, approveHash, writeContractAsync]);

  // 获取评分数据
  const {
    data: scores,
    refetch: refetchScores,
    isLoading: isLoadingScores,
  } = useReadContract({
    address: matchPAddress,
    abi: matchPABI,
    functionName: "getAllScore",
    args: [BigInt(1)],
    query: {
      enabled: !!1,
    },
  });
  const formatScore = (score: number) => {
    if (!score) return 0;
    return (score / 10).toFixed(1);
  };
  const calculateAverage = (scores: number[] | undefined) => {
    if (!scores || scores.length === 0) return 0;
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return formatScore(sum / scores.length);
  };
  // matchP.getAllScore() => [10-100]
  // 显示的 score => [1.0-10.0]

  // 评分状态
  const ratingScores = Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 5) + 1);

  // 处理评分变化
  //   const handleScoreChange = (index: number, value: number) => {
  //     const newScores = [...ratingScores];
  //     newScores[index] = value;
  //     setRatingScores(newScores);
  //   };

  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const handleRate = async () => {
    // todo
    // matchP.rate(1, [1-5,1-5,1-5,1-5])
    try {
      Toast.show({ icon: "loading", duration: 0 });

      localStorage.setItem("txType", "rate");

      const hash = await writeContractAsync({
        address: matchPAddress,
        abi: matchPABI,
        functionName: "rate",
        args: [BigInt(1), ratingScores],
      });
      setTxHash(hash);
    } catch (error) {
      Toast.show({ content: "评分失败！" });
      console.error("评分失败:", error);
    } finally {
      Toast.clear();
      Toast.show({ content: "交易已提交，等待确认..." });
    }
  };

  const { isSuccess: isConfirmed, isError } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: !!txHash,
    },
  });

  useEffect(() => {
    if (isError) {
      if (localStorage.getItem("txType") === "rate") {
        Toast.show({ content: "评分交易执行失败！" });
        console.error("评分交易执行失败！");
      } else {
        Toast.show({ content: "投票交易执行失败！" });
        console.error("投票交易执行失败！");
        setVoteLoading(false);
      }
    }
  }, [isError]);

  // 监听交易确认状态
  useEffect(() => {
    if (isConfirmed && txHash) {
      if (localStorage.getItem("txType") === "rate") {
        Toast.show({ content: "评分成功！" });
        refetchFinalScore();
      } else {
        Toast.show({ content: "投票成功！" });
        setVoteLoading(false);
        refetchScores();
      }
      // 清除交易哈希，避免重复处理
      setTxHash(undefined);
    }
  }, [isConfirmed, refetchScores, txHash]);

  // 获取投票数据
  const {
    data: finalScore,
    refetch: refetchFinalScore,
    isLoading: isLoadingFinalScore,
  } = useReadContract({
    address: matchPAddress,
    abi: matchPABI,
    functionName: "finalScore",
    args: [BigInt(1), playerAddress1, playerAddress2],
    query: {
      enabled: !!1,
    },
  });

  useEffect(()=>{
console.log(finalScore)
  },[finalScore])
  // 格式化比分显示
  const formatFinalScore = () => {
    if (!finalScore || !Array.isArray(finalScore) || finalScore.length < 2) {
      return "待揭晓";
    }

    const [score1, score2] = finalScore;
    // 如果两边分数都大于0，则显示比分，否则显示待揭晓
    if (Number(score1) > 0 && Number(score2) > 0) {
      return `${score1} : ${score2}`;
    } else {
      return "待揭晓";
    }
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
          {/* <div
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
          ></div> */}
          <img className="h-[26px]" src={tintinland} />
          <div className="tl-font !text-[#000000] text-[17px] !font-[700] ml-[3px]">
            Tin Tin Land
          </div>
          <div className="tl-tribe-type">
            <span>俱乐部</span>
          </div>
        </div>
      </NavBar>

      {/* 轮播图 */}
      <div className="relative bg-white pb-[10px]">
        <Swiper loop className="mb-[11px]">
          <Swiper.Item>
            <div className="px-[12px] pt-[50px] ">
              <img className="rounded-[10px]" src={detail1} />
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
            50元/人
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
                活动时间: 06.01周五-06.03周一
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
              <img className="rounded-full" src={adam} />
            </div>
            <div className="w-[17px] h-[17px] absolute right-0 bottom-0">
              <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/girl.png"></img>
            </div>
          </div>

          <div className="flex flex-col  gap-[5px]">
            <div className="flex items-center gap-[5px]">
              <div className="text-[14px] font-[600] opacity-[0.8]">
                Adam@TinTin
              </div>
              <div
                className="text-[10px] text-[#1ACDE8] text-center rounded-[4px] w-[42px] h-[17px] leading-[17px]"
                style={{
                  background: "rgba(26, 205, 232, 0.1)",
                }}
              >
                发布人
              </div>
            </div>
            <div className="text-[11px]  opacity-[0.5]">开开心心一起来玩吧</div>
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
            <CapsuleTabs.Tab title="赛程" key="fruits">
              <Tabs
                className="customInnerTabs bg-white"
                activeLineMode="fixed"
                style={
                  {
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
                            className={`w-[50px] h-[20px] text-[#454545] font-[700] text-center rounded-[23px] ${
                              voteLoading ? "opacity-50" : ""
                            }`}
                            style={{
                              background:
                                "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
                            }}
                            onClick={() => !voteLoading && handleVote(true)}
                          >
                            {voteLoading ? "处理中" : "Vote"}
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
                          <div className="w-[45px] p-[3px] text-center rounded-[5px] bg-[#50F5FF]">
                            {isLoadingFinalScore
                              ? "加载中..."
                              : formatFinalScore()}
                          </div>
                          <div className="font-bold">赛前</div>
                        </div>
                        <div className="flex items-center gap-[10px]">
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
                            className={`w-[50px] h-[20px] text-[#454545] font-[700] text-center rounded-[23px] ${
                              voteLoading ? "opacity-50" : ""
                            }`}
                            style={{
                              background:
                                "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
                            }}
                            onClick={() => !voteLoading && handleVote(false)}
                          >
                            {voteLoading ? "处理中" : "Vote"}
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
                            1 : 0
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
            </CapsuleTabs.Tab>
            <CapsuleTabs.Tab title="赛事评分" key="vegetables">
              <Tabs
                className="customInnerTabs bg-white"
                activeLineMode="fixed"
                style={
                  {
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
                      <div className="flex justify-evenly items-center gap-[10px]">
                        <div className="flex  flex-col items-center  gap-[15px]">
                          <div className="flex flex-col items-center">
                            <div className="w-[40px] h-[40px]">
                              <img
                                className="rounded-full"
                                src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head03.jpg"
                              />
                            </div>
                            <div className="opacity-[0.5]">筑梦少年</div>
                          </div>
                          <div>编号：18</div>
                          <div>项目：Match P</div>
                          <div>
                            平均分：
                            {isLoadingScores
                              ? "加载中..."
                              : calculateAverage(scores as number[])}
                          </div>
                        </div>

                        <div className="flex  flex-col items-center  gap-[15px]">
                          <div>
                            创新性：
                            {isLoadingScores
                              ? "加载中..."
                              : formatScore(scores?.[0] || 0)}
                          </div>
                          <div>
                            完整性：
                            {isLoadingScores
                              ? "加载中..."
                              : formatScore(scores?.[1] || 0)}
                          </div>
                          <div>
                            商业价值：
                            {isLoadingScores
                              ? "加载中..."
                              : formatScore(scores?.[2] || 0)}
                          </div>
                          <div>
                            技术实现：
                            {isLoadingScores
                              ? "加载中..."
                              : formatScore(scores?.[3] || 0)}
                          </div>
                          <div>权重：80</div>
                        </div>
                      </div>
                      <div
                        onClick={handleRate}
                        className="h-[40px] mt-[10px] bg-[#454545] rounded-full text-center text-[16px] leading-[40px] font-[500] text-[#50F5FF]"
                      >
                        立即评分
                      </div>
                      <div></div>
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
            </CapsuleTabs.Tab>
            <CapsuleTabs.Tab title="赛事投资" key="animals"></CapsuleTabs.Tab>
          </CapsuleTabs>
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
        className="custom-floating-bubble"
        onClick={() => {
          setVisible(true);
          setShowBadgeCount(false);
        }}
        style={{
          "--initial-position-bottom": "110px",
          "--initial-position-right": "14px",
          "--edge-distance": "24px",
          "--background": "rgba(80, 245, 255, 1)",
        }}
      >
        <Badge content={showBadgeCount ? "3" : ""}>
          <MessageFill fontSize={32} />
        </Badge>
      </FloatingBubble>

      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          height: "60vh",
        }}
      >
        <div className="h-full p-[20px] relative">
          <Chat />
        </div>
      </Popup>
    </div>
  );
};

const Chat = () => {
  const [value, setValue] = useState("");
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess, onError }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        onSuccess(`Received ${message}`);
      } catch (error) {
        console.error("Failed to generate a response:", error);
        onError(new Error());
      }
    },
  });

  const { onRequest, messages } = useXChat({
    agent,
    requestPlaceholder: "Waiting...",
    requestFallback: "Sorry, I can not answer your question now",
  });

  const presetMessages = [
    {
      id: "1",
      role: "ai",
      message:
        "❗️❗️今天中午12点前，大家抓紧进行项目登记！并确认 项目的【项目名称】、【参赛赛道】、【GitHub链接】12:00之后将不接受更改和新项目登记啦！",
    },
    {
      id: "2",
      role: "ai",
      message: "WiFi名字和密码都是JLINKHOTEL",
      status: "success",
    },
    {
      id: "3",
      role: "ai",
      message: "PPT和演讲视频均需为 英文 啦",
      status: "success",
    },
  ];
  const items = [...presetMessages, ...messages].map(
    ({ id, message, status }) => ({
      key: id,
      loading: status === "loading",
      role: status === "local" ? "local" : "ai",
      content: message,
    })
  );
  return (
    <div className="flex flex-col h-full gap-[20px]">
      <Bubble.List
        className="h-full"
        items={items}
        roles={{
          ai: {
            placement: "start",
            typing: { step: 10 },
            avatar: {
              icon: <Avatar src={tintinland} />,
              style: { background: "#fde3cf" },
            },
          },
          local: {
            placement: "end",
            variant: "shadow",
            avatar: {
              icon: (
                <Avatar src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head03.jpg" />
              ),
              style: { background: "#87d068" },
            },
          },
        }}
      />
      <Sender
        className=""
        value={value}
        onSubmit={(nextVal) => {
          onRequest(nextVal);
          setValue("");
        }}
        onChange={(nextVal) => {
          setValue(nextVal);
        }}
        loading={agent.isRequesting()}
      />
    </div>
  );
};
