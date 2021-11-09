import { L1_RPC_PROVIDER } from "@app/features/AddressBook";
import { getRecentGMs } from "@app/features/getRecentGMs";
import prisma from "@server/helpers/prisma";
import { providers } from "ethers";
import { Expo, ExpoPushMessage } from "expo-server-sdk";

export const sendPushNotifications = async () => {
  let expo = new Expo();
  const gms = await getRecentGMs();
  const l1Provider = new providers.JsonRpcProvider(L1_RPC_PROVIDER);
  const messages: ExpoPushMessage[] = (
    await Promise.all(
      gms.map(
        async (gm: {
          id: string;
          sender: { id: string };
          recipient: { id: string };
          state: string;
        }) => ({
          to: (
            await prisma.pushTokens.findFirst({
              where: { id: gm.recipient.id.toLowerCase() },
            })
          )?.token,
          sound: "default",
          title: "🌞 new gm 📸",
          body: `${
            (await l1Provider.lookupAddress(gm.sender.id)) ||
            `${gm.sender.id.slice(0, 6)}...${gm.sender.id.slice(-4)}`
          } ${
            gm.state == "INITIATED" ? "sent you a gm!" : "replied to your gm"
          }`,
          badge: 1,
        })
      )
    )
  ).filter((message: any) => !!message.to) as ExpoPushMessage[];
  return await expo.sendPushNotificationsAsync(messages);
};
