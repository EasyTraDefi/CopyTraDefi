import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { BaseProject } from '../target/types/base_project';

describe('base-project', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.BaseProject as Program<BaseProject>;

  const baseProjectKeypair = Keypair.generate();

  it('Initialize BaseProject', async () => {
    await program.methods
      .initialize()
      .accounts({
        baseProject: baseProjectKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([baseProjectKeypair])
      .rpc();

    const currentCount = await program.account.baseProject.fetch(
      baseProjectKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment BaseProject', async () => {
    await program.methods
      .increment()
      .accounts({ baseProject: baseProjectKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.baseProject.fetch(
      baseProjectKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment BaseProject Again', async () => {
    await program.methods
      .increment()
      .accounts({ baseProject: baseProjectKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.baseProject.fetch(
      baseProjectKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement BaseProject', async () => {
    await program.methods
      .decrement()
      .accounts({ baseProject: baseProjectKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.baseProject.fetch(
      baseProjectKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set baseProject value', async () => {
    await program.methods
      .set(42)
      .accounts({ baseProject: baseProjectKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.baseProject.fetch(
      baseProjectKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the baseProject account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        baseProject: baseProjectKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.baseProject.fetchNullable(
      baseProjectKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
