import { useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from "@gear-js/api";
import { programIDFT, programMeta } from "consts";

function CommentLikeButton({
  vacancyId,
  commentIndex,
  refresh,
  likes,
}: {
  vacancyId: number;
  commentIndex: number;
  refresh: () => void;
  likes: Array<any>;
}) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api } = useApi();
  const metadata = ProgramMetadata.from(programMeta);

  const signer = async (message: any) => {
    const localAccount: any = account?.decodedAddress;
    const transferExtrinsic = await api.message.send(message, metadata);
    const injector = await web3FromSource(accounts[0].meta.source);

    return transferExtrinsic
      .signAndSend(localAccount, { signer: injector.signer }, ({ status }) => {
        if (status.isInBlock) {
          alert.success(
            `Like submitted in block: ${status.asInBlock.toString()}`
          );
          refresh();
        } else if (status.type === "Finalized") {
          alert.success("Like transaction finalized");
          setButtonLoading(false);
        } else {
          console.log("Submitting like");
        }
      })
      .catch((error) => {
        console.error(":( transaction failed", error);
        alert.error("Transaction failed");
        refresh();
        setButtonLoading(false);
      })
      .finally(() => {});
  };

  const handleSubmit = async () => {
    setButtonLoading(true);

    const message = {
      destination: programIDFT,
      payload: {
        LikeComment: {
          vacancy_id: vacancyId,
          comment_index: commentIndex,
        },
      },
      gasLimit: 8998192450,
      value: 0,
    };

    await signer(message);
  };

  const countOccurrences = (likes || []).reduce((acc: any, { user }: any) => {
    acc[user] = acc[user] ? 0 : 1;
    return acc;
  }, {});

  const uniqueImparAddresses = Object.entries(countOccurrences)
    .filter(([_, count]) => (count as any) % 2 !== 0)
    .map(([address, _]) => address);

  const isLiked = uniqueImparAddresses.includes(account?.decodedAddress || "");
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        onClick={handleSubmit}
        colorScheme="red"
        variant="solid"
        isLoading={buttonLoading}
        w="fit-content"
        p={1}
        h={7}
        sx={{
          background: isLiked ? "red.500" : "gray.400",
          color: "white",
          _hover: {
            bg: isLiked ? "red.600" : "gray.500",
          },
          filter: isLiked ? "none" : "grayscale(100%)",
        }}
      >
        {`${isLiked ? "♥️" : "♡ "} ${
          uniqueImparAddresses.length > 0
            ? `${uniqueImparAddresses.length}`
            : ""
        }`}
        {}
      </Button>
    </div>
  );
}

export { CommentLikeButton };
