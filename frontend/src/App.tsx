import { useApi, useAccount } from "@gear-js/react-hooks";
import { Routing } from "pages";
import { Header, ApiLoader } from "components";
import { withProviders } from "hocs";
import "App.css";
import { WholeAppContaniner } from "components/page-display/WholeAppContainer";
import { Chart, registerables } from "chart.js";

function Component() {
  Chart.register(...registerables);
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  const isAppReady = isApiReady && isAccountReady;

  return (
    <>
      {/* <Header isAccountVisible={isAccountReady} /> */}
      <WholeAppContaniner>
        <main>{isAppReady ? <Routing /> : <ApiLoader />}</main>
      </WholeAppContaniner>
    </>
  );
}

export const App = withProviders(Component);
