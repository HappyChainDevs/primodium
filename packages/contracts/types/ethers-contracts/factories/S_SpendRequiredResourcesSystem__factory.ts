/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  S_SpendRequiredResourcesSystem,
  S_SpendRequiredResourcesSystemInterface,
} from "../S_SpendRequiredResourcesSystem";

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
        name: "targetEntity",
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
    inputs: [
      {
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "targetEntity",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "count",
        type: "uint32",
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
  "0x60806040523480156200001157600080fd5b5060405162001a7a38038062001a7a8339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b61182480620002566000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806309c5eabe1461005c5780636ad0ccab146100855780636c0b7ef7146100985780638da5cb5b146100ab578063f2fde38b146100cb575b600080fd5b61006f61006a3660046112bb565b6100e0565b60405161007c919061135f565b60405180910390f35b61006f6100933660046113a7565b610987565b61006f6100a63660046113e5565b6109d1565b6100b3610a0f565b6040516001600160a01b03909116815260200161007c565b6100de6100d9366004611427565b610a47565b005b6060610182600160009054906101000a90046001600160a01b03166001600160a01b0316630d59332e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610138573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061015c919061144b565b7f57247228bbd93ac6953378fea0f421ebc4978d448f7383f1a2816e6ca6e2894d610a9d565b6001600160a01b0316336001600160a01b031614806102465750600154604080516306ac999760e11b81529051610231926001600160a01b031691630d59332e9160048083019260209291908290030181865afa1580156101e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061020b919061144b565b7ff39d315320cdfe464ad36c5d26133acfadb3c7e2d9a6ac9e6bb331cb612f42a8610a9d565b6001600160a01b0316336001600160a01b0316145b806102f65750600154604080516306ac999760e11b815290516102e1926001600160a01b031691630d59332e9160048083019260209291908290030181865afa158015610297573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102bb919061144b565b7ff0f86309ad9868d7575233553806a27ad4e97ffdea222f19dd424afab17a9583610a9d565b6001600160a01b0316336001600160a01b0316145b806103a65750600154604080516306ac999760e11b81529051610391926001600160a01b031691630d59332e9160048083019260209291908290030181865afa158015610347573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061036b919061144b565b7f28bd09651c4df21cfd0b15ebacd54447608ceb8cbd648faa47fc0f028f9a2285610a9d565b6001600160a01b0316336001600160a01b0316145b806104565750600154604080516306ac999760e11b81529051610441926001600160a01b031691630d59332e9160048083019260209291908290030181865afa1580156103f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061041b919061144b565b7f70fd2d99c63cf9e9a219a7907c6a0bc55a0323de6daf9c9d0b03e2d7250d73d2610a9d565b6001600160a01b0316336001600160a01b0316145b806105065750600154604080516306ac999760e11b815290516104f1926001600160a01b031691630d59332e9160048083019260209291908290030181865afa1580156104a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104cb919061144b565b7f4a74b7250a871619ca8aed2448378dc66f44f082f024aff856f74c9a5b255870610a9d565b6001600160a01b0316336001600160a01b0316145b6105ba5760405162461bcd60e51b815260206004820152606e60248201527f535f5370656e6452657175697265645265736f757263657353797374656d3a2060448201527f4f6e6c79204275696c6453797374656d2c20557067726164654275696c64696e60648201527f6753797374656d2c20526573656172636853797374656d2063616e2063616c6c60848201526d103a3434b990333ab731ba34b7b760911b60a482015260c4015b60405180910390fd5b6000806000848060200190518101906105d39190611468565b92509250925060006105eb846001600160a01b031690565b6001546040516309e4fb4360e31b81527ff5bd2f5cb6567cf0fa832e8e7971a94af009d0ec1e329976b883c7ab5048827860048201529192506000916001600160a01b0390911690634f27da1890602401602060405180830381865afa158015610659573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067d919061144b565b604051636667bd4760e11b8152600481018690529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa1580156106c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e991906114a0565b61072457604080516001600160a01b038716602082015290810185905260600160405160208183030381529060405295505050505050919050565b6040516307fa648b60e11b8152600481018590526000906001600160a01b03831690630ff4c91690602401600060405180830381865afa15801561076c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610794919081019061154c565b905060005b81515181101561094e57600154604080516306ac999760e11b81529051610838926001600160a01b031691630d59332e9160048083019260209291908290030181865afa1580156107ee573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610812919061144b565b7fbfa4e94ac46519bd16654700fe5605b990ceb82f41218bfba1018857ba5e01c0610a9d565b6001600160a01b0316636ad0ccab888460000151848151811061085d5761085d61163e565b60200260200101516040518363ffffffff1660e01b81526004016108969291906001600160a01b03929092168252602082015260400190565b6000604051808303816000875af11580156108b5573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108dd9190810190611654565b506001548251805161093b926001600160a01b0316918791859081106109055761090561163e565b602002602001015188866020015186815181106109245761092461163e565b602002602001015161093691906116e1565b610b77565b508061094681611709565b915050610799565b50604080516001600160a01b03881660208201529081018690526060016040516020818303038152906040529650505050505050919050565b604080516001600160a01b03841660208201529081018290526001606082810191909152906109c8906080015b6040516020818303038152906040526100e0565b90505b92915050565b604080516001600160a01b038516602082015290810183905263ffffffff821660608281019190915290610a07906080016109b4565b949350505050565b6000610a427f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b03163314610a9157604051632f7a8ee160e01b815260040160405180910390fd5b610a9a81610ca0565b50565b604051637defd0f560e11b81526004810182905260009081906001600160a01b0385169063fbdfa1ea90602401600060405180830381865afa158015610ae7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610b0f9190810190611722565b90508051600003610b565760405162461bcd60e51b81526020600482015260116024820152701a59081b9bdd081c9959da5cdd195c9959607a1b60448201526064016105b1565b610a0781600081518110610b6c57610b6c61163e565b602002602001015190565b6040516309e4fb4360e31b81527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f1510640845600482015260009081906001600160a01b03871690634f27da1890602401602060405180830381865afa158015610be0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c04919061144b565b604080516020808201889052818301899052825180830384018152606090920190925280519101209091506000610c3b8383610ca9565b90508463ffffffff168163ffffffff161115610c7d57610c7188888888610c628888610ca9565b610c6c9190611757565b610d89565b60009350505050610a07565b610c8a8888886000610d89565b610c948186611757565b98975050505050505050565b610a9a816110c9565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa158015610cf1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d1591906114a0565b610d205760006109c8565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa158015610d65573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109c8919061177b565b6040516309e4fb4360e31b81527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f151064084560048201526000906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610df0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e14919061144b565b6040516309e4fb4360e31b81527f8d5746953402e95fa35ce71ddaa7efe7922c48a307985b7d64ea3f27abcb14f960048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015610e7e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea2919061144b565b604080516020808201889052818301899052825180830384018152606090920190925280519101209091506000610ed98483610ca9565b90506000610ee78489611143565b6040516309e4fb4360e31b81527fd9603ec917f4576302b3c02b1fa235f8e01465fbf139aba994a05da60796f53e6004820152909150600090610f7f906001600160a01b038c1690634f27da1890602401602060405180830381865afa158015610f55573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f79919061144b565b89611143565b90508263ffffffff168763ffffffff161015610fcd57610f9f8784611757565b610faf9063ffffffff1682611798565b905081811115610fbc5750805b610fc681836117af565b9150610ff6565b610fd78388611757565b610fe79063ffffffff1682611798565b9050610ff381836117c2565b91505b604051631ab06ee560e01b8152600481018a9052602481018390526001600160a01b03861690631ab06ee590604401600060405180830381600087803b15801561103f57600080fd5b505af1158015611053573d6000803e3d6000fd5b5050604051633648f0f160e21b81526004810187905263ffffffff8a1660248201526001600160a01b038916925063d923c3c49150604401600060405180830381600087803b1580156110a557600080fd5b505af11580156110b9573d6000803e3d6000fd5b5050505050505050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa15801561118b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111af91906114a0565b6111ba5760006109c8565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa1580156111ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109c891906117d5565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff8111828210171561125c5761125c611223565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561128b5761128b611223565b604052919050565b600067ffffffffffffffff8211156112ad576112ad611223565b50601f01601f191660200190565b6000602082840312156112cd57600080fd5b813567ffffffffffffffff8111156112e457600080fd5b8201601f810184136112f557600080fd5b803561130861130382611293565b611262565b81815285602083850101111561131d57600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b8381101561135657818101518382015260200161133e565b50506000910152565b602081526000825180602084015261137e81604085016020870161133b565b601f01601f19169190910160400192915050565b6001600160a01b0381168114610a9a57600080fd5b600080604083850312156113ba57600080fd5b82356113c581611392565b946020939093013593505050565b63ffffffff81168114610a9a57600080fd5b6000806000606084860312156113fa57600080fd5b833561140581611392565b925060208401359150604084013561141c816113d3565b809150509250925092565b60006020828403121561143957600080fd5b813561144481611392565b9392505050565b60006020828403121561145d57600080fd5b815161144481611392565b60008060006060848603121561147d57600080fd5b835161148881611392565b60208501516040860151919450925061141c816113d3565b6000602082840312156114b257600080fd5b8151801515811461144457600080fd5b600067ffffffffffffffff8211156114dc576114dc611223565b5060051b60200190565b600082601f8301126114f757600080fd5b81516020611507611303836114c2565b82815260059290921b8401810191818101908684111561152657600080fd5b8286015b84811015611541578051835291830191830161152a565b509695505050505050565b6000602080838503121561155f57600080fd5b825167ffffffffffffffff8082111561157757600080fd5b908401906040828703121561158b57600080fd5b611593611239565b8251828111156115a257600080fd5b6115ae888286016114e6565b82525083830151828111156115c257600080fd5b80840193505086601f8401126115d757600080fd5b825191506115e7611303836114c2565b82815260059290921b8301840191848101908884111561160657600080fd5b938501935b8385101561162d57845161161e816113d3565b8252938501939085019061160b565b948201949094529695505050505050565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561166657600080fd5b815167ffffffffffffffff81111561167d57600080fd5b8201601f8101841361168e57600080fd5b805161169c61130382611293565b8181528560208385010111156116b157600080fd5b6116c282602083016020860161133b565b95945050505050565b634e487b7160e01b600052601160045260246000fd5b63ffffffff818116838216028082169190828114611701576117016116cb565b505092915050565b60006001820161171b5761171b6116cb565b5060010190565b60006020828403121561173457600080fd5b815167ffffffffffffffff81111561174b57600080fd5b610a07848285016114e6565b63ffffffff828116828216039080821115611774576117746116cb565b5092915050565b60006020828403121561178d57600080fd5b8151611444816113d3565b80820281158282048414176109cb576109cb6116cb565b818103818111156109cb576109cb6116cb565b808201808211156109cb576109cb6116cb565b6000602082840312156117e757600080fd5b505191905056fea2646970667358221220610037302a5c936ac0c7129ee6ddb5ee6ea8c8aade2c37f4e778e2ce8525b87064736f6c63430008130033";

type S_SpendRequiredResourcesSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: S_SpendRequiredResourcesSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class S_SpendRequiredResourcesSystem__factory extends ContractFactory {
  constructor(...args: S_SpendRequiredResourcesSystemConstructorParams) {
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
  ): Promise<S_SpendRequiredResourcesSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<S_SpendRequiredResourcesSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): S_SpendRequiredResourcesSystem {
    return super.attach(address) as S_SpendRequiredResourcesSystem;
  }
  override connect(signer: Signer): S_SpendRequiredResourcesSystem__factory {
    return super.connect(signer) as S_SpendRequiredResourcesSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): S_SpendRequiredResourcesSystemInterface {
    return new utils.Interface(_abi) as S_SpendRequiredResourcesSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): S_SpendRequiredResourcesSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as S_SpendRequiredResourcesSystem;
  }
}
