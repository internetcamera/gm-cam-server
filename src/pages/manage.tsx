import React from "react";
import ConnectWalletButton from "@app/components/ConnectWalletButton";
import getContract from "@app/features/getContract";
import { useWallet } from "@gimmixorg/use-wallet";

const ManageSubscriptionState = () => {
  // TODO: fetch subscribe state from contract/graph?

  const { account, provider } = useWallet();

  const unsubscribe = () => {
    console.log("unsubscribing!");
    if (!provider || !account) return alert("Not signed in.");

    const signer = provider.getSigner();
    const gmCam = getContract(signer);
    gmCam.setSubscriptionState(false);
  };

  const subscribe = () => {
    console.log("subscribing!");
    if (!provider || !account) return alert("Not signed in.");

    const signer = provider.getSigner();
    const gmCam = getContract(signer);
    gmCam.setSubscriptionState(true);
  };

  return (
    <div className="index">
      connect your wallet to unsubscribe
      <ConnectWalletButton />
      <button
        onClick={() => {
          unsubscribe();
        }}
      >
        unsubscribe
      </button>
      <button
        onClick={() => {
          subscribe();
        }}
      >
        subscribe
      </button>
      <style jsx>{`
        .index {
        }
      `}</style>
    </div>
  );
};

export default ManageSubscriptionState;
