import * as React from "react";
import { Signer } from "ethers";
import { useContractDeployer } from "../../../common/useContractDeployer";
import { Version, loadContract } from "@0xflair/contracts-registry";

export type ERC721FullFeaturedContractDeployerConfig = {
  version?: Version;
  signer?: Signer;
};

export type ERC721FullFeaturedContractArguments = [
  collectionName: string,
  collectionSymbol: string,
];

export const useERC721FullFeaturedContractDeployer = <Contract = any>({
  version,
  signer,
}: ERC721FullFeaturedContractDeployerConfig) => {
  const contract = loadContract(
    "collections/ERC721/presets/ERC721FullFeaturedCollection",
    version
  );
  return useContractDeployer<ERC721FullFeaturedContractArguments>({
    contractInterface: contract.artifact.abi,
    contractByteCode: contract.artifact.bytecode,
    signer,
  });
};
