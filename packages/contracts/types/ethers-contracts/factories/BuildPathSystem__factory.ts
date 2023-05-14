/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BuildPathSystem,
  BuildPathSystemInterface,
} from "../BuildPathSystem";

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
        components: [
          {
            internalType: "int32",
            name: "x",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "y",
            type: "int32",
          },
        ],
        internalType: "struct Coord",
        name: "coordStart",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "int32",
            name: "x",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "y",
            type: "int32",
          },
        ],
        internalType: "struct Coord",
        name: "coordEnd",
        type: "tuple",
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
  "0x60806040523480156200001157600080fd5b50604051620018263803806200182683398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b62000e3e17901c565b5050505062000292565b600062000126620001ef60201b62000ecf1760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b61158480620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063aac25b73146100a7578063f2fde38b146100ba575b600080fd5b61006461005f36600461119a565b6100cf565b604051610071919061124d565b60405180910390f35b610082610d48565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b536600461130a565b610d8d565b6100cd6100c836600461133f565b610dc2565b005b6060600080838060200190518101906100e891906113b3565b60008054929450909250906101339073ffffffffffffffffffffffffffffffffffffffff167f49a4584d9706380e35459e1f31e673445371b5bac20aa516f8ba8650b1843106610ef3565b600080549192509061017b9073ffffffffffffffffffffffffffffffffffffffff167f30f1c358b0a577824afcc8e464bcbd763eba254820a547b425765e75cc511f1e610ef3565b60008054919250906101c39073ffffffffffffffffffffffffffffffffffffffff167f0d469bcaf5f43a6290ca2906ecdeb5ef80d7723e8cad27045bddb6e1eb9da435610ef3565b600080549192509061020b9073ffffffffffffffffffffffffffffffffffffffff167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c7540610ef3565b85518751919250600391820b910b1480156102335750846020015160030b866020015160030b145b156102eb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604260248201527f5b4275696c645061746853797374656d5d2043616e6e6f74207374617274206160448201527f6e6420656e642070617468206174207468652073616d6520636f6f7264696e6160648201527f7465000000000000000000000000000000000000000000000000000000000000608482015260a4015b60405180910390fd5b6040517fbf3bf26a00000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff86169063bf3bf26a90610340908a906004016113df565b600060405180830381865afa15801561035d573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526103a39190810190611400565b90508051600114610436576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603a60248201527f5b4275696c645061746853797374656d5d2043616e6e6f74207374617274207060448201527f61746820617420616e20656d70747920636f6f7264696e61746500000000000060648201526084016102e2565b6040517fbf3bf26a00000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff87169063bf3bf26a9061048b908a906004016113df565b600060405180830381865afa1580156104a8573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526104ee9190810190611400565b90508051600114610581576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f5b4275696c645061746853797374656d5d2043616e6e6f7420656e642070617460448201527f6820617420616e20656d70747920636f6f7264696e617465000000000000000060648201526084016102e2565b60008573ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106105b2576105b26114a6565b60200260200101516040518263ffffffff1660e01b81526004016105d891815260200190565b602060405180830381865afa1580156105f5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061061991906114d5565b90507f170729974eb622f2526fa4f92490a96d2ea29dc85bb4ce1e3d7b0f0a238a4ee581148061066857507f5dc2e1711c35bb96dbc441e9a8d2ca6965863dde6c810317df7a657d469a7a5381145b61071a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604c60248201527f5b4275696c645061746853797374656d5d2043616e6e6f74207374617274207060448201527f6174682061742061206e6f6e2d737570706f727465642074696c652028436f6e60648201527f7665796f722c204e6f6465290000000000000000000000000000000000000000608482015260a4016102e2565b60008673ffffffffffffffffffffffffffffffffffffffff16630ff4c9168460008151811061074b5761074b6114a6565b60200260200101516040518263ffffffff1660e01b815260040161077191815260200190565b602060405180830381865afa15801561078e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107b291906114d5565b90507f170729974eb622f2526fa4f92490a96d2ea29dc85bb4ce1e3d7b0f0a238a4ee581148061080157507f5dc2e1711c35bb96dbc441e9a8d2ca6965863dde6c810317df7a657d469a7a5381145b6108b3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604a60248201527f5b4275696c645061746853797374656d5d2043616e6e6f7420656e642070617460448201527f682061742061206e6f6e2d737570706f727465642074696c652028436f6e766560648201527f796f722c204e6f64652900000000000000000000000000000000000000000000608482015260a4016102e2565b60008573ffffffffffffffffffffffffffffffffffffffff16630ff4c916866000815181106108e4576108e46114a6565b60200260200101516040518263ffffffff1660e01b815260040161090a91815260200190565b602060405180830381865afa158015610927573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061094b91906114d5565b90503381146109dc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603c60248201527f5b4275696c645061746853797374656d5d2043616e6e6f74207374617274207060448201527f61746820617420612074696c6520796f7520646f206e6f74206f776e0000000060648201526084016102e2565b60008673ffffffffffffffffffffffffffffffffffffffff16630ff4c91686600081518110610a0d57610a0d6114a6565b60200260200101516040518263ffffffff1660e01b8152600401610a3391815260200190565b602060405180830381865afa158015610a50573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a7491906114d5565b9050338114610b05576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603a60248201527f5b4275696c645061746853797374656d5d2043616e6e6f7420656e642070617460448201527f6820617420612074696c6520796f7520646f206e6f74206f776e00000000000060648201526084016102e2565b8773ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e87600081518110610b3457610b346114a6565b60200260200101516040518263ffffffff1660e01b8152600401610b5a91815260200190565b602060405180830381865afa158015610b77573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9b91906114ee565b15610c4f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526044602482018190527f5b4275696c645061746853797374656d5d2043616e6e6f74207374617274206d908201527f6f7265207468616e206f6e6520706174682066726f6d207468652073616d652060648201527f74696c6500000000000000000000000000000000000000000000000000000000608482015260a4016102e2565b8773ffffffffffffffffffffffffffffffffffffffff16631ab06ee587600081518110610c7e57610c7e6114a6565b602002602001015187600081518110610c9957610c996114a6565b60200260200101516040518363ffffffff1660e01b8152600401610cc7929190918252602082015260400190565b600060405180830381600087803b158015610ce157600080fd5b505af1158015610cf5573d6000803e3d6000fd5b5050505085600081518110610d0c57610d0c6114a6565b6020026020010151604051602001610d2691815260200190565b6040516020818303038152906040529c50505050505050505050505050919050565b6000610d887f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b6060610db98383604051602001610da5929190611510565b6040516020818303038152906040526100cf565b90505b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610e32576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610e3b8161103f565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610f63573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610fa99190810190611400565b90508051600003611016576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f74207265676973746572656400000000000000000000000000000060448201526064016102e2565b6110378160008151811061102c5761102c6114a6565b602002602001015190565b949350505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804608054604051610e3b928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715611145576111456110f3565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611192576111926110f3565b604052919050565b600060208083850312156111ad57600080fd5b823567ffffffffffffffff808211156111c557600080fd5b818501915085601f8301126111d957600080fd5b8135818111156111eb576111eb6110f3565b61121b847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8401160161114b565b9150808252868482850101111561123157600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b8181101561127a5785810183015185820160400152820161125e565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b8060030b8114610e3b57600080fd5b6000604082840312156112da57600080fd5b6112e2611122565b905081356112ef816112b9565b815260208201356112ff816112b9565b602082015292915050565b6000806080838503121561131d57600080fd5b61132784846112c8565b915061133684604085016112c8565b90509250929050565b60006020828403121561135157600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461137557600080fd5b9392505050565b60006040828403121561138e57600080fd5b611396611122565b905081516113a3816112b9565b815260208201516112ff816112b9565b600080608083850312156113c657600080fd5b6113d0848461137c565b9150611336846040850161137c565b60408101610dbc8284805160030b8252602081015160030b60208301525050565b6000602080838503121561141357600080fd5b825167ffffffffffffffff8082111561142b57600080fd5b818501915085601f83011261143f57600080fd5b815181811115611451576114516110f3565b8060051b915061146284830161114b565b818152918301840191848101908884111561147c57600080fd5b938501935b8385101561149a57845182529385019390850190611481565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000602082840312156114e757600080fd5b5051919050565b60006020828403121561150057600080fd5b8151801515811461137557600080fd5b608081016115318285805160030b8252602081015160030b60208301525050565b8251600390810b60408401526020840151900b606083015261137556fea2646970667358221220325a0aa47ac26cb21207eaa249bd659e44519172c64c1c426777d8d09ceb35ff64736f6c63430008110033";

type BuildPathSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BuildPathSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BuildPathSystem__factory extends ContractFactory {
  constructor(...args: BuildPathSystemConstructorParams) {
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
  ): Promise<BuildPathSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<BuildPathSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): BuildPathSystem {
    return super.attach(address) as BuildPathSystem;
  }
  override connect(signer: Signer): BuildPathSystem__factory {
    return super.connect(signer) as BuildPathSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BuildPathSystemInterface {
    return new utils.Interface(_abi) as BuildPathSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BuildPathSystem {
    return new Contract(address, _abi, signerOrProvider) as BuildPathSystem;
  }
}
