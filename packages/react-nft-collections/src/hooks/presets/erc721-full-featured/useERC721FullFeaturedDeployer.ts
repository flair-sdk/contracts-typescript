import { ContractVersion, loadContract } from '@0xflair/contracts-registry';
import { useContractDeployer } from '@0xflair/react-common';
import { BigNumberish, BytesLike, Signer } from 'ethers';

export type ERC721FullFeaturedContractDeployerConfig = {
  contractVersion?: ContractVersion;
  signer?: Signer;
};

export type ERC721FullFeaturedContractArguments = [
  [
    collectionName: string,
    collectionSymbol: string,
    collectionMetadataUri: string,
    placeholderMetadataUri: string,
    maxSupply: BigNumberish,
    preSalePrice: BigNumberish,
    preSaleMaxPerWallet: BigNumberish,
    publicSalePrice: BigNumberish,
    maxMintPerTx: BigNumberish,
    defaultRoyaltyAddress: BytesLike,
    defaultRoyaltyBps: BigNumberish,
    openSeaProxyRegistryAddress?: string,
    openSeaExchangeAddress?: string,
    trustedForwarder?: string
  ]
];

export const useERC721FullFeaturedContractDeployer = <Contract = any>({
  contractVersion,
  signer,
}: ERC721FullFeaturedContractDeployerConfig = {}) => {
  const contract = loadContract(
    'collections/ERC721/presets/ERC721FullFeaturedCollection',
    contractVersion
  );
  return useContractDeployer<ERC721FullFeaturedContractArguments>({
    contractInterface: contract.artifact.abi,
    contractByteCode: contract.artifact.bytecode,
    signer,
  });
};
