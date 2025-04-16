import {
    NavBar,
    Swiper,
    Tabs,
    CapsuleTabs,
    FloatingBubble,
    Popup,
    Avatar,
    Badge,
    Modal,
    Toast,
    Input, SpinLoading
} from "antd-mobile";
import { MessageFill } from "antd-mobile-icons";
import { useNavigate } from "react-router";
import { Bubble, Sender, useXChat, useXAgent } from "@ant-design/x";
import {
    useWriteContract,
    useReadContract,
    useWaitForTransactionReceipt,
} from "wagmi";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

import team from "../assets/team/teams.jpeg";
import detail1 from "../assets/detail/detail1.jpg";
import detail2 from "../assets/detail/detail2.jpg";
import detail3 from "../assets/detail/detail3.jpg";
import tintinland from "../assets/icon/tintinland.png";
import adam from "../assets/icon/adam.jpeg";
import starFull from "../assets/icon/star-full.svg"
import starEmpty from "../assets/icon/star-empty.svg"

import { matchPABI } from "../abis/matchP";
import { matchTokenABI } from "../abis/matchToken";
import { matchTokenAddress, matchPAddress } from "../constants";

import { useEffect, useState } from "react";
export const Detail = () => {
    const navigate = useNavigate();
    const { address } = useAppKitAccount();

    const back = () => {
        navigate(-1);
    };

    const [visible, setVisible] = useState(false);
    const [showBadgeCount, setShowBadgeCount] = useState(true);

    const {
        data: games,
        isLoading,
        refetch: refetchGetAllGames,
    } = useReadContract({
        address: matchPAddress,
        abi: matchPABI,
        functionName: "getAllGames",
        args: [],
        query: {
            enabled: true,
        },
    });

    const { vote } = useVote(() => {
        // 例如调用 getAllGames.refetch 刷新数据
        refetchGetAllGames();
    });

    const { joinGame } = useJoinGame(() => {
        // 例如调用 getAllGames.refetch 刷新数据
        refetchGetAllGames();
    })

    const handleJoinGame = async (gameInfo: any) => {
        if (gameInfo.players.length < 2) {
            Toast.show({ content: "加入比赛中..." });
            return await joinGame(gameInfo.id)
        }
    }
    const handleVote = async (gameInfo: any) => {
        const handler = Modal.show({
            content: <Vote gameInfo={gameInfo} onClose={() => handler.close()} onVote={vote} />,
            closeOnMaskClick: true,
            showCloseButton: true,
        })
    };
    const handleRate = async () => {
        const handler = Modal.show({
            content: <Rate onClose={() => handler.close()} />,
            closeOnMaskClick: true,
        })
    };

    if (isLoading) return <div className="flex justify-center items-center h-[100vh]"><SpinLoading color='primary' /></div>;

    console.log(games)

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
                            <div className="text-[#6D6C6B] text-[13px] leading-[23px] font-[400]">
                                活动时间: 06.01周五-06.03周一
                            </div>
                        </div>
                        <div className="flex gap-[5px] items-center">
                            <div className="w-[17px] h-[17px] ">
                                <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/location_n.png" />
                            </div>
                            <div className="text-[#6D6C6B] text-[13px] leading-[23px] font-[400]">
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
                                        {
                                            (games || []).map(x => {
                                                return (
                                                    <div key={x.id} className="flex flex-col shadow rounded-[5px] p-[10px]">
                                                        <div className="flex justify-center items-center gap-[10px]">
                                                            <div className="flex items-center  gap-[15px]">

                                                                <div className="flex flex-col items-center">
                                                                    <div className="w-[40px] h-[40px]">
                                                                        <img
                                                                            className="rounded-full"
                                                                            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head03.jpg"
                                                                        />
                                                                    </div>
                                                                    <div className="opacity-[0.5]">甲</div>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col items-center">
                                                                <div className="w-[70px] p-[3px] text-center rounded-[5px]">
                                                                    {x.isSettled ? `${Number(x.player0Balance)} : ${Number(x.player1Balance)}` : "待揭晓"}

                                                                </div>
                                                                <div className="font-bold">{new Date() > new Date(Number(x.endTime) * 1000) ? '赛后' : '赛前'}</div>
                                                            </div>
                                                            <div className="flex items-center gap-[10px]">
                                                                <div className="flex flex-col items-center ">
                                                                    <div className="w-[40px] h-[40px]">
                                                                        <img
                                                                            className="rounded-full"
                                                                            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head02.jpg"
                                                                        />
                                                                    </div>
                                                                    <div className="opacity-[0.5]">乙</div>
                                                                </div>


                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-[5px] flex-1 mt-[20px]">
                                                            <div className="flex gap-[5px] items-center">
                                                                <div className="w-[17px] h-[17px] ">
                                                                    <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/time_n.png" />
                                                                </div>
                                                                <div className="text-[#6D6C6B] text-[11px] leading-[20px] font-[400]">
                                                                    比赛时间: {new Date(Number(x.startTime) * 1000).toLocaleString()} - {new Date(Number(x.endTime) * 1000).toLocaleString()}
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-[5px] items-center">
                                                                <div className="w-[17px] h-[17px] ">
                                                                    <img src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/common/location_n.png" />
                                                                </div>
                                                                <div className="text-[#6D6C6B] text-[11px] leading-[20px] font-[400]">
                                                                    地址: 四川省成都市武侯区天府大道中段1388号
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {!x.isSettled && <div className="flex justify-center my-[20px] gap-[5px]">

                                                            {(x.players.length < 2 && !x.players.includes(address as `0x${string}`)) && <div
                                                                className="w-[150px] h-[30px] text-center leading-[30px] text-[#454545] font-[700] text-center rounded-[23px]"
                                                                style={{
                                                                    background:
                                                                        "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
                                                                }}
                                                                onClick={() => handleJoinGame(x)}
                                                            >
                                                                加入比赛（{x.players.length}/2）
                                                            </div>}

                                                            {(x.players.length >= 2 && !x.players.includes(address as `0x${string}`)) &&
                                                                <div
                                                                    className="w-[150px] h-[30px] text-center leading-[30px] text-[#454545] font-[700] text-center rounded-[23px]"
                                                                    style={{
                                                                        background:
                                                                            "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
                                                                    }}
                                                                    onClick={() => handleVote(x)}
                                                                >
                                                                    参加投票
                                                                </div>
                                                            }

                                                            {(x.players.includes(address as `0x${string}`)) && <div
                                                                className="w-[150px] h-[30px] text-center leading-[30px] text-[#454545] font-[700] text-center rounded-[23px]"
                                                                style={{
                                                                    background:
                                                                        "linear-gradient( 90deg, #F9A9F2 0%, #B9FBFF 100%)",
                                                                }}

                                                            >
                                                                已参加（{x.players.length}/2）
                                                            </div>}
                                                        </div>}

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Tabs.Tab>
                                <Tabs.Tab
                                    disabled
                                    title={
                                        <div className="text-[#3D3D3D] leading-[20px] font-[600]">
                                            B组小组赛
                                        </div>
                                    }
                                    key="2"
                                ></Tabs.Tab>
                                <Tabs.Tab
                                    disabled
                                    title={
                                        <div className="text-[#3D3D3D] leading-[20px] font-[600]">
                                            半决赛
                                        </div>
                                    }
                                    key="3"
                                ></Tabs.Tab>
                                <Tabs.Tab
                                    disabled
                                    title={
                                        <div className="text-[#3D3D3D] leading-[20px] font-[600]">
                                            决赛
                                        </div>
                                    }
                                    key="4"
                                ></Tabs.Tab>
                            </Tabs>
                        </CapsuleTabs.Tab>
                        <CapsuleTabs.Tab title="赛事评分" key="vegetables" disabled>
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
                                                        <div className="opacity-[0.5]">甲</div>
                                                    </div>
                                                    <div>编号：18</div>
                                                    <div>项目：Match P</div>
                                                    <div>
                                                        平均分：加载中...
                                                    </div>
                                                </div>

                                                <div className="flex  flex-col items-center  gap-[15px]">
                                                    <div>
                                                        创新性：加载中...
                                                    </div>
                                                    <div>
                                                        完整性：加载中...
                                                    </div>
                                                    <div>
                                                        商业价值：加载中...
                                                    </div>
                                                    <div>
                                                        技术实现：加载中...
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
                                    disabled
                                    title={
                                        <div className="text-[#3D3D3D] leading-[20px] font-[600]">
                                            B组小组赛
                                        </div>
                                    }
                                    key="2"
                                ></Tabs.Tab>
                                <Tabs.Tab
                                    disabled
                                    title={
                                        <div className="text-[#3D3D3D] leading-[20px] font-[600]">
                                            半决赛
                                        </div>
                                    }
                                    key="3"
                                ></Tabs.Tab>
                                <Tabs.Tab
                                    disabled
                                    title={
                                        <div className="text-[#3D3D3D] leading-[20px] font-[600]">
                                            决赛
                                        </div>
                                    }
                                    key="4"
                                ></Tabs.Tab>
                            </Tabs>
                        </CapsuleTabs.Tab>
                        <CapsuleTabs.Tab title="赛事投资" key="animals" disabled></CapsuleTabs.Tab>
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

export const useCreateGame = (onSuccess?: () => void) => {
    const { writeContractAsync } = useWriteContract();
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
    const {
        isSuccess: isTxSuccess, isError
    } = useWaitForTransactionReceipt({
        hash: txHash,
        query: { enabled: !!txHash },
    });
    useEffect(() => {
        if (isTxSuccess) {
            Toast.show({ content: "赛事创建成功！" });
            onSuccess?.();
            // 清除交易哈希，避免重复处理
            setTxHash(undefined);
        }
    }, [isTxSuccess, onSuccess]);

    useEffect(() => {
        if (isError) {
            Toast.show({ content: "赛事创建交易执行失败！" });
            console.error("赛事创建交易执行失败！");
        }
    }, [isError])

    const createGame = async (name: string, startTime: bigint, endTime: bigint) => {
        try {
            Toast.show({ icon: "loading", duration: 0 });
            const hash = await writeContractAsync({
                address: matchPAddress,
                abi: matchPABI,
                functionName: "createGame",
                args: [name, startTime, endTime],
            });
            setTxHash(hash);
            return hash;
        } catch (err) {
            Toast.show({ content: "创建游戏失败" });
            console.error("创建游戏失败:", err);
            throw err;
        } finally {
            Toast.clear();
        }
    };

    return { createGame };
}

export const useJoinGame = (onSuccess?: () => void) => {
    const { writeContractAsync } = useWriteContract();
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
    const {
        isSuccess: isTxSuccess, isError
    } = useWaitForTransactionReceipt({
        hash: txHash,
        query: { enabled: !!txHash },
    });
    useEffect(() => {
        if (isTxSuccess) {
            Toast.show({ content: "加入游戏成功！" });
            onSuccess?.();
            // 清除交易哈希，避免重复处理
            setTxHash(undefined);
        }
    }, [isTxSuccess, onSuccess]);

    useEffect(() => {
        if (isError) {
            Toast.show({ content: "加入游戏交易执行失败！" });
            console.error("加入游戏交易执行失败！");
        }
    }, [isError])

    const joinGame = async (gameId: bigint) => {
        try {
            Toast.show({ icon: "loading", duration: 0 });
            const hash = await writeContractAsync({
                address: matchPAddress,
                abi: matchPABI,
                functionName: "joinGame",
                args: [gameId],
            });
            setTxHash(hash);
            return hash;
        } catch (err) {
            Toast.show({ content: "加入创建游戏失败" });
            console.error("加入游戏失败:", err);
            throw err;
        } finally {
            Toast.clear();
        }
    };

    return { joinGame };
}
const useVote = (onSuccess?: () => void) => {
    // 初始化 vote 交易的写入逻辑
    const { writeContractAsync } = useWriteContract();

    // 存储交易哈希
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

    // 使用 useWaitForTransactionReceipt 监听交易状态
    const { isSuccess: isVoteConfirmed, isError } = useWaitForTransactionReceipt({
        hash: txHash,
        query: { enabled: !!txHash },
    });

    // 当交易确认后触发 onSuccess 回调，比如刷新游戏列表
    useEffect(() => {
        if (isVoteConfirmed) {
            Toast.show({ content: "投票成功！" });
            onSuccess?.();
            // 清除交易哈希，防止重复处理
            setTxHash(undefined);
        }
    }, [isVoteConfirmed, onSuccess]);

    useEffect(() => {
        if (isError) {
            Toast.show({ content: "投票交易执行失败！" });
            console.error("投票交易执行失败！");
        }
    }, [isError])
    const vote = async (
        gameId: bigint,
        player: `0x${string}`,
        amount: bigint
    ) => {
        try {
            Toast.show({ icon: "loading", duration: 0 });
            const hash = await writeContractAsync({
                address: matchPAddress,
                abi: matchPABI,
                functionName: "vote",
                args: [gameId, player, amount],
            });
            setTxHash(hash);
            return hash;
        } catch (err) {
            Toast.show({ content: "投票失败！" });
            console.error("投票失败:", err);
            throw err;
        } finally {
            Toast.clear();
            Toast.show({ content: "交易已提交，等待确认..." });
        }
    };

    return { vote };
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

const Rate = ({ onClose }: { onClose: Function }) => {
    // 创新性，完整性，商业价值，技术实现 【1-5】
    const items = [
        { label: "创新性", value: "creativity" },
        { label: "完整性", value: "completeness" },
        { label: "商业价值", value: "business" },
        { label: "技术实现", value: "tech" }];
    const max = 5;

    const initialRatings = items.reduce((acc, item) => {
        acc[item.value] = 0;
        return acc;
    }, {} as Record<string, number>);

    const [ratings, setRatings] = useState<Record<string, number>>(initialRatings); // 存储每个评分项的评分
    // 更新评分
    const updateRating = (item: string, value: number) => {
        setRatings((prev) => ({
            ...prev,
            [item]: value,
        }));
    };

    const handleSubmit = () => {
        onClose()
    }

    return (<div className="flex flex-col gap-[8px]">
        {items.map((item) => (
            <div key={item.label} className="flex justify-center items-center gap-4">
                <span className="w-15">{item.label}</span>
                <StarRate
                    value={ratings[item.value] || 0}
                    max={max}
                    onChange={(n: number) => updateRating(item.value, n)}
                />
                <span>{ratings[item.value] || 0} / {max}</span>
            </div>
        ))}
        <div className="flex justify-center">
            <div
                onClick={handleSubmit}
                className="h-[30px] w-[100px] mt-[20px] bg-[#454545] rounded-full text-center text-[16px] leading-[30px] font-[500] text-[#50F5FF]"
            >
                提交评分
            </div>
        </div>

        {/* {JSON.stringify(ratings,null,2)} */}
    </div>)
}
const StarRate = ({ value, max, onChange }: { value: number, max: number, onChange: Function }) => {
    const handleClick = (value: number) => {
        onChange(value)
    }

    return (<div className="flex gap-[3px]">
        {Array.from({ length: max }, (_, index) => {
            const starValue = index + 1
            const isFilled = starValue <= value
            const src = isFilled ? starFull : starEmpty
            return (
                <img key={starValue} onClick={() => handleClick(starValue)} className="w-[15px] h-[15px] cursor-pointer" src={src} />
            )
        })}
    </div>)
}

const Vote = ({ gameInfo, onClose, onVote }: {
    gameInfo: any,
    onClose: Function, onVote: (gameId: bigint,
        player: `0x${string}`,
        amount: bigint) => Promise<string>
}) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [betAmount, setBetAmount] = useState<number>()

    console.log(gameInfo)
    const handleSubmit = async () => {
        if (!selected) return Toast.show({ content: "请先选择队伍" });
        if (!betAmount) return Toast.show({ content: "请先投注" });

        await onVote(gameInfo.id, selected === 'team1' ? gameInfo.players[0] : gameInfo.players[1], BigInt(betAmount))
        onClose()
    }

    return <div >
        <div className="text-center text-[#342A25] text-[16px] leading-[16px] font-[700]">比赛竞猜</div>

        <div className="flex justify-center items-center gap-[10px] mt-[10px]">
            {/* 第一个队伍 */}
            <div
                className="flex items-center gap-[15px] cursor-pointer"
                onClick={() => setSelected('team1')}
            >
                <div className="flex flex-col items-center gap-1">
                    <div className={`w-[40px] h-[40px] transition-transform ${selected === 'team1' ? 'scale-110 ring-4 ring-[rgba(80,245,255,1)]' : ''
                        } rounded-full p-1`}>
                        <img
                            className="rounded-full w-full h-full"
                            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head03.jpg"
                        />
                    </div>
                    <div className={`font-medium ${selected === 'team1' ? 'text-[rgba(80,245,255,1)] font-bold' : 'text-gray-600'
                        }`}>甲</div>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="font-bold text-xl">VS</div>
            </div>

            {/* 第二个队伍 */}
            <div
                className="flex items-center gap-[10px] cursor-pointer"
                onClick={() => setSelected('team2')}
            >
                <div className="flex flex-col items-center gap-1">
                    <div className={`w-[40px] h-[40px] transition-transform ${selected === 'team2' ? 'scale-110 ring-4 ring-[rgba(80,245,255,1)]' : ''
                        } rounded-full p-1`}>
                        <img
                            className="rounded-full w-full h-full"
                            src="https://goin.obs.cn-north-4.myhuaweicloud.com/acticity/head/head02.jpg"
                        />
                    </div>
                    <div className={`font-medium ${selected === 'team2' ? 'text-[rgba(80,245,255,1)] font-bold' : 'text-gray-600'
                        }`}>乙</div>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center gap-[5px] mt-[30px]">
            <span className="font-bold">投注数</span>

            <Input
                type="number"
                min={100}
                value={String(betAmount)}
                onChange={(value) => setBetAmount(Math.max(1, Number(value)))}
                placeholder="请输入投注数量"
                style={{
                    '--text-align': 'center',
                    '--color': '#454545',
                    '--font-size': '14px',
                }}
                className="!w-[100px] h-[30px]"
            />
        </div>

        <div className="flex justify-center mt-[10px]">
            <div
                className="w-[150px] h-[30px] text-center leading-[30px] text-[#454545] font-[700] rounded-[23px] cursor-pointer hover:opacity-90 transition-opacity"
                style={{
                    background: "linear-gradient(90deg, #F9A9F2 0%, #B9FBFF 100%)",
                }}
                onClick={handleSubmit}
            >
                确认
            </div>
        </div>
    </div>
}