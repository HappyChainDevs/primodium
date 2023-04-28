/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export type CoordStruct = {
  x: PromiseOrValue<BigNumberish>;
  y: PromiseOrValue<BigNumberish>;
};

export type CoordStructOutput = [number, number] & { x: number; y: number };

export interface ClaimFromFactorySystemInterface extends utils.Interface {
  functions: {
    "claimAdjacentBuildings((int32,int32),uint256,uint256)": FunctionFragment;
    "claimAdjacentConveyorTiles((int32,int32),uint256,uint256)": FunctionFragment;
    "claimBuilding((int32,int32),uint256,uint256)": FunctionFragment;
    "claimConveyorTile((int32,int32),uint256,uint256)": FunctionFragment;
    "execute(bytes)": FunctionFragment;
    "executeTyped((int32,int32))": FunctionFragment;
    "owner()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "claimAdjacentBuildings"
      | "claimAdjacentConveyorTiles"
      | "claimBuilding"
      | "claimConveyorTile"
      | "execute"
      | "executeTyped"
      | "owner"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "claimAdjacentBuildings",
    values: [
      CoordStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "claimAdjacentConveyorTiles",
    values: [
      CoordStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "claimBuilding",
    values: [
      CoordStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "claimConveyorTile",
    values: [
      CoordStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "execute",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "executeTyped",
    values: [CoordStruct]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "claimAdjacentBuildings",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimAdjacentConveyorTiles",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimBuilding",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimConveyorTile",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeTyped",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface ClaimFromFactorySystem extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ClaimFromFactorySystemInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    claimAdjacentBuildings(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimAdjacentConveyorTiles(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimBuilding(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimConveyorTile(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    execute(
      arguments: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    executeTyped(
      coord: CoordStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  claimAdjacentBuildings(
    coord: CoordStruct,
    originEntity: PromiseOrValue<BigNumberish>,
    destination: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimAdjacentConveyorTiles(
    coord: CoordStruct,
    originEntity: PromiseOrValue<BigNumberish>,
    destination: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimBuilding(
    coord: CoordStruct,
    originEntity: PromiseOrValue<BigNumberish>,
    destination: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimConveyorTile(
    coord: CoordStruct,
    originEntity: PromiseOrValue<BigNumberish>,
    destination: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  execute(
    arguments: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  executeTyped(
    coord: CoordStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claimAdjacentBuildings(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimAdjacentConveyorTiles(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimBuilding(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimConveyorTile(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    execute(
      arguments: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    executeTyped(
      coord: CoordStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    claimAdjacentBuildings(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimAdjacentConveyorTiles(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimBuilding(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimConveyorTile(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    execute(
      arguments: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    executeTyped(
      coord: CoordStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimAdjacentBuildings(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimAdjacentConveyorTiles(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimBuilding(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimConveyorTile(
      coord: CoordStruct,
      originEntity: PromiseOrValue<BigNumberish>,
      destination: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    execute(
      arguments: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    executeTyped(
      coord: CoordStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
