//import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { useAccount } from "@gear-js/react-hooks";
import { isLoggedIn } from "utils";
import { LOCAL_STORAGE } from "consts";
import { AccountButton } from "../account-button";
import styles from "./Accounts.module.scss";
type InjectedAccountWithMeta = any;
type Props = {
  list: InjectedAccountWithMeta[];
  onChange: () => void;
  fromModal?: boolean;
};

function Accounts({ list, onChange, fromModal }: Props) {
  const { login } = useAccount();
  const isAnyAccount = list.length > 0;

  const handleAccountButtonClick = (account: InjectedAccountWithMeta) => {
    login(account);
    localStorage.setItem(LOCAL_STORAGE.ACCOUNT, account.address);
    onChange();
  };

  const getAccounts = () =>
    list.map((account) => (
      <li key={account.address}>
        <AccountButton
          address={account.address}
          name={account.meta.name}
          isActive={isLoggedIn(account)}
          onClick={() => handleAccountButtonClick(account)}
          block
          fromModal={fromModal}
        />
      </li>
    ));

  return isAnyAccount ? (
    <ul className={styles.list}>{getAccounts()}</ul>
  ) : (
    <p style={{ color: "white" }}>
      No accounts found. Please open Polkadot extension, create a new account or
      import existing one and reload the page.
    </p>
  );
}

export { Accounts };
