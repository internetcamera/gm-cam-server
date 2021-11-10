import React, { useEffect, useCallback } from "react";

import { useWallet } from "@gimmixorg/use-wallet";
import WalletConnectProvider from "@walletconnect/web3-provider";

const ConnectWalletButton = () => {
  const { connect, account, web3Modal } = useWallet();

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.NEXT_PUBLIC_INFURA_API_KEY as string,
      },
    },
  };

  const connectWallet = useCallback(() => {
    connect({
      cacheProvider: true,
      providerOptions: providerOptions,
      theme: "dark",
    });
  }, []);

  // try an initial connect, we might be cached
  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connectWallet();
    }
  }, [connectWallet]);

  return (
    <div className="account-container">
      {account ? (
        <div className="account">
          <span>{account}</span>
        </div>
      ) : (
        <button
          className="connect-wallet-button"
          onClick={() => connectWallet()}
        >
          connect wallet
        </button>
      )}
      <style jsx>{``}</style>
    </div>
  );
};

export default ConnectWalletButton;
