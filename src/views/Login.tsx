import logo from "/logo.jpeg"
import walletConnect from "../assets/icon/wallet-connect.png"
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const Login = () => {
    const { address } = useAppKitAccount();
    const { open } = useAppKit();
    const navigate = useNavigate();
    const handleClick = () => {
        open()
    }

    useEffect(() => {
        if (address) {
            navigate("/me")
        }
    }, [address, navigate])
    
    return <div className="flex flex-col h-[100vh] justify-center items-center gap-[150px]">
        <img className="w-[120px] rounded-full" src={logo} />
        <div
            onClick={handleClick}
            className="flex justify-center items-center  rounded-full w-[280px] h-[46px]" style={{
                background: "linear-gradient(270deg, #B9FBFF 0%, #F9A9F2 98%)"
            }}>
            <img className="w-[146px] h-[24px]" src={walletConnect} />
        </div>
    </div>
}