// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import BaseProjectIDL from '../target/idl/base_project.json';
import type { BaseProject } from '../target/types/base_project';

// Re-export the generated IDL and type
export { BaseProject, BaseProjectIDL };

// The programId is imported from the program IDL.
export const BASE_PROJECT_PROGRAM_ID = new PublicKey(BaseProjectIDL.address);

// This is a helper function to get the BaseProject Anchor program.
export function getBaseProjectProgram(provider: AnchorProvider) {
  return new Program(BaseProjectIDL as BaseProject, provider);
}

// This is a helper function to get the program ID for the BaseProject program depending on the cluster.
export function getBaseProjectProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return BASE_PROJECT_PROGRAM_ID;
  }
}
