/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  S_UpdateUnclaimedResourcesSystem,
  S_UpdateUnclaimedResourcesSystemInterface,
} from "../S_UpdateUnclaimedResourcesSystem";

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
        name: "playerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "resourceID",
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
  "0x60806040523480156200001157600080fd5b5060405162001874380380620018748339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b61161e80620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780636ad0ccab1461007a5780638da5cb5b1461008d578063f2fde38b146100ad575b600080fd5b61006461005f366004611205565b6100c2565b60405161007191906112a9565b60405180910390f35b6100646100883660046112f1565b6107c4565b610095610803565b6040516001600160a01b039091168152602001610071565b6100c06100bb36600461131d565b61083b565b005b6060600080838060200190518101906100db919061133a565b9150915060006100f1836001600160a01b031690565b6001546040516309e4fb4360e31b81527fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e60048201529192506000916001600160a01b0390911690634f27da1890602401602060405180830381865afa15801561015f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101839190611368565b905060006101918484610891565b6001546040516309e4fb4360e31b81527f222d9674c2fee077bc82c84232803a9168906e2be25c4560d094c76895b8a43260048201529192506000916001600160a01b0390911690634f27da1890602401602060405180830381865afa1580156101ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102239190611368565b9050600061023182846108bd565b905063ffffffff8116156104e257604051636667bd4760e11b8152600481018490526001600160a01b0385169063cccf7a8e90602401602060405180830381865afa158015610284573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102a89190611385565b61031157604051631ab06ee560e01b8152600481018490524360248201526001600160a01b03851690631ab06ee590604401600060405180830381600087803b1580156102f457600080fd5b505af1158015610308573d6000803e3d6000fd5b50505050610543565b6040516307fa648b60e11b81526004810184905243906001600160a01b03861690630ff4c91690602401602060405180830381865afa158015610358573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061037c91906113a7565b146104dd57600061038d858561099d565b61039790436113d6565b6001546040516309e4fb4360e31b81527f6ea3fcb6089077d06696f55d6cbeeaaa38f22c62099211f6123ebd6dcb8a88a46004820152919250610432916001600160a01b0390911690634f27da1890602401602060405180830381865afa158015610406573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061042a9190611368565b61060d61099d565b61043e612710836113e9565b6104489190611400565b9050600061045c8263ffffffff85166113e9565b600154909150610477906001600160a01b0316888a84610a7d565b604051631ab06ee560e01b8152600481018790524360248201529091506001600160a01b03871690631ab06ee590604401600060405180830381600087803b1580156104c257600080fd5b505af11580156104d6573d6000803e3d6000fd5b5050505050505b610543565b604051631ab06ee560e01b8152600481018490524360248201526001600160a01b03851690631ab06ee590604401600060405180830381600087803b15801561052a57600080fd5b505af115801561053e573d6000803e3d6000fd5b505050505b6001546040516309e4fb4360e31b81527f12b5811e06f1224bf32ac3ae0eb23589bf1724596a43f72b232525e89a429b6c60048201526000916001600160a01b031690634f27da1890602401602060405180830381865afa1580156105ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d09190611368565b6001600160a01b031663fbdfa1ea856040518263ffffffff1660e01b81526004016105fd91815260200190565b600060405180830381865afa15801561061a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526106429190810190611422565b905060005b815181101561079957600154604080516306ac999760e11b815290516106e5926001600160a01b031691630d59332e9160048083019260209291908290030181865afa15801561069b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106bf9190611368565b7f23f1f9079cb71316c5eb52dd7b962c701570062c868964f0a09f40cb1f882281610b92565b6001600160a01b0316636ad0ccab8a848481518110610706576107066114c8565b60200260200101516040518363ffffffff1660e01b815260040161073f9291906001600160a01b03929092168252602082015260400190565b6000604051808303816000875af115801561075e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261078691908101906114de565b508061079181611555565b915050610647565b5060408051602081018890520160405160208183030381529060405298505050505050505050919050565b604080516001600160a01b03841660208201529081018290526060906107fa9082016040516020818303038152906040526100c2565b90505b92915050565b60006108367f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b0316331461088557604051632f7a8ee160e01b815260040160405180910390fd5b61088e81610c70565b50565b604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa158015610905573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109299190611385565b6109345760006107fa565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa158015610979573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107fa919061156e565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa1580156109e5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a099190611385565b610a145760006107fa565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa158015610a59573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107fa91906113a7565b6040516309e4fb4360e31b81527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f1510640845600482015260009081906001600160a01b03871690634f27da1890602401602060405180830381865afa158015610ae6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b0a9190611368565b90506000610b188587610891565b90506000610b27888888610c79565b90508463ffffffff168163ffffffff161115610b6957610b5d88888888610b4e88886108bd565b610b589190611594565b610d5e565b60009350505050610b8a565b610b7a88888884610b4e88886108bd565b610b8481866115b8565b93505050505b949350505050565b604051637defd0f560e11b81526004810182905260009081906001600160a01b0385169063fbdfa1ea90602401600060405180830381865afa158015610bdc573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610c049190810190611422565b90508051600003610c4f5760405162461bcd60e51b81526020600482015260116024820152701a59081b9bdd081c9959da5cdd195c9959607a1b604482015260640160405180910390fd5b610b8a81600081518110610c6557610c656114c8565b602002602001015190565b61088e81611083565b600080610c878585856110fd565b6040516309e4fb4360e31b81527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f15106408456004820152909150600090610d28906001600160a01b03881690634f27da1890602401602060405180830381865afa158015610cf5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d199190611368565b610d238688610891565b6108bd565b90508063ffffffff168263ffffffff1611610d4857600092505050610d57565b610d5281836115b8565b925050505b9392505050565b6040516309e4fb4360e31b81527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f151064084560048201526000906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610dc5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de99190611368565b6040516309e4fb4360e31b81527f8d5746953402e95fa35ce71ddaa7efe7922c48a307985b7d64ea3f27abcb14f960048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015610e53573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e779190611368565b90506000610e858587610891565b90506000610e9384836108bd565b90506000610ea1848961099d565b6040516309e4fb4360e31b81527fd9603ec917f4576302b3c02b1fa235f8e01465fbf139aba994a05da60796f53e6004820152909150600090610f39906001600160a01b038c1690634f27da1890602401602060405180830381865afa158015610f0f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f339190611368565b8961099d565b90508263ffffffff168763ffffffff161015610f8757610f5987846115b8565b610f699063ffffffff16826113e9565b905081811115610f765750805b610f8081836113d6565b9150610fb0565b610f9183886115b8565b610fa19063ffffffff16826113e9565b9050610fad81836115d5565b91505b604051631ab06ee560e01b8152600481018a9052602481018390526001600160a01b03861690631ab06ee590604401600060405180830381600087803b158015610ff957600080fd5b505af115801561100d573d6000803e3d6000fd5b5050604051633648f0f160e21b81526004810187905263ffffffff8a1660248201526001600160a01b038916925063d923c3c49150604401600060405180830381600087803b15801561105f57600080fd5b505af1158015611073573d6000803e3d6000fd5b5050505050505050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6040516309e4fb4360e31b81527f16b501788471b0e2be7833a8d54a049f02ca15b837831d34c5bc534a33e5a1f76004820152600090610b8a906001600160a01b03861690634f27da1890602401602060405180830381865afa158015611168573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061118c9190611368565b610d238486610891565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156111d5576111d5611196565b604052919050565b600067ffffffffffffffff8211156111f7576111f7611196565b50601f01601f191660200190565b60006020828403121561121757600080fd5b813567ffffffffffffffff81111561122e57600080fd5b8201601f8101841361123f57600080fd5b803561125261124d826111dd565b6111ac565b81815285602083850101111561126757600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b838110156112a0578181015183820152602001611288565b50506000910152565b60208152600082518060208401526112c8816040850160208701611285565b601f01601f19169190910160400192915050565b6001600160a01b038116811461088e57600080fd5b6000806040838503121561130457600080fd5b823561130f816112dc565b946020939093013593505050565b60006020828403121561132f57600080fd5b8135610d57816112dc565b6000806040838503121561134d57600080fd5b8251611358816112dc565b6020939093015192949293505050565b60006020828403121561137a57600080fd5b8151610d57816112dc565b60006020828403121561139757600080fd5b81518015158114610d5757600080fd5b6000602082840312156113b957600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b818103818111156107fd576107fd6113c0565b80820281158282048414176107fd576107fd6113c0565b60008261141d57634e487b7160e01b600052601260045260246000fd5b500490565b6000602080838503121561143557600080fd5b825167ffffffffffffffff8082111561144d57600080fd5b818501915085601f83011261146157600080fd5b81518181111561147357611473611196565b8060051b91506114848483016111ac565b818152918301840191848101908884111561149e57600080fd5b938501935b838510156114bc578451825293850193908501906114a3565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156114f057600080fd5b815167ffffffffffffffff81111561150757600080fd5b8201601f8101841361151857600080fd5b805161152661124d826111dd565b81815285602083850101111561153b57600080fd5b61154c826020830160208601611285565b95945050505050565b600060018201611567576115676113c0565b5060010190565b60006020828403121561158057600080fd5b815163ffffffff81168114610d5757600080fd5b63ffffffff8181168382160190808211156115b1576115b16113c0565b5092915050565b63ffffffff8281168282160390808211156115b1576115b16113c0565b808201808211156107fd576107fd6113c056fea2646970667358221220b52b88416c69dcf77197a31e34d54df48677e4c064d044ea7064e0be1bc47c5e64736f6c63430008130033";

type S_UpdateUnclaimedResourcesSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: S_UpdateUnclaimedResourcesSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class S_UpdateUnclaimedResourcesSystem__factory extends ContractFactory {
  constructor(...args: S_UpdateUnclaimedResourcesSystemConstructorParams) {
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
  ): Promise<S_UpdateUnclaimedResourcesSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<S_UpdateUnclaimedResourcesSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): S_UpdateUnclaimedResourcesSystem {
    return super.attach(address) as S_UpdateUnclaimedResourcesSystem;
  }
  override connect(signer: Signer): S_UpdateUnclaimedResourcesSystem__factory {
    return super.connect(signer) as S_UpdateUnclaimedResourcesSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): S_UpdateUnclaimedResourcesSystemInterface {
    return new utils.Interface(
      _abi
    ) as S_UpdateUnclaimedResourcesSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): S_UpdateUnclaimedResourcesSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as S_UpdateUnclaimedResourcesSystem;
  }
}
