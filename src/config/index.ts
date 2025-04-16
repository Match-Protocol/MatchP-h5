import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { baseSepolia } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { http } from "wagmi";

// Get projectId from https://cloud.reown.com
export const projectId = "b3cb1b018e83c52036050244eb77195b"

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const metadata = {
    name: 'match-protocol-h5',
    description: 'Match P, 全称为Match Protocol, 一个赛事和黑客松相关的比赛开源协议。',
    url: 'https://match-protocol.vercel.app', // origin must match your domain & subdomain
    icons: ['https://match-protocol.vercel.app/logo.jpeg']
}

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [baseSepolia] as [AppKitNetwork, ...AppKitNetwork[]]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks,
    transports: {
        [baseSepolia.id]: http(),
    },
})

export const config = wagmiAdapter.wagmiConfig