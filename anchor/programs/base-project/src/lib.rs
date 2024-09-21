#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("5Ue2mfgk7ikHuS5uJYfmzowyutbwJpzBbsSTppSWFDyU");

#[program]
pub mod base_project {
    use super::*;

  pub fn close(_ctx: Context<CloseBaseProject>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.base_project.count = ctx.accounts.base_project.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.base_project.count = ctx.accounts.base_project.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeBaseProject>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.base_project.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeBaseProject<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + BaseProject::INIT_SPACE,
  payer = payer
  )]
  pub base_project: Account<'info, BaseProject>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseBaseProject<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub base_project: Account<'info, BaseProject>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub base_project: Account<'info, BaseProject>,
}

#[account]
#[derive(InitSpace)]
pub struct BaseProject {
  count: u8,
}
