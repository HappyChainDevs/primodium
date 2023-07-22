/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  RegisterSystem,
  RegisterSystemInterface,
} from "../RegisterSystem";

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
        internalType: "address",
        name: "msgSender",
        type: "address",
      },
      {
        internalType: "enum RegisterType",
        name: "registerType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
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
        internalType: "bytes",
        name: "args",
        type: "bytes",
      },
    ],
    name: "requirement",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
  "0x60806040523480156200001157600080fd5b50604051620011db380380620011db8339810160408190526200003491620001dc565b8181620000413362000149565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200021b565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8680549092161790555050505062000242565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001d957600080fd5b50565b60008060408385031215620001f057600080fd5b8251620001fd81620001c3565b60208401519092506200021081620001c3565b809150509250929050565b6000602082840312156200022e57600080fd5b81516200023b81620001c3565b9392505050565b610f8980620002526000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80638da5cb5b116100505780638da5cb5b146100a9578063f2fde38b146100d6578063f6cd7a01146100eb57600080fd5b806309c5eabe1461006c5780638b246a5b14610095575b600080fd5b61007f61007a366004610b86565b6100fe565b60405161008c9190610c39565b60405180910390f35b61007f6100a3366004610b86565b50606090565b6100b1610819565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161008c565b6100e96100e4366004610cc7565b61085e565b005b61007f6100f9366004610cf8565b6108da565b60606000806000808580602001905181019061011a9190610d49565b6001549397509195509350915073ffffffffffffffffffffffffffffffffffffffff1633146101d0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f73797374656d2063616e206f6e6c792062652063616c6c65642076696120576f60448201527f726c64000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60008360018111156101e4576101e4610d9c565b1480610201575060018360018111156101ff576101ff610d9c565b145b610267576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f696e76616c69642074797065000000000000000000000000000000000000000060448201526064016101c7565b806000036102d1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f696e76616c69642069640000000000000000000000000000000000000000000060448201526064016101c7565b73ffffffffffffffffffffffffffffffffffffffff821661034e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f696e76616c69642061646472657373000000000000000000000000000000000060448201526064016101c7565b60008084600181111561036357610363610d9c565b146103b0576000546103ab9073ffffffffffffffffffffffffffffffffffffffff167f017c816a964927a00e050edd780dcf113ca2756dfa9e9fda94a05c140d9317b0610913565b6103ca565b60005473ffffffffffffffffffffffffffffffffffffffff165b9050600073ffffffffffffffffffffffffffffffffffffffff84166040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa158015610453573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104779190610dcb565b156104de576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f656e7469747920616c726561647920726567697374657265640000000000000060448201526064016101c7565b6040517ffbdfa1ea0000000000000000000000000000000000000000000000000000000081526004810184905260009073ffffffffffffffffffffffffffffffffffffffff84169063fbdfa1ea90602401600060405180830381865afa15801561054c573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526105929190810190610ded565b905080516000148061066957508051600114801561066957508673ffffffffffffffffffffffffffffffffffffffff166105e3826000815181106105d8576105d8610e93565b602002602001015190565b73ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561062d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106519190610ec2565b73ffffffffffffffffffffffffffffffffffffffff16145b6106f5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f696420616c7265616479207265676973746572656420616e642063616c6c657260448201527f206e6f74206f776e65720000000000000000000000000000000000000000000060648201526084016101c7565b8051600103610786578273ffffffffffffffffffffffffffffffffffffffff16634cc822158260008151811061072d5761072d610e93565b60200260200101516040518263ffffffff1660e01b815260040161075391815260200190565b600060405180830381600087803b15801561076d57600080fd5b505af1158015610781573d6000803e3d6000fd5b505050505b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018390526024810185905273ffffffffffffffffffffffffffffffffffffffff841690631ab06ee590604401600060405180830381600087803b1580156107f557600080fd5b505af1158015610809573d6000803e3d6000fd5b5050505050505050505050919050565b60006108597f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146108ce576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6108d781610a54565b50565b606061090a858585856040516020016108f69493929190610edf565b6040516020818303038152906040526100fe565b95945050505050565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610983573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526109c99190810190610ded565b90508051600003610a36576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f74207265676973746572656400000000000000000000000000000060448201526064016101c7565b610a4c816000815181106105d8576105d8610e93565b949350505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516108d7928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610b7e57610b7e610b08565b604052919050565b60006020808385031215610b9957600080fd5b823567ffffffffffffffff80821115610bb157600080fd5b818501915085601f830112610bc557600080fd5b813581811115610bd757610bd7610b08565b610c07847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601610b37565b91508082528684828501011115610c1d57600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015610c6657858101830151858201604001528201610c4a565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b73ffffffffffffffffffffffffffffffffffffffff811681146108d757600080fd5b600060208284031215610cd957600080fd5b8135610ce481610ca5565b9392505050565b600281106108d757600080fd5b60008060008060808587031215610d0e57600080fd5b8435610d1981610ca5565b93506020850135610d2981610ceb565b92506040850135610d3981610ca5565b9396929550929360600135925050565b60008060008060808587031215610d5f57600080fd5b8451610d6a81610ca5565b6020860151909450610d7b81610ceb565b6040860151909350610d8c81610ca5565b6060959095015193969295505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060208284031215610ddd57600080fd5b81518015158114610ce457600080fd5b60006020808385031215610e0057600080fd5b825167ffffffffffffffff80821115610e1857600080fd5b818501915085601f830112610e2c57600080fd5b815181811115610e3e57610e3e610b08565b8060051b9150610e4f848301610b37565b8181529183018401918481019088841115610e6957600080fd5b938501935b83851015610e8757845182529385019390850190610e6e565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215610ed457600080fd5b8151610ce481610ca5565b73ffffffffffffffffffffffffffffffffffffffff8581168252608082019060028610610f35577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8560208401528085166040840152508260608301529594505050505056fea2646970667358221220b2ef5dda8d11515c1ffc1ff43619fc217fa81bf985caf8163abfa8645681e3c664736f6c63430008130033";

type RegisterSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RegisterSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RegisterSystem__factory extends ContractFactory {
  constructor(...args: RegisterSystemConstructorParams) {
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
  ): Promise<RegisterSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<RegisterSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): RegisterSystem {
    return super.attach(address) as RegisterSystem;
  }
  override connect(signer: Signer): RegisterSystem__factory {
    return super.connect(signer) as RegisterSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RegisterSystemInterface {
    return new utils.Interface(_abi) as RegisterSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RegisterSystem {
    return new Contract(address, _abi, signerOrProvider) as RegisterSystem;
  }
}
