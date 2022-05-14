/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type allowanceChanged = ContractEventLog<{
  _forWho: string;
  _fromWho: string;
  _oldAmount: string;
  _newAmount: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;

export interface Allowance extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): Allowance;
  clone(): Allowance;
  methods: {
    allowance(arg0: string): NonPayableTransactionObject<string>;

    validateMapping(arg0: string): NonPayableTransactionObject<boolean>;

    validations(arg0: string): NonPayableTransactionObject<string>;

    convertWeiToEther(
      _amountWei: number | string | BN
    ): NonPayableTransactionObject<string>;

    validateAddress(_address: string): NonPayableTransactionObject<void>;

    unvalidateAddress(_address: string): NonPayableTransactionObject<void>;

    addAllowance(
      _who: string,
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    removeAllowance(
      _who: string,
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    addressStatus(_address: string): NonPayableTransactionObject<boolean>;

    addressRemainingValidation(
      _address: string
    ): NonPayableTransactionObject<string>;

    addressAllowance(_address: string): NonPayableTransactionObject<string>;
  };
  events: {
    allowanceChanged(cb?: Callback<allowanceChanged>): EventEmitter;
    allowanceChanged(
      options?: EventOptions,
      cb?: Callback<allowanceChanged>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "allowanceChanged", cb: Callback<allowanceChanged>): void;
  once(
    event: "allowanceChanged",
    options: EventOptions,
    cb: Callback<allowanceChanged>
  ): void;
}
