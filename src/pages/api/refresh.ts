import { getExpiredGMs, getExpiredFilm } from '@app/features/getExpiredGMs';
import { GM_CAM_CONTRACT_ADDRESS } from '@app/features/AddressBook';
import getJsonRpcProvider from '@app/features/getJsonRpcProvider';
import { NextApiHandler } from 'next';
import getContract from '@app/features/getContract';
import { ethers } from 'ethers';
import { sendPushNotifications } from '@server/services/PushNotifications';

const api: NextApiHandler = async (_req, res) => {
  // fetch expired gms & film from subgraph
  const { gms: expiredGms } = await getExpiredGMs();
  const expiredGmIds = expiredGms.map((gm: any) => gm.id);

  const { gmfilms: expiredFilm } = await getExpiredFilm();
  const expiredGmFilmIds = expiredFilm.map((film: any) => film.id);

  await sendPushNotifications();

  if (process.env.PRIVATE_KEY && GM_CAM_CONTRACT_ADDRESS) {
    const signer = new ethers.Wallet(
      process.env.PRIVATE_KEY,
      getJsonRpcProvider()
    );

    const gmCam = getContract(signer);
    let toBurn = expiredGmIds.concat(expiredGmFilmIds);

    if (toBurn.length > 0) {
      console.log("burning first 20 tokens", toBurn.slice(0, 20));
      let tx = await gmCam.burnExpired(toBurn);
      console.log("burn tx", tx.hash);
    }

    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
};

export default api;
