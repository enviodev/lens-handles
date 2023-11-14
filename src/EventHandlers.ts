/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  LensHandlesContract_Approval_loader,
  LensHandlesContract_Approval_handler,
  LensHandlesContract_ApprovalForAll_loader,
  LensHandlesContract_ApprovalForAll_handler,
  LensHandlesContract_HandleMinted_loader,
  LensHandlesContract_HandleMinted_handler,
  LensHandlesContract_TokenGuardianStateChanged_loader,
  LensHandlesContract_TokenGuardianStateChanged_handler,
  LensHandlesContract_Transfer_loader,
  LensHandlesContract_Transfer_handler,
} from "../generated/src/Handlers.gen";

import {
  ApprovalEntity,
  ApprovalForAllEntity,
  HandleMintedEntity,
  TokenGuardianStateChangedEntity,
  TransferEntity,
  EventsSummaryEntity
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  approvalsCount: BigInt(0),
  approvalForAllsCount: BigInt(0),
  handleMintedsCount: BigInt(0),
  tokenGuardianStateChangedsCount: BigInt(0),
  transfersCount: BigInt(0),
};

LensHandlesContract_Approval_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

LensHandlesContract_Approval_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    approvalsCount: currentSummaryEntity.approvalsCount + BigInt(1),
  };

  let approvalEntity: ApprovalEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    owner: event.params.owner,
    approved: event.params.approved,
    tokenId: event.params.tokenId,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Approval.set(approvalEntity);
});

LensHandlesContract_ApprovalForAll_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

LensHandlesContract_ApprovalForAll_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    approvalForAllsCount: currentSummaryEntity.approvalForAllsCount + BigInt(1),
  };

  let approvalForAllEntity: ApprovalForAllEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    owner: event.params.owner,
    operator: event.params.operator,
    approved: event.params.approved,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ApprovalForAll.set(approvalForAllEntity);
});

LensHandlesContract_HandleMinted_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

LensHandlesContract_HandleMinted_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    handleMintedsCount: currentSummaryEntity.handleMintedsCount + BigInt(1),
  };

  let handleMintedEntity: HandleMintedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    handle: event.params.handle,
    namespace: event.params.namespace,
    handleId: event.params.handleId,
    to: event.params.to,
    timestamp: event.params.timestamp,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.HandleMinted.set(handleMintedEntity);
});

LensHandlesContract_TokenGuardianStateChanged_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

LensHandlesContract_TokenGuardianStateChanged_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    tokenGuardianStateChangedsCount: currentSummaryEntity.tokenGuardianStateChangedsCount + BigInt(1),
  };

  let tokenGuardianStateChangedEntity: TokenGuardianStateChangedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    wallet: event.params.wallet,
    enabled: event.params.enabled,
    tokenGuardianDisablingTimestamp: event.params.tokenGuardianDisablingTimestamp,
    timestamp: event.params.timestamp,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.TokenGuardianStateChanged.set(tokenGuardianStateChangedEntity);
});

LensHandlesContract_Transfer_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

LensHandlesContract_Transfer_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    transfersCount: currentSummaryEntity.transfersCount + BigInt(1),
  };

  let transferEntity: TransferEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    from: event.params.from,
    to: event.params.to,
    tokenId: event.params.tokenId,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Transfer.set(transferEntity);
});

