import { request, gql } from "graphql-request";
import dayjs from "dayjs";

export const GRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/internetcamera/gm-cam";

const GRAPH_QUERY_RECENT_GMS = gql`
  query RecentGms($from: BigInt) {
    gms(where: { createdAt_gt: $from }) {
      id
      recipient {
        id
      }
      sender {
        id
      }
      ipfsHash
      state
    }
  }
`;

export const getRecentGMs = async () => {
  const aMinuteAgo = dayjs().subtract(1, "minute").unix();
  const data = await request(GRAPH_URL, GRAPH_QUERY_RECENT_GMS, {
    from: aMinuteAgo,
  });
  return data?.gms;
};
