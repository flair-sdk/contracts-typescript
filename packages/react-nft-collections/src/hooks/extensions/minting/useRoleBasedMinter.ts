import { Version } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { Provider } from '@ethersproject/providers';
import { BigNumberish, BytesLike, Signer } from 'ethers';

type Config = {
  version?: Version;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
  toAddress?: BytesLike;
  mintCount?: BigNumberish;
};

type ArgsType = [toAddress: BytesLike, mintCount: BigNumberish];

export const useRoleBasedMinter = ({
  version,
  contractAddress,
  signerOrProvider,
  toAddress,
  mintCount,
}: Config) => {
  return useContractWriteAndWait<ArgsType>({
    version,
    contractKey: 'collections/ERC721/extensions/ERC721RoleBasedMintExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'mintByRole',
    args: [toAddress, mintCount] as ArgsType,
  });
};
