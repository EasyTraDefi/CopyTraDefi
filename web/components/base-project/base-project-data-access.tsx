'use client';

import {
  getBaseProjectProgram,
  getBaseProjectProgramId,
} from '@base-project/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useBaseProjectProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getBaseProjectProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getBaseProjectProgram(provider);

  const accounts = useQuery({
    queryKey: ['base-project', 'all', { cluster }],
    queryFn: () => program.account.baseProject.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['base-project', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ baseProject: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function useBaseProjectProgramAccount({
  account,
}: {
  account: PublicKey;
}) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useBaseProjectProgram();

  const accountQuery = useQuery({
    queryKey: ['base-project', 'fetch', { cluster, account }],
    queryFn: () => program.account.baseProject.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['base-project', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ baseProject: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['base-project', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods.decrement().accounts({ baseProject: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['base-project', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods.increment().accounts({ baseProject: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['base-project', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ baseProject: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
