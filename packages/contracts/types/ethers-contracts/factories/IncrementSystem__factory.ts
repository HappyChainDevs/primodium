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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516109f83803806109f883398101604081905261002f916101ce565b818161003a3361013c565b6001600160a01b0381161561004f57806100b1565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801561008d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100b19190610208565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8680549092161790555050505061022c565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811681146101cb57600080fd5b50565b600080604083850312156101e157600080fd5b82516101ec816101b6565b60208401519092506101fd816101b6565b809150509250929050565b60006020828403121561021a57600080fd5b8151610225816101b6565b9392505050565b6107bd8061023b6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780633e991df31461007a5780638da5cb5b1461008d578063f2fde38b146100ad575b600080fd5b61006461005f36600461050c565b6100c2565b60405161007191906105a1565b60405180910390f35b6100646100883660046105ef565b61029d565b6100956102cf565b6040516001600160a01b039091168152602001610071565b6100c06100bb366004610608565b610307565b005b60606000828060200190518101906100da9190610638565b6000805491925090610115906001600160a01b03167fa4f0c65f7e06d34f8ffe24c1d7bdcdb9e73b1d07702f650b38c22b90f178106561035d565b604051636667bd4760e11b8152600481018490529091506000906001600160a01b0383169063cccf7a8e90602401602060405180830381865afa158015610160573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101849190610651565b61018f5760006101f8565b6040516307fa648b60e11b8152600481018490526001600160a01b03831690630ff4c91690602401602060405180830381865afa1580156101d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101f89190610673565b90506001600160a01b03821663d923c3c484610215846001610699565b6040516001600160e01b031960e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b15801561025957600080fd5b505af115801561026d573d6000803e3d6000fd5b505050508260405160200161028491815260200190565b6040516020818303038152906040529350505050919050565b60606102c9826040516020016102b591815260200190565b6040516020818303038152906040526100c2565b92915050565b60006103027f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b0316331461035157604051632f7a8ee160e01b815260040160405180910390fd5b61035a81610443565b50565b604051637defd0f560e11b81526004810182905260009081906001600160a01b0385169063fbdfa1ea90602401600060405180830381865afa1580156103a7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103cf91908101906106cb565b9050805160000361041a5760405162461bcd60e51b81526020600482015260116024820152701a59081b9bdd081c9959da5cdd195c9959607a1b604482015260640160405180910390fd5b61043b8160008151811061043057610430610771565b602002602001015190565b949350505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161035a92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610504576105046104c5565b604052919050565b6000602080838503121561051f57600080fd5b823567ffffffffffffffff8082111561053757600080fd5b818501915085601f83011261054b57600080fd5b81358181111561055d5761055d6104c5565b61056f601f8201601f191685016104db565b9150808252868482850101111561058557600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b818110156105ce578581018301518582016040015282016105b2565b506000604082860101526040601f19601f8301168501019250505092915050565b60006020828403121561060157600080fd5b5035919050565b60006020828403121561061a57600080fd5b81356001600160a01b038116811461063157600080fd5b9392505050565b60006020828403121561064a57600080fd5b5051919050565b60006020828403121561066357600080fd5b8151801515811461063157600080fd5b60006020828403121561068557600080fd5b815163ffffffff8116811461063157600080fd5b63ffffffff8181168382160190808211156106c457634e487b7160e01b600052601160045260246000fd5b5092915050565b600060208083850312156106de57600080fd5b825167ffffffffffffffff808211156106f657600080fd5b818501915085601f83011261070a57600080fd5b81518181111561071c5761071c6104c5565b8060051b915061072d8483016104db565b818152918301840191848101908884111561074757600080fd5b938501935b838510156107655784518252938501939085019061074c565b98975050505050505050565b634e487b7160e01b600052603260045260246000fdfea264697066735822122092aa89cf11190f1a78f9ad90b3c4616940c2ae3d0ef813c53e26382d61f7b63264736f6c63430008130033";

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
