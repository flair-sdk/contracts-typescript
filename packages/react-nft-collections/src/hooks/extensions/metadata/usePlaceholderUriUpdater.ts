import { ContractVersion } from '@0xflair/contracts-registry';
import { useContractWriteAndWait } from '@0xflair/react-common';
import { BytesLike } from '@ethersproject/bytes';
import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';

type Config = {
  contractVersion?: ContractVersion;
  contractAddress?: string;
  signerOrProvider?: Signer | Provider | null;
};

export const usePlaceholderUriUpdater = ({
  contractVersion,
  contractAddress,
  signerOrProvider,
}: Config) => {
  return useContractWriteAndWait<[BytesLike]>({
    contractVersion,
    contractFqn:
      'collections/ERC721/extensions/ERC721PrefixedMetadataExtension',
    contractAddress,
    signerOrProvider,
    functionName: 'setPlaceholderURI',
  });
};
