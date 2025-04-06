import {
  useDisconnect,
  useAppKit,
  useAppKitAccount,
} from "@reown/appkit/react";

export const Me = () => {
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAppKitAccount();
  const { open } = useAppKit();

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  return (
    <div>
      {!isConnected && <button onClick={() => open()}>Open</button>}
      {isConnected && <p>{address}</p>}
      {isConnected && <button onClick={handleDisconnect}>Disconnect</button>}
    </div>
  );
};
