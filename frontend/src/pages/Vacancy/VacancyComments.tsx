import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Text,
  Textarea,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from "@gear-js/api";
import { programIDFT, programMeta } from "consts";
import { CommentsList } from "./CommentsList";

function VacancyComments({
  vacancyId,
  refresh,
  comments,
}: {
  vacancyId: number;
  refresh: () => void;
  comments: Array<any>;
}) {
  const [submitedWithoutComment, setSubmitedWithoutComment] = useState(false);
  const [comment, setComment] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api } = useApi();
  const metadata = ProgramMetadata.from(programMeta);

  const handleChange = (event: any) => setComment(event.target.value);

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
    setSubmitedWithoutComment(false);
    if (!comment) {
      alert.error("Please enter a comment");
      setSubmitedWithoutComment(true);
      return;
    }
    setButtonLoading(true);

    const message = {
      destination: programIDFT,
      payload: {
        CommentOnVacancy: {
          vacancy_id: vacancyId,
          comment,
        },
      },
      gasLimit: 8998192450,
      value: 0,
    };

    const a = await signer(message);
    console.log(a);
    setComment("");
  };

  return (
    <>
      <Text fontSize="lg" fontWeight="bold" mt={4}>
        Comments{" "}
        <span style={{ color: "gray" }}>({comments.length} comments)</span>
      </Text>
      <HStack spacing={4} align="start">
        <Avatar src="https://bit.ly/broken-link" name="0" size="md" />
        <Box flex="1">
          <Textarea
            value={comment}
            colorScheme="orange"
            ringColor="orange.400"
            ringOffsetColor="orange.400"
            focusBorderColor="orange.400"
            onChange={handleChange}
            placeholder="Any comments regarding this vacancy?"
            size="sm"
            resize="vertical"
            minHeight="100px"
          />
          <Button
            colorScheme="orange"
            mt={2}
            variant={!comment ? "ghost" : "solid"}
            onClick={handleSubmit}
            disabled={!comment}
            w={"100%"}
            mb={1}
            isLoading={buttonLoading}
          >
            Send
          </Button>
          <Divider mb={4} />
          {submitedWithoutComment && !comment && (
            <Text color="red.500" textAlign="center" mb={4}>
              Please enter a comment before submitting.
            </Text>
          )}
        </Box>
      </HStack>
      <CommentsList
        comments={comments}
        refresh={refresh}
        vacancyId={vacancyId}
      />
    </>
  );
}

export { VacancyComments };
