import { useState } from "react";
import { useAccount } from "@gear-js/react-hooks";
import { AccountsModal } from "./accounts-modal";
import { Wallet } from "./wallet";
import styles from "./wallet/Wallet.module.scss";
import { Button } from "@chakra-ui/react";

function Account() {
  const { account: accountUntyped, accounts } = useAccount();
  const account = accountUntyped as any;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {account ? (
        <Wallet
          balance={account.balance}
          address={account.decodedAddress}
          name={account.meta.name}
          onClick={openModal}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ marginTop: 30, marginBottom: 15 }}>
            To continue into the platform, please first connect your wallet
          </span>
          <div>
            <Button
              className={styles.connectWallet}
              type="button"
              onClick={openModal}
            >
              Connect Your Wallet
            </Button>
          </div>
        </div>
      )}
      {isModalOpen && <AccountsModal accounts={accounts} close={closeModal} />}
    </>
  );
}

export { Account };
