/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  IncrementSystem,
  IncrementSystemInterface,
} from "../IncrementSystem";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IWorld",
        name: "_world",
        type: "address",
      },
      {
        internalType: "address",
        name: "_components",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Ownable__NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__NotTransitiveOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "args",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "executeTyped",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610c0a380380610c0a83398101604081905261002f916101ce565b818161003a3361013c565b6001600160a01b0381161561004f57806100b1565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801561008d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100b19190610208565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8680549092161790555050505061022c565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811681146101cb57600080fd5b50565b600080604083850312156101e157600080fd5b82516101ec816101b6565b60208401519092506101fd816101b6565b809150509250929050565b60006020828403121561021a57600080fd5b8151610225816101b6565b9392505050565b6109cf8061023b6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780633e991df31461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f3660046106a3565b6100cf565b6040516100719190610756565b60405180910390f35b6100646100883660046107c2565b61015f565b610095610191565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c83660046107db565b6101d6565b005b60606000828060200190518101906100e79190610818565b600080549192509061012f9073ffffffffffffffffffffffffffffffffffffffff167fa4f0c65f7e06d34f8ffe24c1d7bdcdb9e73b1d07702f650b38c22b90f1781065610252565b905061013b81836103a2565b60408051602081018490520160405160208183030381529060405292505050919050565b606061018b8260405160200161017791815260200190565b6040516020818303038152906040526100cf565b92915050565b60006101d17f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610246576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61024f81610571565b50565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa1580156102c2573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526103089190810190610831565b90508051600003610379576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b61039a8160008151811061038f5761038f6108d7565b602002602001015190565b949350505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610410573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104349190610906565b61043f5760006104ce565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa1580156104aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ce9190610928565b905073ffffffffffffffffffffffffffffffffffffffff831663d923c3c4836104f884600161094e565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b15801561055457600080fd5b505af1158015610568573d6000803e3d6000fd5b50505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161024f928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561069b5761069b610625565b604052919050565b600060208083850312156106b657600080fd5b823567ffffffffffffffff808211156106ce57600080fd5b818501915085601f8301126106e257600080fd5b8135818111156106f4576106f4610625565b610724847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610654565b9150808252868482850101111561073a57600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b8181101561078357858101830151858201604001528201610767565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b6000602082840312156107d457600080fd5b5035919050565b6000602082840312156107ed57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461081157600080fd5b9392505050565b60006020828403121561082a57600080fd5b5051919050565b6000602080838503121561084457600080fd5b825167ffffffffffffffff8082111561085c57600080fd5b818501915085601f83011261087057600080fd5b81518181111561088257610882610625565b8060051b9150610893848301610654565b81815291830184019184810190888411156108ad57600080fd5b938501935b838510156108cb578451825293850193908501906108b2565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561091857600080fd5b8151801515811461081157600080fd5b60006020828403121561093a57600080fd5b815163ffffffff8116811461081157600080fd5b63ffffffff818116838216019080821115610992577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b509291505056fea264697066735822122014dea57ceeac9d3619418b3065c366682f14b54de955cfcfebce6f32935f9b4664736f6c63430008130033";

type IncrementSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: IncrementSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class IncrementSystem__factory extends ContractFactory {
  constructor(...args: IncrementSystemConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<IncrementSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<IncrementSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): IncrementSystem {
    return super.attach(address) as IncrementSystem;
  }
  override connect(signer: Signer): IncrementSystem__factory {
    return super.connect(signer) as IncrementSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): IncrementSystemInterface {
    return new utils.Interface(_abi) as IncrementSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IncrementSystem {
    return new Contract(address, _abi, signerOrProvider) as IncrementSystem;
  }
}
