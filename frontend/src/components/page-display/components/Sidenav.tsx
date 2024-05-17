import { Box, Button, Image, Text } from "@chakra-ui/react";
import styles from "../page-display.module.scss";
import Logo from "../../../assets/images/vara street logoNAVCOLOR.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { VacancyCreatorModal } from "components/gear/quickjobs/VacancyCreatorModal";
import { Account } from "components/layout/header/account";

const menuItemsData = [
  {
    content: "Home",
    path: "/",
    icon: (
      <svg
        viewBox="0 0 29 26"
        height={24}
        width={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.6182 1.07854C14.0301 0.725448 14.638 0.725448 15.0499 1.07854L27.6983 11.92C28.4737 12.5846 28.0037 13.8552 26.9824 13.8552H24.9341V24.7552C24.9341 25.3627 24.4416 25.8552 23.8341 25.8552H17.6675H11.0008H4.83407C4.22656 25.8552 3.73407 25.3627 3.73407 24.7552V13.8552H1.6857C0.664449 13.8552 0.194441 12.5846 0.969828 11.92L13.6182 1.07854ZM14.3341 2.04543L1.95602 12.6552H3.83407C4.44158 12.6552 4.93407 13.1477 4.93407 13.7552V24.6552H10.4008V16.4218C10.4008 15.8143 10.8933 15.3219 11.5008 15.3219H17.1675C17.775 15.3219 18.2675 15.8143 18.2675 16.4219V24.6552H23.7341V13.7552C23.7341 13.1477 24.2266 12.6552 24.8341 12.6552H26.7121L14.3341 2.04543ZM17.0675 24.6552V16.5219H11.6008V24.6552H17.0675Z"
          fill="#202020"
        />
      </svg>
    ),
  },
  {
    content: "Graphs",
    path: "/graphs",
    icon: (
      <svg height={24} width={24} viewBox="0 0 256 256">
        <defs></defs>
        <g
          style={{
            stroke: "none",
            strokeWidth: 0,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "none",
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <path
            d="M 22.801 90 H 9.875 c -2.461 0 -4.463 -2.002 -4.463 -4.463 V 58.453 c 0 -2.461 2.002 -4.463 4.463 -4.463 h 12.926 c 2.461 0 4.464 2.002 4.464 4.463 v 27.084 C 27.265 87.998 25.263 90 22.801 90 z M 9.875 56.957 c -0.825 0 -1.496 0.671 -1.496 1.496 v 27.084 c 0 0.825 0.671 1.496 1.496 1.496 h 12.926 c 0.825 0 1.497 -0.671 1.497 -1.496 V 58.453 c 0 -0.825 -0.671 -1.496 -1.497 -1.496 H 9.875 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
          />
          <path
            d="M 51.463 90 H 38.537 c -2.461 0 -4.464 -2.002 -4.464 -4.463 V 40.279 c 0 -2.461 2.002 -4.464 4.464 -4.464 h 12.926 c 2.461 0 4.463 2.002 4.463 4.464 v 45.257 C 55.926 87.998 53.924 90 51.463 90 z M 38.537 38.783 c -0.825 0 -1.497 0.671 -1.497 1.497 v 45.257 c 0 0.825 0.671 1.496 1.497 1.496 h 12.926 c 0.825 0 1.496 -0.671 1.496 -1.496 V 40.279 c 0 -0.825 -0.671 -1.497 -1.496 -1.497 H 38.537 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
          />
          <path
            d="M 80.124 90 H 67.198 c -2.461 0 -4.463 -2.002 -4.463 -4.463 V 4.464 C 62.735 2.002 64.737 0 67.198 0 h 12.926 c 2.462 0 4.464 2.002 4.464 4.464 v 81.073 C 84.588 87.998 82.586 90 80.124 90 z M 67.198 2.967 c -0.825 0 -1.496 0.671 -1.496 1.497 v 81.073 c 0 0.825 0.671 1.496 1.496 1.496 h 12.926 c 0.826 0 1.497 -0.671 1.497 -1.496 V 4.464 c 0 -0.825 -0.671 -1.497 -1.497 -1.497 H 67.198 z"
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeLinejoin: "miter",
              strokeMiterlimit: 10,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            transform=" matrix(1 0 0 1 0 0) "
          />
        </g>
      </svg>
    ),
  },
  // {
  //   content: "Roadmap",
  //   path: "/roadmap",
  //   icon: (
  //     <svg
  //       fill="#000000"
  //       height={24}
  //       width={24}
  //       viewBox="0 0 32 32"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path d="M12,30H4a2.0023,2.0023,0,0,1-2-2V24a2.0023,2.0023,0,0,1,2-2h8a2.0023,2.0023,0,0,1,2,2v4A2.0023,2.0023,0,0,1,12,30ZM4,24v4h8V24Z" />
  //       <path d="M28,20H12a2.0023,2.0023,0,0,1-2-2V14a2.0023,2.0023,0,0,1,2-2H28a2.0023,2.0023,0,0,1,2,2v4A2.0023,2.0023,0,0,1,28,20ZM12,14v4H28V14Z" />
  //       <path d="M16,10H4A2.0023,2.0023,0,0,1,2,8V4A2.0023,2.0023,0,0,1,4,2H16a2.0023,2.0023,0,0,1,2,2V8A2.0023,2.0023,0,0,1,16,10ZM4,4V8H16V4Z" />
  //     </svg>
  //   ),
  // },
];

export function MenuItem({
  item,
  onClick,
  isActive,
}: {
  item: any;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <Box>
      <Button className={styles.menuItem} onClick={onClick}>
        {item.icon}
        <Text
          fontWeight={isActive ? "bold" : "normal"}
          style={{ display: "flex", flex: 1, marginLeft: 8 }}
        >
          {item.content}
        </Text>
      </Button>
    </Box>
  );
}

function Sidenav({ isMobile }: { isMobile?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box paddingRight={4}>
      <Box
        display="flex"
        justifyContent={isMobile ? "center" : "flex-end"}
        alignItems={isMobile ? "center" : "flex-end"}
      >
        <Image
          h="6rem"
          src={"https://quickjobs.app/img/quickjob-beta-icon.png"}
          onClick={() => navigate("/")}
          mr={12}
        />
      </Box>
      {isMobile ? <Account /> : null}
      <Box
        flexDir="column"
        display="flex"
        justifyContent={isMobile ? "center" : "flex-end"}
        alignItems={isMobile ? "center" : "flex-end"}
        mt={-2}
      >
        <Box>
          {menuItemsData.map((item) => (
            <MenuItem
              item={item}
              isActive={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
              }}
            />
          ))}
          <VacancyCreatorModal />
        </Box>
      </Box>
      {isMobile && (
        <Box display={"flex"} flexDir="column" p={2}>
          <Box w="100%" flex={1} mt={12}>
            <Text fontWeight="bold" fontSize="lg">
              Powered by
            </Text>
            <Box flex={1} display="flex" flexDir="row">
              <a href="https://vara.network/">
                <Image
                  w={10}
                  h={10}
                  src="https://img.cryptorank.io/coins/vara_network1695313579900.png"
                />
              </a>
              <a href="https://gear-tech.io/">
                <Image
                  w={12}
                  h={12}
                  src="https://miro.medium.com/v2/resize:fit:2400/1*qYGZ6sP8phkHii-kTU7sgA.png"
                />
              </a>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export { Sidenav };
