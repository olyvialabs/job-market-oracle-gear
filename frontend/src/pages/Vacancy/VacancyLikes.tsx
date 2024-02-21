import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from "@gear-js/api";
import { programIDFT, programMeta } from "consts";
import LikesListModal from "./LikesListModal";

function VacancyLikes({
  vacancyId,
  refresh,
  likes,
}: {
  vacancyId: number;
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
    // const isVisibleAccount = accounts.some(
    //   (visibleAccount) => visibleAccount.address === localAccount
    // );

    console.log({ passed: true });
    // if (!isVisibleAccount) {
    //   alert.error("Account not available to sign");
    //   return;
    // }

    console.log({ passed: true });
    const transferExtrinsic = await api.message.send(message, metadata);
    const injector = await web3FromSource(accounts[0].meta.source);

    return transferExtrinsic
      .signAndSend(localAccount, { signer: injector.signer }, ({ status }) => {
        if (status.isInBlock) {
          alert.success(
            `Comment submitted in block: ${status.asInBlock.toString()}`
          );
          refresh();
        } else if (status.type === "Finalized") {
          alert.success("Comment transaction finalized");
          setButtonLoading(false);
        } else {
          console.log("Submitting comment");
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
        LikeVacancy: {
          vacancy_id: vacancyId,
        },
      },
      gasLimit: 8998192450,
      value: 0,
    };

    await signer(message);
  };

  const likesCount = likes.filter(
    (addr: any) => addr.user === account?.decodedAddress
  ).length;

  const isInterested = (likes || []).length > 0 && likesCount % 2 !== 0;

  const countOccurrences = (likes || []).reduce((acc, { user }) => {
    acc[user] = acc[user] ? 0 : 1;
    return acc;
  }, {});

  // Filtrar direcciones que aparecen un número impar de veces y obtener sus claves (direcciones)
  const uniqueImparAddresses = Object.entries(countOccurrences)
    .filter(([_, count]) => (count as any) % 2 !== 0)
    .map(([address, _]) => address);

  return (
    <>
      <Button
        onClick={handleSubmit}
        colorScheme="red"
        variant="solid"
        isLoading={buttonLoading}
        sx={{
          background: isInterested ? "red.500" : "gray.400",
          color: "white",
          _hover: {
            bg: isInterested ? "red.600" : "gray.500",
          },
          filter: isInterested ? "none" : "grayscale(100%)",
        }}
      >
        {isInterested ? "♥️ Liked" : "♡ Like"}
      </Button>
      <LikesListModal
        likesQuantity={uniqueImparAddresses.length}
        likes={likes}
      />
    </>
  );
}

export { VacancyLikes };
