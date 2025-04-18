import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useState, useEffect } from "react";

import { Avatar, Tag, Toast } from "antd-mobile";
import { SetOutline, ScanningOutline } from "antd-mobile-icons";
import { useWriteContract, useReadContract,useWaitForTransactionReceipt } from "wagmi";

import walletIcon from "../assets/wallet.png";
import mToken from "../assets/icon/mToken.jpeg";

import { matchPABI } from "../abis/matchP";
import { matchTokenABI } from "../abis/matchToken";
import { matchTokenAddress, matchPAddress } from "../constants";

export const Me = () => {
  const { address } = useAppKitAccount();
  const { open } = useAppKit();
  const [hasReceived, setHasReceived] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: matchTokenAddress,
    abi: matchTokenABI,
    functionName: "balanceOf",
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // 检查用户是否已经领取过token
  // const { data: isGainData } = useReadContract({
  //   address: matchPAddress,
  //   abi: matchPABI,
  //   functionName: "isGain",
  //   args: address ? [address as `0x${string}`] : undefined,
  //   query: {
  //     enabled: !!address,
  //   },
  // });
  // 监听交易状态
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: !!txHash,
    },
  });
  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    if (address) {
      refetchBalance();
    } 
    // 如果已经领取过，设置状态
    // if (isGainData) {
    //   setHasReceived(true);
    // }
  }, [address, refetchBalance]);

  const receiveToken = async () => {
    // 如果已经领取过，提示用户
    // if (hasReceived) {
    //   Toast.show({ content: "您已经领取过Token了！" });
    //   return;
    // }
    try {
      Toast.show({ icon: "loading", duration: 0 });
      const hash =  await writeContractAsync({
        address: matchPAddress,
        abi: matchPABI,
        functionName: "getToken",
        args: [],
      });
      setTxHash(hash);
    } catch (error) {
      Toast.show({ content: "领取失败！" });
      console.error("授权失败:", error);
    } finally {
      Toast.clear();
      Toast.show({ content: "交易已提交，等待确认..." });
    }
  };

    // 监听交易确认状态
    useEffect(() => {
      if (isConfirmed) {
        Toast.show({ content: "领取成功！" });
        setHasReceived(true);
        refetchBalance();
        // 清除交易哈希，避免重复处理
        setTxHash(undefined);
      }
    }, [isConfirmed, refetchBalance]);
  return (
    <div className="flex flex-col  bg-[#f5f5f5]">
      {/* 顶部背景和个人信息 */}
      <div
        style={{
          background:
            "linear-gradient(180deg, #dbd3f7 10%, #f9ddfe 65%, #f2f3f3 100%)",
        }}
        className="p-4"
      >
        {/* 顶部工具栏 */}
        <div className="flex justify-between items-center mb-4">
          <img
            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/inform_icon.png"
            width="23px"
            height="23px"
          />
          <div className="flex gap-4">
            <ScanningOutline fontSize={23} />
            <SetOutline fontSize={23} />
          </div>
        </div>

        {/* 用户信息 */}
        <div className="flex items-start">
          <Avatar
            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head03.jpg"
            className="mr-3"
            style={{ "--size": "70px", "--border-radius": "50%" }}
          />
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-xl font-bold">小鹿dew</span>
            </div>
            <div className="text-gray-500 text-sm mt-1">did: 287864115</div>
            {address && (
              <div className="text-gray-500 text-sm mt-1">{`${address.slice(
                0,
                4
              )}...${address.slice(-4)}`}</div>
            )}
            {/* 标签列表 */}
            <div className="flex flex-wrap gap-2 mt-2">
              <Tag fill="outline" style={{ "--border-radius": "6px" }}>
                设计
              </Tag>
              <Tag fill="outline" style={{ "--border-radius": "6px" }}>
                绘画艺术
              </Tag>
              <Tag fill="outline" style={{ "--border-radius": "6px" }}>
                极限运动
              </Tag>
            </div>
          </div>
        </div>

        <div className="text-gray-700 mt-2">一只快乐的小猫</div>

        <div className="flex items-center justify-between mt-2 text-sm text-[11px]">
          <div className="flex">
            <div className="">关注 2354</div>
            <div className="tl-line"></div>
            <div className="">被关注 7885</div>
            <div className="tl-line"></div>
            <div className="">收藏 2520</div>
          </div>

          <div
            className="flex items-center gap-[3px]"
            style={{
              borderRadius: "34px",
              fontWeight: "500",
              color: "#3D3D3D",
              background: "rgba(60, 200, 255, 0.3)",
              height: "25px",
              fontSize: "16px",
              lineHeight: "18px",
              padding: "0 6px",
            }}
          >
            <div className="w-[18px] h-[18px]">
              <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/my/community.png"></img>
            </div>
            <span className="text-[11px]">观音湾社区</span>
          </div>
        </div>
      </div>

      {/* 积分信息 */}
      {address && (
        <div
          style={{
            background: "linear-gradient(180deg, #757575 0%, #454545 100%)",
          }}
          className="mx-4 my-4 rounded-lg shadow-sm overflow-hidden"
        >
          <div className="flex">
            <div className="flex-1 py-3 px-4 flex items-center gap-[7px]">
              <img
                className="w-[15px] h-[15px] rounded-full"
                src={mToken}
              ></img>
              <span className="text-gray-300">MATCH</span>
              <span className="text-white font-bold">{Number(balance) || 0}</span>
            </div>
            <div className="flex-1 py-3 px-4 flex items-center gap-[7px]">
              <img
                className="w-[15px] h-[15px]"
                src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/my/congregate_icon.png"
              ></img>
              <span className="text-gray-300">汇玩指数</span>
              <span className="ml-2 text-white font-bold">1000</span>
            </div>
          </div>
        </div>
      )}

      {/* 功能菜单 */}
      <div className="grid grid-cols-4 bg-white mx-4 rounded-lg p-4">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-1">
            <img
              className="w-[25px] h-[25px]"
              src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/my/function/orderForm.png"
              draggable="false"
            ></img>
          </div>
          <span className="text-sm">我的订单</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-1">
            <img
              className="w-[25px] h-[25px]"
              src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/my/function/announce.png"
              draggable="false"
            ></img>
          </div>
          <span className="text-sm">我的发布</span>
        </div>

        {address && (
          <div className="flex flex-col items-center" onClick={receiveToken}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-1">
              <img
                className="w-[25px] h-[25px]"
                src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/my/function/asset.png"
                draggable="false"
              ></img>
            </div>
            <span className="text-sm">{hasReceived ? "已领取" : "领取Token"}</span>
          </div>
        )}

        <div onClick={() => open()} className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-1">
            <img
              className="w-[25px] h-[25px]"
              src={walletIcon}
              draggable="false"
            ></img>
          </div>
          <span className="text-sm">wallet</span>
        </div>
      </div>

      <div className="flex flex-col bg-white mx-4 mt-4 rounded-lg p-2 gap-[5px]">
        <div className="flex flex-1 gap-[5px] relative">
          <img
            className="w-[55px] h-[55px]  rounded-[5px]"
            src="https://goin.obs.cn-north-4.myhuaweicloud.com/wechat/1742555171108845604620754732.jpg"
          />
          <div
            style={{ background: "rgba(0, 0, 0, 0.5)" }}
            className="flex gap-[3px] h-[13px] w-[55px] justify-center items-center absolute bottom-0 rounded-[5px]"
          >
            <img
              className="w-[10px] h-[10px] rounded-[5px]"
              src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/tribe/owner_icon.png"
            />
            <span className="text-[#50F5FF] text-[11px] leading-[13px] font-[700]">
              主理人
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex justify-between">
              <div className="flex items-center gap-[3px]">
                <div className="text-[15px] text-[#000000]">猜你想</div>
                <div className="tl-tribe-type">
                  <span>DAO</span>
                </div>
              </div>
              <div
                className="flex rounded-[10px] px-[10px] py-[5px]"
                style={{
                  background:
                    "linear-gradient(90deg, #F9A9F2 0%, #B9FBFF 100%)",
                }}
              >
                <img
                  className="w-[15px] h-[15px]"
                  src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/my/authentication_icon.png"
                />
                <div className="text-[13px] text-[#454545] font-bold leading-[15px]">
                  已认证
                </div>
              </div>
            </div>
            <div className="text-[11px] text-[#3D3D3D]">7人已加入</div>
          </div>
        </div>
        <div
          style={{ color: "rgba(147, 147, 147, 0.8)" }}
          className="text-[13px] my-[4px]"
        >
          生活的不确定性，正是我们希望的来源
        </div>
      </div>

      {/* 任务列表 */}
      <div className="bg-white mx-4 mt-4 rounded-lg p-2 mb-[25px]">
        <div className="mt-2">
          <div className="flex justify-between items-center">
            <div className="tl-font-32-34">周任务/社区任务</div>
            <div
              className="flex rounded-[10px] px-[13px] py-[5px]"
              style={{
                background: "linear-gradient(90deg, #F9A9F2 0%, #B9FBFF 100%)",
              }}
            >
              <img
                className="w-[15px] h-[15px]"
                src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/my/sign_icon.png"
              />
              <div className="text-[13px] text-[#454545] font-bold leading-[15px]">
                签到
              </div>
            </div>
          </div>
          <div
            style={{
              height: "0",
              border: "1px solid #D2D2D2",
              opacity: "0.2",
              margin: "9px 0 9px",
            }}
          ></div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm">注册账号 (1/1)</span>
            <div className="flex items-center">
              <img
                className="w-[15px] h-[15px]"
                src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/my_wz.png"
              ></img>
              <span className="text-[#1ACDE8] font-bold">+30</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm">发布活动 (0/3)</span>
            <div className="flex items-center">
              <img
                className="w-[15px] h-[15px]"
                src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/my_wz.png"
              ></img>{" "}
              <span className="text-[#1ACDE8] font-bold">+60</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm">参加活动 (0/3)</span>
            <div className="flex items-center">
              <img
                className="w-[15px] h-[15px]"
                src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/my_wz.png"
              ></img>{" "}
              <span className="text-[#1ACDE8] font-bold">+60</span>
            </div>
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="text-sm">邀请好友 (0/10)</span>
            <div className="flex items-center">
              <img
                className="w-[15px] h-[15px]"
                src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/my_wz.png"
              ></img>{" "}
              <span className="text-[#1ACDE8] font-bold">+60</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm">活动报名 (0/200)</span>
            <div className="flex items-center">
              <img
                className="w-[15px] h-[15px]"
                src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/my_wz.png"
              ></img>{" "}
              <span className="text-[#1ACDE8] font-bold">+5</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm">发布任务 (0/8)</span>
            <div className="flex items-center">
              <img
                className="w-[15px] h-[15px]"
                src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/my_wz.png"
              ></img>
              <span className="text-[#1ACDE8] font-bold">+40</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-sm">参加任务 (0/8)</span>
            <div className="flex items-center">
              <img
                className="w-[15px] h-[15px]"
                src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/my_wz.png"
              ></img>{" "}
              <span className="text-[#1ACDE8] font-bold">+20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
