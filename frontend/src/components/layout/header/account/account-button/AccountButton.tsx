import Identicon from "@polkadot/react-identicon";
import { buttonStyles } from "@gear-js/ui";
import { Button, Text } from "@chakra-ui/react";
import "./style.css";

type Props = {
  address: string;
  name: string | undefined;
  onClick: () => void;
  isActive?: boolean;
  block?: boolean;
  fromModal?: boolean;
};

function AccountButton({
  fromModal,
  address,
  name,
  onClick,
  isActive,
  block,
}: Props) {
  return (
    <Button
      border="1px"
      backgroundColor="transparent"
      borderRadius="30px"
      onClick={onClick}
    >
      <Identicon
        value={address}
        className={buttonStyles.icon}
        theme="polkadot"
        size={28}
      />
      <Text pl={2} color={fromModal ? "white" : "black"}>
        {name}
      </Text>
    </Button>
  );
}

export { AccountButton };
