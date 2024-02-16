import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { ProgramMetadata } from "@gear-js/api";
import { Button, ModalCloseButton, ModalHeader } from "@chakra-ui/react";
import VacancyCreatorForm from "./VacancyCreatorForm";
import { programIDFT, programMeta } from "consts";

function VacancyCreatorModalContent() {
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api } = useApi();

  const metadata = ProgramMetadata.from(programMeta);

  const signer = async (message: any) => {
    const localaccount = account?.decodedAddress;
    const isVisibleAccount = accounts.some(
      (visibleAccount) => visibleAccount.address === localaccount
    );

    console.log({ localaccount, isVisibleAccount });
    console.log({ localaccount, isVisibleAccount });

    // if (isVisibleAccount) {
    const transferExtrinsic = await api.message.send(message, metadata);

    const injector = await web3FromSource(accounts[0].meta.source);

    return transferExtrinsic
      .signAndSend(
        account?.decodedAddress ?? alert.error("No account"),
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
    // } else {
    //   alert.error("Account not available to sign");
    // }
  };

  const handleSubmit = (vacancyData: any, callback: () => void) => {
    console.log({ vacancyData });
    const dateInSeconds = Math.floor(new Date().getTime() / 1000);

    const message: any = {
      destination: programIDFT,
      payload: {
        CreateVacancy: {
          vacancyName: vacancyData.vacancyName,
          price: Number(vacancyData.price),
          category: Number(vacancyData.category),
          subcategory: Number(vacancyData.subcategory),
          location: vacancyData.location,
          date: dateInSeconds,
          vacancy_type: vacancyData.vacancyType || "Contractor",
          url: vacancyData.url,
          description: vacancyData.description,
        },
      },
      gasLimit: 8998192450,
      value: 0,
    };

    signer(message).finally(callback);
  };

  return <VacancyCreatorForm onSubmit={handleSubmit} />;
}

export { VacancyCreatorModalContent };
