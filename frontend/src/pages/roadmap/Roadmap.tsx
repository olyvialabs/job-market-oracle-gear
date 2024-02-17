import { Box, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { PageInnerContent } from "components/page-display/components/PageInnerContent";

const RoadmapComponent = () => {
  return (
    <VStack divider={<Divider />} spacing={4} align="stretch">
      <Box>
        <Heading size="sm">Graphing Tracking Overtime</Heading>
        <Text>Duration: Feb 20 - Mar 5, 2024</Text>
        <Text>
          Analytics enhancements, designed to provide more insightful data
          visualizations and tracking over time.
        </Text>
      </Box>

      <Box>
        <Heading size="sm">Update Smart Contract with Vara Network</Heading>
        <Text>Duration: Mar 6 - Mar 19, 2024</Text>
        <Text>
          Collaboration with Vara Network to secure and streamline our smart
          contract operations.
        </Text>
      </Box>

      <Box>
        <Heading size="sm">Update Subquery</Heading>
        <Text>Duration: Mar 20 - Apr 2, 2024</Text>
        <Text>
          Optimizing data retrieval to improve listing performance and user
          experience.
        </Text>
      </Box>

      <Box>
        <Heading size="sm">
          Improve UX and Functionality of Landing Page on Subdomain
        </Heading>
        <Text>Duration: Apr 3 - Apr 17, 2024</Text>
        <Text>
          Enhancements to the landing page, aimed at providing a more intuitive
          and engaging user experience.
        </Text>
      </Box>

      <Box>
        <Heading size="sm">Synchronize Job Offers with Quickjobs</Heading>
        <Text>Duration: Apr 18 - May 7, 2024</Text>
        <Text>
          Integration with Quickjobs, making it easier for users to find and
          apply to job offers directly through our platform.
        </Text>
      </Box>

      <Box>
        <Heading size="sm">
          Update Data in Smart Contract: Score, Offers, and Remaining Variables
        </Heading>
        <Text>Duration: May 2 - May 15, 2024</Text>
        <Text>
          Additional variables being introduced to our smart contract, enhancing
          transparency and functionality.
        </Text>
      </Box>

      <Box>
        <Heading size="sm">Documentation</Heading>
        <Text>Duration: May 16 - May 25, 2024</Text>
        <Text>
          Review the updated documentation, providing comprehensive insights
          into our platform's features and capabilities.
        </Text>
      </Box>
    </VStack>
  );
};

function RoadmapPage() {
  return (
    <Box>
      <PageInnerContent title="Roadmap" />
      <Box px={4} pb={4} pt={4}>
        <RoadmapComponent />
      </Box>
    </Box>
  );
}

export { RoadmapPage };
