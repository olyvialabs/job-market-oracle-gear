import {
  Avatar,
  Box,
  Divider,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { CommentLikeButton } from "./CommentLikeButton";

const formatDate = (timestamp: any) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const CommentsList = ({
  comments,
  vacancyId,
  refresh,
}: {
  comments: Array<any>;
  vacancyId: number;
  refresh: () => void;
}) => {
  const truncateAddress = (address: string) => {
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start}...${end}`;
  };
  return (
    <VStack
      divider={<Divider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {comments.map((comment, index) => (
        <HStack key={index} spacing={4}>
          <Avatar name={comment.user} />
          <Box>
            <Tooltip label={comment.user} aria-label="the user address">
              <Text fontWeight="bold" cursor="pointer">
                {truncateAddress(comment.user)}
              </Text>
            </Tooltip>
            <Text color="gray.500" fontSize="sm">
              {formatDate(comment.date)}
            </Text>
            <Text mt={2}>{comment.comment}</Text>
            <CommentLikeButton
              vacancyId={vacancyId}
              commentIndex={index}
              refresh={refresh}
              likes={comment.likes}
            />
          </Box>
        </HStack>
      ))}
    </VStack>
  );
};
