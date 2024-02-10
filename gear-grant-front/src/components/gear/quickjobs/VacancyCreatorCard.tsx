import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from "@gear-js/api";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import styles from "../../layout/cards/Card.module.scss";
import VacancyCreatorForm from "./VacancyCreatorForm";
import { programIDFT, programMeta } from "consts";

function VacancyCreatorCard() {
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api } = useApi();

  const metadata = ProgramMetadata.from(programMeta);

  const message: any = {
    destination: programIDFT, // programId
    payload: {
      CreateVacancy: {
        id: 0, // Assuming the ID is auto-generated or irrelevant for creation
        date: Date.now(), // For simplicity, using current timestamp
        price: 300,
        vacancyName: "Some vacancy example V2",
        category: 0, // Set default or collect from user
        subcategory: 0, // Set default or collect from user
        location: "", // Set default or collect from user
        applicantsNumber: 0, // Set default or collect from user
      },
    },
    gasLimit: 8998192450,
    value: 0,
  };

  const signer = async () => {
    const localaccount = account?.address;
    const isVisibleAccount = accounts.some(
      (visibleAccount) => visibleAccount.address === localaccount
    );

    if (isVisibleAccount) {
      // Create a message extrinsic
      const transferExtrinsic = await api.message.send(message, metadata);

      const injector = await web3FromSource(accounts[0].meta.source);

      transferExtrinsic
        .signAndSend(
          account?.address ?? alert.error("No account"),
          { signer: injector.signer },
          ({ status }) => {
            if (status.isInBlock) {
              alert.success(status.asInBlock.toString());
            } else {
              console.log("in process");
              if (status.type === "Finalized") {
                alert.success(status.type);
              }
            }
          }
        )
        .catch((error: any) => {
          console.log(":( transaction failed", error);
        });
    } else {
      alert.error("Account not available to sign");
    }
  };

  const handleSubmit = (e: any) => {
    console.log({ e });
    signer();
  };

  return (
    <Box className={styles.Moduleborderwrap}>
      <Box className={styles.module}>
        <Heading>Create new Vacancy</Heading>
        <Text fontWeight="light">Add your details here.</Text>
        <Flex mt="1rem">
          <VacancyCreatorForm onSubmit={handleSubmit} />
        </Flex>
      </Box>
    </Box>
  );
}

export { VacancyCreatorCard };
