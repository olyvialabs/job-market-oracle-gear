import { Box, IconButton, StatArrow, Text } from "@chakra-ui/react";
import { SearchVacancyModal } from "components/gear/quickjobs/SearchVacancyModal";
import { useNavigate } from "react-router-dom";
import { SidenavDrawer } from "./SidenavDrawer";

const PageInnerContent = ({
  title,
  goBack,
}: {
  title: string;
  goBack?: boolean;
}) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Box
        flexDir="row"
        display="flex"
        justifyContent="space-between"
        borderBottom={"1px solid var(--chakra-colors-chakra-border-color)"}
        pb={2}
        px={4}
      >
        <Box mt={4}>
          {goBack ? (
            <IconButton
              onClick={handleGoBack}
              mt={-1}
              aria-label="Go back"
              icon={
                <svg
                  className="svg-icon"
                  width={22}
                  height={22}
                  style={{
                    verticalAlign: "middle",
                    fill: "currentColor",
                    overflow: "hidden",
                  }}
                  viewBox="0 0 1024 1024"
                  version="1.1"
                >
                  <path d="M853.333333 469.333333H334.08l238.293333-238.293333L512 170.666667 170.666667 512l341.333333 341.333333 60.373333-60.373333L334.08 554.666667H853.333333v-85.333334z" />
                </svg>
              }
            />
          ) : null}
          <SidenavDrawer />
        </Box>
        <Box mt={4}>
          <Text textAlign="center" fontSize="xl" fontWeight="semibold">
            {title}
          </Text>
        </Box>
        <Box mt={-1}>
          <SearchVacancyModal />
        </Box>
      </Box>
    </>
  );
};

export { PageInnerContent };
