/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  ComponentDevSystem,
  ComponentDevSystemInterface,
} from "../ComponentDevSystem";

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
        name: "componentId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "value",
        type: "bytes",
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
  "0x608060405234801561001057600080fd5b50604051610de1380380610de183398101604081905261002f916101ce565b818161003a3361013c565b6001600160a01b0381161561004f57806100b1565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801561008d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100b19190610208565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8680549092161790555050505061022c565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811681146101cb57600080fd5b50565b600080604083850312156101e157600080fd5b82516101ec816101b6565b60208401519092506101fd816101b6565b809150509250929050565b60006020828403121561021a57600080fd5b8151610225816101b6565b9392505050565b610ba68061023b6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe1461005157806334830fd71461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004610843565b6100cf565b60405161007191906108e6565b60405180910390f35b610064610088366004610900565b6102ea565b610095610320565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c8366004610972565b610365565b005b6001546060906100f49073ffffffffffffffffffffffffffffffffffffffff166103e1565b610184576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f5b436f6d706f6e656e7444657653797374656d5d3a206e6f742064656275672060448201527f6d6f64650000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60008060008480602001905181019061019d919061098f565b600080549396509194509250906101ca9073ffffffffffffffffffffffffffffffffffffffff1685610531565b9050815160000361025a576040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff821690634cc8221590602401600060405180830381600087803b15801561023d57600080fd5b505af1158015610251573d6000803e3d6000fd5b505050506102e1565b6040517f8b28294700000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff821690638b282947906102ae9086908690600401610a1b565b600060405180830381600087803b1580156102c857600080fd5b505af11580156102dc573d6000803e3d6000fd5b505050505b50505050919050565b606061031884848460405160200161030493929190610a34565b6040516020818303038152906040526100cf565b949350505050565b60006103607f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146103d5576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6103de81610675565b50565b600061047b8273ffffffffffffffffffffffffffffffffffffffff1663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa158015610431573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104559190610a5c565b7fc3e18fdee44dca3d8fa1615250f268046d17fbc35f417d176d5c09d7ca8d3202610531565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081527fc3e18fdee44dca3d8fa1615250f268046d17fbc35f417d176d5c09d7ca8d3202600482015273ffffffffffffffffffffffffffffffffffffffff919091169063cccf7a8e90602401602060405180830381865afa158015610507573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061052b9190610a79565b92915050565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa1580156105a1573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526105e79190810190610a9b565b90508051600003610654576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640161017b565b6103188160008151811061066a5761066a610b41565b602002602001015190565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516103de928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561079f5761079f610729565b604052919050565b600067ffffffffffffffff8211156107c1576107c1610729565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b600082601f8301126107fe57600080fd5b813561081161080c826107a7565b610758565b81815284602083860101111561082657600080fd5b816020850160208301376000918101602001919091529392505050565b60006020828403121561085557600080fd5b813567ffffffffffffffff81111561086c57600080fd5b610318848285016107ed565b60005b8381101561089357818101518382015260200161087b565b50506000910152565b600081518084526108b4816020860160208601610878565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6020815260006108f9602083018461089c565b9392505050565b60008060006060848603121561091557600080fd5b8335925060208401359150604084013567ffffffffffffffff81111561093a57600080fd5b610946868287016107ed565b9150509250925092565b73ffffffffffffffffffffffffffffffffffffffff811681146103de57600080fd5b60006020828403121561098457600080fd5b81356108f981610950565b6000806000606084860312156109a457600080fd5b8351925060208401519150604084015167ffffffffffffffff8111156109c957600080fd5b8401601f810186136109da57600080fd5b80516109e861080c826107a7565b8181528760208385010111156109fd57600080fd5b610a0e826020830160208601610878565b8093505050509250925092565b828152604060208201526000610318604083018461089c565b838152826020820152606060408201526000610a53606083018461089c565b95945050505050565b600060208284031215610a6e57600080fd5b81516108f981610950565b600060208284031215610a8b57600080fd5b815180151581146108f957600080fd5b60006020808385031215610aae57600080fd5b825167ffffffffffffffff80821115610ac657600080fd5b818501915085601f830112610ada57600080fd5b815181811115610aec57610aec610729565b8060051b9150610afd848301610758565b8181529183018401918481019088841115610b1757600080fd5b938501935b83851015610b3557845182529385019390850190610b1c565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220d808e4915094f634bd3536865ba99034791e5321c8cc36e8393b490667de61da64736f6c63430008130033";

type ComponentDevSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ComponentDevSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ComponentDevSystem__factory extends ContractFactory {
  constructor(...args: ComponentDevSystemConstructorParams) {
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
  ): Promise<ComponentDevSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<ComponentDevSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): ComponentDevSystem {
    return super.attach(address) as ComponentDevSystem;
  }
  override connect(signer: Signer): ComponentDevSystem__factory {
    return super.connect(signer) as ComponentDevSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ComponentDevSystemInterface {
    return new utils.Interface(_abi) as ComponentDevSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ComponentDevSystem {
    return new Contract(address, _abi, signerOrProvider) as ComponentDevSystem;
  }
}
