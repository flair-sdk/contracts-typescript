import {
  PredefinedReadContractConfig,
  useContractRead,
} from '@0xflair/react-common';
import { BigNumberish } from 'ethers';

type Config = PredefinedReadContractConfig<[BigNumberish[]]> & {
  ticketTokenIds?: BigNumberish[];
};

export const useStreamTotalClaimableBulk = ({
  enabled,
  ticketTokenIds,
  ...restOfConfig
}: Config) => {
  return useContractRead<BigNumberish, Config['args']>({
    contractFqn: 'streams/ERC721/core/ERC721SingleTokenDistributor',
    functionName: 'getTotalClaimableBulk',
    args: ticketTokenIds ? [ticketTokenIds] : [[0]],
    enabled: ticketTokenIds && ticketTokenIds.length > 0 && enabled,
    ...restOfConfig,
  });
};
