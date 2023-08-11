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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001bb938038062001bb98339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b61196380620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780636ad0ccab1461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004611577565b6100cf565b604051610071919061162a565b60405180910390f35b6100646100883660046116b8565b610d88565b610095610dd4565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c83660046116e4565b610e19565b005b606061018b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630d59332e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610141573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101659190611701565b7faa8242bee50b0300451ea2c344f4e688de8f3fd6285f41dc966a799512ca9eb0610e95565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806102a95750600154604080517f0d59332e000000000000000000000000000000000000000000000000000000008152905161027a9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610230573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102549190611701565b7f99825e92fefa8d02b75d4a96d0a395986be32968d8e664ccf86fe82a1a6314b7610e95565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b806103995750600154604080517f0d59332e000000000000000000000000000000000000000000000000000000008152905161036a9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610320573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103449190611701565b7f260bed7a4ae2c80f17d6f2234fcc01f312c59c50933985489f350f675fc3ed14610e95565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b806104895750600154604080517f0d59332e000000000000000000000000000000000000000000000000000000008152905161045a9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610410573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104349190611701565b7f2f303f6271a2758f5be14c4efe93d1ce2901144f107a501d55e697cd173027c9610e95565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b6105b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526020600482015260b960248201527f535f557064617465556e636c61696d65645265736f757263657353797374656d60448201527f3a204f6e6c7920535f557064617465506c6179657253746f726167655379737460648201527f656d2c20535f557064617465506c617965725265736f7572636550726f64756360848201527f74696f6e53797374656d2c20535f5370656e6452657175697265645265736f7560a48201527f7263657353797374656d2c20436c61696d46726f6d4d696e6553797374656d4960c48201527f44202063616e2063616c6c20746869732066756e6374696f6e0000000000000060e4820152610104015b60405180910390fd5b600080838060200190518101906105ca919061171e565b9150915060006105ed8373ffffffffffffffffffffffffffffffffffffffff1690565b6001546040517f4f27da180000000000000000000000000000000000000000000000000000000081527fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e600482015291925060009173ffffffffffffffffffffffffffffffffffffffff90911690634f27da1890602401602060405180830381865afa158015610681573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106a59190611701565b604080516020808201879052818301869052825180830384018152606090920190925280519101209091506000906040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa158015610741573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610765919061174c565b61081d576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810182905243602482015273ffffffffffffffffffffffffffffffffffffffff831690631ab06ee590604401600060405180830381600087803b1580156107d757600080fd5b505af11580156107eb573d6000803e3d6000fd5b505050508360405160200161080291815260200190565b60405160208183030381529060405295505050505050919050565b6040517f0ff4c91600000000000000000000000000000000000000000000000000000000815260048101829052439073ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa15801561088a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108ae919061176e565b036108c457604080516020810186905201610802565b6001546040517f4f27da180000000000000000000000000000000000000000000000000000000081527f222d9674c2fee077bc82c84232803a9168906e2be25c4560d094c76895b8a432600482015260009173ffffffffffffffffffffffffffffffffffffffff1690634f27da1890602401602060405180830381865afa158015610953573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109779190611701565b905060006109858284610fe1565b905060008163ffffffff1611610a4b576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810184905243602482015273ffffffffffffffffffffffffffffffffffffffff851690631ab06ee590604401600060405180830381600087803b158015610a0357600080fd5b505af1158015610a17573d6000803e3d6000fd5b5050505085604051602001610a2e91815260200190565b604051602081830303815290604052975050505050505050919050565b600154600090610a729073ffffffffffffffffffffffffffffffffffffffff16878961110d565b905060008163ffffffff1611610b39576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810185905243602482015273ffffffffffffffffffffffffffffffffffffffff861690631ab06ee590604401600060405180830381600087803b158015610af057600080fd5b505af1158015610b04573d6000803e3d6000fd5b5050505086604051602001610b1b91815260200190565b60405160208183030381529060405298505050505050505050919050565b6000610b458686611236565b610b4f90436117b6565b610b5990846117c9565b90508063ffffffff168263ffffffff161015610b725750805b6040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810186905243602482015273ffffffffffffffffffffffffffffffffffffffff871690631ab06ee590604401600060405180830381600087803b158015610be057600080fd5b505af1158015610bf4573d6000803e3d6000fd5b50506001546040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f151064084560048201526000935073ffffffffffffffffffffffffffffffffffffffff9091169150634f27da1890602401602060405180830381865afa158015610c89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cad9190611701565b90508073ffffffffffffffffffffffffffffffffffffffff1663d923c3c48784610cd7858b610fe1565b610ce191906117f1565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b158015610d3d57600080fd5b505af1158015610d51573d6000803e3d6000fd5b5050505088604051602001610d6891815260200190565b6040516020818303038152906040529a5050505050505050505050919050565b6040805173ffffffffffffffffffffffffffffffffffffffff84166020820152908101829052606090610dcb9082016040516020818303038152906040526100cf565b90505b92915050565b6000610e147f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610e89576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610e9281611362565b50565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610f05573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610f4b9190810190611815565b90508051600003610fb8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f74207265676973746572656400000000000000000000000000000060448201526064016105aa565b610fd981600081518110610fce57610fce6118bb565b602002602001015190565b949350505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa15801561104f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611073919061174c565b61107e576000610dcb565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa1580156110e9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dcb91906118ea565b60008061111b85858561136b565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f151064084560048201529091506000906112009073ffffffffffffffffffffffffffffffffffffffff881690634f27da1890602401602060405180830381865afa1580156111af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111d39190611701565b6040805160208082018990528183018a905282518083038401815260609092019092528051910120610fe1565b90508063ffffffff168263ffffffff16116112205760009250505061122f565b61122a8183611910565b925050505b9392505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa1580156112a4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112c8919061174c565b6112d3576000610dcb565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa15801561133e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dcb919061176e565b610e928161144d565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f16b501788471b0e2be7833a8d54a049f02ca15b837831d34c5bc534a33e5a1f76004820152600090610fd99073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa1580156113fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114209190611701565b60408051602080820187905281830188905282518083038401815260609092019092528051910120610fe1565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561156f5761156f6114f9565b604052919050565b6000602080838503121561158a57600080fd5b823567ffffffffffffffff808211156115a257600080fd5b818501915085601f8301126115b657600080fd5b8135818111156115c8576115c86114f9565b6115f8847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611528565b9150808252868482850101111561160e57600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b818110156116575785810183015185820160400152820161163b565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b73ffffffffffffffffffffffffffffffffffffffff81168114610e9257600080fd5b600080604083850312156116cb57600080fd5b82356116d681611696565b946020939093013593505050565b6000602082840312156116f657600080fd5b813561122f81611696565b60006020828403121561171357600080fd5b815161122f81611696565b6000806040838503121561173157600080fd5b825161173c81611696565b6020939093015192949293505050565b60006020828403121561175e57600080fd5b8151801515811461122f57600080fd5b60006020828403121561178057600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b81810381811115610dce57610dce611787565b63ffffffff8181168382160280821691908281146117e9576117e9611787565b505092915050565b63ffffffff81811683821601908082111561180e5761180e611787565b5092915050565b6000602080838503121561182857600080fd5b825167ffffffffffffffff8082111561184057600080fd5b818501915085601f83011261185457600080fd5b815181811115611866576118666114f9565b8060051b9150611877848301611528565b818152918301840191848101908884111561189157600080fd5b938501935b838510156118af57845182529385019390850190611896565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000602082840312156118fc57600080fd5b815163ffffffff8116811461122f57600080fd5b63ffffffff82811682821603908082111561180e5761180e61178756fea26469706673582212207af9b34e54620701d3063d1756e31830a93275dfc57d37b7b1ac9e2b0d78186364736f6c63430008130033";

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
