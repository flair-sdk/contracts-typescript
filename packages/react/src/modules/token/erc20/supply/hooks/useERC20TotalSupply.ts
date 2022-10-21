import { BigNumberish } from 'ethers';

import {
  PredefinedReadContractConfig,
  useContractRead,
} from '../../../../../common';

export const useERC20TotalSupply = (config: PredefinedReadContractConfig) => {
  return useContractRead<BigNumberish>({
    contractInterface: ['function totalSupply() view returns (uint256)'],
    functionName: 'totalSupply()',
    ...config,
  });
};
