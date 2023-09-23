/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  RecallUnitsFromMotherlodeSystem,
  RecallUnitsFromMotherlodeSystemInterface,
} from "../RecallUnitsFromMotherlodeSystem";

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
        name: "rockEntity",
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
  "0x60806040523480156200001157600080fd5b506040516200139f3803806200139f8339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b61114980620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780633e991df31461007a5780638da5cb5b1461008d578063f2fde38b146100ad575b600080fd5b61006461005f366004610dcd565b6100c2565b6040516100719190610e71565b60405180910390f35b610064610088366004610ea4565b61047a565b6100956104ac565b6040516001600160a01b039091168152602001610071565b6100c06100bb366004610ed2565b6104e4565b005b60606000828060200190518101906100da9190610eef565b90503360006101087faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c754061053a565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa158015610150573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101749190610f08565b80156101e75750336040516307fa648b60e11b8152600481018590526001600160a01b03831690630ff4c91690602401602060405180830381865afa1580156101c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e59190610eef565b145b6102735760405162461bcd60e51b815260206004820152604c60248201527f526563616c6c556e69747346726f6d4d6f746865726c6f646553797374656d3a60448201527f204f6e6c7920746865206f776e6572206f662074686520726f636b2063616e2060648201526b726563616c6c20756e69747360a01b608482015260a4015b60405180910390fd5b600154604080516306ac999760e11b81529051610308926001600160a01b031691630d59332e9160048083019260209291908290030181865afa1580156102be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102e29190610f2a565b7f23f1f9079cb71316c5eb52dd7b962c701570062c868964f0a09f40cb1f88228161054d565b6001600160a01b0316636ad0ccab61038b836001600160a01b0316630ff4c916876040518263ffffffff1660e01b815260040161034791815260200190565b602060405180830381865afa158015610364573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103889190610eef565b90565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602481018690526044016000604051808303816000875af11580156103d8573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104009190810190610f47565b50600154610455906001600160a01b031683856104508383604080516001600160a01b03939093166020808501919091528382019290925280518084038201815260609093019052815191012090565b61062f565b6040805160208101859052016040516020818303038152906040529350505050919050565b60606104a68260405160200161049291815260200190565b6040516020818303038152906040526100c2565b92915050565b60006104df7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b0316331461052e57604051632f7a8ee160e01b815260040160405180910390fd5b610537816108b2565b50565b600080546104a6906001600160a01b0316835b604051637defd0f560e11b81526004810182905260009081906001600160a01b0385169063fbdfa1ea90602401600060405180830381865afa158015610597573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105bf9190810190610fbe565b905080516000036106065760405162461bcd60e51b81526020600482015260116024820152701a59081b9bdd081c9959da5cdd195c9959607a1b604482015260640161026a565b6106278160008151811061061c5761061c611064565b602002602001015190565b949350505050565b6040516309e4fb4360e31b81527f1637987787e4c0e1b376a0a4c44d9803d16014ee56d45bdca1e885d52368752460048201526000906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610696573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ba9190610f2a565b6001600160a01b03166331b933b96040518163ffffffff1660e01b8152600401600060405180830381865afa1580156106f7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261071f9190810190610fbe565b6040516309e4fb4360e31b81526000805160206110f483398151915260048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015610777573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061079b9190610f2a565b905060005b82518110156108a95760006107cf8483815181106107c0576107c0611064565b602002602001015188886108bb565b604051636667bd4760e11b8152600481018290529091506001600160a01b0384169063cccf7a8e90602401602060405180830381865afa158015610817573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061083b9190610f08565b156108965761086f88888787868151811061085857610858611064565b602002602001015161086a88876108f2565b6109d9565b61089688888887868151811061088757610887611064565b60200260200101516000610a7f565b50806108a181611090565b9150506107a0565b50505050505050565b61053781610c5a565b6040805160208082019590955280820193909352606080840192909252805180840390920182526080909201909152805191012090565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa15801561093a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061095e9190610f08565b6109695760006109d2565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa1580156109ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109d291906110a9565b9392505050565b63ffffffff811615610a785760006109f28386866108bb565b6040516309e4fb4360e31b81526000805160206110f48339815191526004820152909150610a76906001600160a01b03881690634f27da1890602401602060405180830381865afa158015610a4b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a6f9190610f2a565b8284610cd4565b505b5050505050565b6000610a8c8386866108bb565b905063ffffffff821615610b7d576040516309e4fb4360e31b81526000805160206110f483398151915260048201526001600160a01b03871690634f27da1890602401602060405180830381865afa158015610aec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b109190610f2a565b604051633648f0f160e21b81526004810183905263ffffffff841660248201526001600160a01b03919091169063d923c3c490604401600060405180830381600087803b158015610b6057600080fd5b505af1158015610b74573d6000803e3d6000fd5b50505050610a76565b6040516309e4fb4360e31b81526000805160206110f483398151915260048201526001600160a01b03871690634f27da1890602401602060405180830381865afa158015610bcf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf39190610f2a565b6001600160a01b0316634cc82215826040518263ffffffff1660e01b8152600401610c2091815260200190565b600060405180830381600087803b158015610c3a57600080fd5b505af1158015610c4e573d6000803e3d6000fd5b50505050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6000610ce084846108f2565b90506001600160a01b03841663d923c3c484610cfc85856110cf565b6040516001600160e01b031960e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b158015610d4057600080fd5b505af1158015610d54573d6000803e3d6000fd5b5050505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610d9d57610d9d610d5e565b604052919050565b600067ffffffffffffffff821115610dbf57610dbf610d5e565b50601f01601f191660200190565b600060208284031215610ddf57600080fd5b813567ffffffffffffffff811115610df657600080fd5b8201601f81018413610e0757600080fd5b8035610e1a610e1582610da5565b610d74565b818152856020838501011115610e2f57600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b83811015610e68578181015183820152602001610e50565b50506000910152565b6020815260008251806020840152610e90816040850160208701610e4d565b601f01601f19169190910160400192915050565b600060208284031215610eb657600080fd5b5035919050565b6001600160a01b038116811461053757600080fd5b600060208284031215610ee457600080fd5b81356109d281610ebd565b600060208284031215610f0157600080fd5b5051919050565b600060208284031215610f1a57600080fd5b815180151581146109d257600080fd5b600060208284031215610f3c57600080fd5b81516109d281610ebd565b600060208284031215610f5957600080fd5b815167ffffffffffffffff811115610f7057600080fd5b8201601f81018413610f8157600080fd5b8051610f8f610e1582610da5565b818152856020838501011115610fa457600080fd5b610fb5826020830160208601610e4d565b95945050505050565b60006020808385031215610fd157600080fd5b825167ffffffffffffffff80821115610fe957600080fd5b818501915085601f830112610ffd57600080fd5b81518181111561100f5761100f610d5e565b8060051b9150611020848301610d74565b818152918301840191848101908884111561103a57600080fd5b938501935b838510156110585784518252938501939085019061103f565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016110a2576110a261107a565b5060010190565b6000602082840312156110bb57600080fd5b815163ffffffff811681146109d257600080fd5b63ffffffff8181168382160190808211156110ec576110ec61107a565b509291505056fe8bd637b568ed540cabc10b49a9f3688fe5b7e4b706298b6cd07c2e1ed5600e93a2646970667358221220210436ceb0f76fd76817ab1620ecaf684bf5605bafce0e758ac578af752c1b7164736f6c63430008130033";

type RecallUnitsFromMotherlodeSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RecallUnitsFromMotherlodeSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RecallUnitsFromMotherlodeSystem__factory extends ContractFactory {
  constructor(...args: RecallUnitsFromMotherlodeSystemConstructorParams) {
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
  ): Promise<RecallUnitsFromMotherlodeSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<RecallUnitsFromMotherlodeSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): RecallUnitsFromMotherlodeSystem {
    return super.attach(address) as RecallUnitsFromMotherlodeSystem;
  }
  override connect(signer: Signer): RecallUnitsFromMotherlodeSystem__factory {
    return super.connect(signer) as RecallUnitsFromMotherlodeSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RecallUnitsFromMotherlodeSystemInterface {
    return new utils.Interface(
      _abi
    ) as RecallUnitsFromMotherlodeSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RecallUnitsFromMotherlodeSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as RecallUnitsFromMotherlodeSystem;
  }
}
