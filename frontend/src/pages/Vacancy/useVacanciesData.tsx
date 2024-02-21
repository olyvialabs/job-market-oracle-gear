import { ProgramMetadata } from "@gear-js/api";
import { useApi } from "@gear-js/react-hooks";
import { programIDFT, programMeta } from "consts";
import { useEffect, useState } from "react";

const useVacanciesData = () => {
  const { api } = useApi();
  const [vacancies, setVacancies] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    queryVacancy();
  }, []);

  const queryVacancy = async () => {
    setIsLoading(true);
    const metadata = ProgramMetadata.from(programMeta);
    const data = await api.programState.read(
      {
        programId: programIDFT,
        payload: "0x",
      },
      metadata
    );
    const wholeData = data?.toJSON() as any;
    console.log({ a: wholeData.vacancies });
    console.log({ a: data?.toJSON() });

    let allData =
      (wholeData?.vacancies || []).map((item: any) => item[1]) || [];
    allData = allData.sort((a: any, b: any) => a.id - b.id);
    setVacancies(allData);
    setIsLoading(false);
  };

  return { vacancies, loading, refetch: queryVacancy };
};

export { useVacanciesData };
