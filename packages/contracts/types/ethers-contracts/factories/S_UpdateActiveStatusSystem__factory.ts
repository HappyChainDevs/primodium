/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  S_UpdateActiveStatusSystem,
  S_UpdateActiveStatusSystemInterface,
} from "../S_UpdateActiveStatusSystem";

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
        name: "buildingEntity",
        type: "uint256",
      },
      {
        internalType: "enum EActionType",
        name: "actionType",
        type: "uint8",
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
  "0x60806040523480156200001157600080fd5b50604051620024d4380380620024d48339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b61227e80620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe1461005157806327b450991461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004611cb7565b6100cf565b6040516100719190611d5b565b60405180910390f35b610064610088366004611ddb565b610fe4565b61009561101a565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c8366004611e1d565b61105f565b005b606061018b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630d59332e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610141573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101659190611e41565b7f57247228bbd93ac6953378fea0f421ebc4978d448f7383f1a2816e6ca6e2894d6110db565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806102a95750600154604080517f0d59332e000000000000000000000000000000000000000000000000000000008152905161027a9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610230573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102549190611e41565b7fd573ac88b34a4d827762c3f1e7dc53ea2b602480271c42f976cd9097a3985a016110db565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b806103995750600154604080517f0d59332e000000000000000000000000000000000000000000000000000000008152905161036a9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610320573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103449190611e41565b7ff39d315320cdfe464ad36c5d26133acfadb3c7e2d9a6ac9e6bb331cb612f42a86110db565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b806104895750600154604080517f0d59332e000000000000000000000000000000000000000000000000000000008152905161045a9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610410573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104349190611e41565b7f9d56d809d9533f83d16954f67b7304a365b59083abb67bc9d95ee7ab809e95546110db565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b806105795750600154604080517f0d59332e000000000000000000000000000000000000000000000000000000008152905161054a9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610500573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105249190611e41565b7f1025ff30bfb6e410680d7d93480140d7b1ee1777bb9786914eb4bd24d582f6f46110db565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b806106695750600154604080517f0d59332e000000000000000000000000000000000000000000000000000000008152905161063a9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa1580156105f0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106149190611e41565b7ff2021642afaf65bb89c355c68b4a3fc6356dc9299686fc001113a2e2b7b600a36110db565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b610793576040517f08c379a00000000000000000000000000000000000000000000000000000000081526020600482015260ac60248201527f535f55706461746541637469766553746174757353797374656d3a204f6e6c7960448201527f204275696c6453797374656d2c2044657374726f7953797374656d2c2055706760648201527f726164654275696c64696e6753797374656d2c204275696c645061746853797360848201527f74656d2c2044657374726f795061746853797374656d20616e6420535f55706460a48201527f61746541637469766553746174757353797374656d2063616e2063616c6c207460c48201527f6869732066756e6374696f6e000000000000000000000000000000000000000060e4820152610104015b60405180910390fd5b6000806000848060200190518101906107ac9190611e5e565b9194509250905060028160028111156107c7576107c7611e96565b036107fd576107d88383600061121f565b6040805160006020820152016040516020818303038152906040529350505050919050565b600080546108419073ffffffffffffffffffffffffffffffffffffffff167f0d469bcaf5f43a6290ca2906ecdeb5ef80d7723e8cad27045bddb6e1eb9da4356110db565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810185905290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa1580156108af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108d39190611ec5565b610909576108e38484600061121f565b604080516000602082015201604051602081830303815290604052945050505050919050565b6000805461094d9073ffffffffffffffffffffffffffffffffffffffff167fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e6110db565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810186905290915060009073ffffffffffffffffffffffffffffffffffffffff831690630ff4c91690602401602060405180830381865afa1580156109be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e29190611f00565b6000805463ffffffff92909216925090610a329073ffffffffffffffffffffffffffffffffffffffff167f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c56110db565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916876040518263ffffffff1660e01b8152600401610a6c91815260200190565b602060405180830381865afa158015610a89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aad9190611f1b565b60408051602080820184905281830186905282518083038401815260609092019092528051910120909150610b017fa9030fd5d2d8df4ef9e9a591c66869629e3031bc7112e7766b55d9f29321005d611870565b73ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e826040518263ffffffff1660e01b8152600401610b3b91815260200190565b602060405180830381865afa158015610b58573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b7c9190611ec5565b15610fae5760008054610bc59073ffffffffffffffffffffffffffffffffffffffff167fcd21223913df34354e53714bb49095fd4d6a8c8d2ac1fe38f8a14e9fd673e77c6110db565b6040517ffbdfa1ea000000000000000000000000000000000000000000000000000000008152600481018a905290915060009073ffffffffffffffffffffffffffffffffffffffff88169063fbdfa1ea90602401600060405180830381865afa158015610c36573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610c7c9190810190611fbe565b905060005b8151811015610e3d57858773ffffffffffffffffffffffffffffffffffffffff16630ff4c916848481518110610cb957610cb9611ff3565b60200260200101516040518263ffffffff1660e01b8152600401610cdf91815260200190565b602060405180830381865afa158015610cfc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d209190611f00565b63ffffffff161080610ded5750610d4f828281518110610d4257610d42611ff3565b602002602001015161189a565b8015610ded57508273ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e838381518110610d8457610d84611ff3565b60200260200101516040518263ffffffff1660e01b8152600401610daa91815260200190565b602060405180830381865afa158015610dc7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610deb9190611ec5565b155b15610e2b57610dfe8b8b600061121f565b6040805160006020820152016040516020818303038152906040529b505050505050505050505050919050565b80610e3581612022565b915050610c81565b5060008054610e829073ffffffffffffffffffffffffffffffffffffffff167fa9030fd5d2d8df4ef9e9a591c66869629e3031bc7112e7766b55d9f29321005d6110db565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c9168b6040518263ffffffff1660e01b8152600401610ebc91815260200190565b600060405180830381865afa158015610ed9573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610f1f9190810190612081565b905060005b816020015151811015610fa957600082602001518281518110610f4957610f49611ff3565b602002602001015163ffffffff161115610f9757610f698c8c600061121f565b6040805160006020820152016040516020818303038152906040529c50505050505050505050505050919050565b80610fa181612022565b915050610f24565b505050505b610fba8888600161121f565b60408051600160208201520160405160208183030381529060405298505050505050505050919050565b6060611012848484604051602001610ffe93929190612171565b6040516020818303038152906040526100cf565b949350505050565b600061105a7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146110cf576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6110d881611b16565b50565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa15801561114b573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526111919190810190611fbe565b905080516000036111fe576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640161078a565b6110128160008151811061121457611214611ff3565b602002602001015190565b600080546112639073ffffffffffffffffffffffffffffffffffffffff167fcd21223913df34354e53714bb49095fd4d6a8c8d2ac1fe38f8a14e9fd673e77c6110db565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810185905290915060009073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa1580156112d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112f89190611ec5565b905082151581151514801561130b575082155b15611317575050505050565b828015611322575080155b156113ac576040517f60fe47b10000000000000000000000000000000000000000000000000000000081526004810185905273ffffffffffffffffffffffffffffffffffffffff8316906360fe47b190602401600060405180830381600087803b15801561138f57600080fd5b505af11580156113a3573d6000803e3d6000fd5b5050505061143d565b821580156113b75750805b1561143d576040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810185905273ffffffffffffffffffffffffffffffffffffffff831690634cc8221590602401600060405180830381600087803b15801561142457600080fd5b505af1158015611438573d6000803e3d6000fd5b505050505b600080546114819073ffffffffffffffffffffffffffffffffffffffff167f0d469bcaf5f43a6290ca2906ecdeb5ef80d7723e8cad27045bddb6e1eb9da4356110db565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810187905290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa1580156114ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115139190611ec5565b61151f57505050505050565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810186905260009073ffffffffffffffffffffffffffffffffffffffff831690630ff4c91690602401602060405180830381865afa15801561158d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115b19190611f1b565b90506115bc8161189a565b156115d7576115cd87826000610fe4565b5050505050505050565b6000805461161b9073ffffffffffffffffffffffffffffffffffffffff167fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e6110db565b905060006116d9600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630d59332e6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561168f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b39190611e41565b7f99825e92fefa8d02b75d4a96d0a395986be32968d8e664ccf86fe82a1a6314b76110db565b90506000851515881515146116fe57876116f45760026116f7565b60005b90506117a8565b6040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018a905260019073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa15801561176c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117909190611f00565b63ffffffff16116117a25760006117a5565b60015b90505b6040517f27b4509900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8316906327b45099906117fe908d908d908690600401612171565b6000604051808303816000875af115801561181d573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261186391908101906121da565b5050505050505050505050565b600080546118949073ffffffffffffffffffffffffffffffffffffffff16836110db565b92915050565b6000805481906118e09073ffffffffffffffffffffffffffffffffffffffff167f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c56110db565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916846040518263ffffffff1660e01b815260040161191a91815260200190565b602060405180830381865afa158015611937573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061195b9190611f1b565b60008054919250906119a39073ffffffffffffffffffffffffffffffffffffffff167fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e6110db565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916856040518263ffffffff1660e01b81526004016119dd91815260200190565b602060405180830381865afa1580156119fa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a1e9190611f00565b60408051602080820186905263ffffffff8416828401528251808303840181526060909201909252805191012060005491925090611a929073ffffffffffffffffffffffffffffffffffffffff167fa9030fd5d2d8df4ef9e9a591c66869629e3031bc7112e7766b55d9f29321005d6110db565b73ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e826040518263ffffffff1660e01b8152600401611acc91815260200190565b602060405180830381865afa158015611ae9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b0d9190611ec5565b95945050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516110d8928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715611c1c57611c1c611bca565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611c6957611c69611bca565b604052919050565b600067ffffffffffffffff821115611c8b57611c8b611bca565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b600060208284031215611cc957600080fd5b813567ffffffffffffffff811115611ce057600080fd5b8201601f81018413611cf157600080fd5b8035611d04611cff82611c71565b611c22565b818152856020838501011115611d1957600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b83811015611d52578181015183820152602001611d3a565b50506000910152565b6020815260008251806020840152611d7a816040850160208701611d37565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b73ffffffffffffffffffffffffffffffffffffffff811681146110d857600080fd5b600381106110d857600080fd5b600080600060608486031215611df057600080fd5b8335611dfb81611dac565b9250602084013591506040840135611e1281611dce565b809150509250925092565b600060208284031215611e2f57600080fd5b8135611e3a81611dac565b9392505050565b600060208284031215611e5357600080fd5b8151611e3a81611dac565b600080600060608486031215611e7357600080fd5b8351611e7e81611dac565b602085015160408601519194509250611e1281611dce565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060208284031215611ed757600080fd5b81518015158114611e3a57600080fd5b805163ffffffff81168114611efb57600080fd5b919050565b600060208284031215611f1257600080fd5b611e3a82611ee7565b600060208284031215611f2d57600080fd5b5051919050565b600067ffffffffffffffff821115611f4e57611f4e611bca565b5060051b60200190565b600082601f830112611f6957600080fd5b81516020611f79611cff83611f34565b82815260059290921b84018101918181019086841115611f9857600080fd5b8286015b84811015611fb35780518352918301918301611f9c565b509695505050505050565b600060208284031215611fd057600080fd5b815167ffffffffffffffff811115611fe757600080fd5b61101284828501611f58565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361207a577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b6000602080838503121561209457600080fd5b825167ffffffffffffffff808211156120ac57600080fd5b90840190604082870312156120c057600080fd5b6120c8611bf9565b8251828111156120d757600080fd5b6120e388828601611f58565b82525083830151828111156120f757600080fd5b80840193505086601f84011261210c57600080fd5b8251915061211c611cff83611f34565b82815260059290921b8301840191848101908884111561213b57600080fd5b938501935b838510156121605761215185611ee7565b82529385019390850190612140565b948201949094529695505050505050565b73ffffffffffffffffffffffffffffffffffffffff841681526020810183905260608101600383106121cc577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826040830152949350505050565b6000602082840312156121ec57600080fd5b815167ffffffffffffffff81111561220357600080fd5b8201601f8101841361221457600080fd5b8051612222611cff82611c71565b81815285602083850101111561223757600080fd5b611b0d826020830160208601611d3756fea26469706673582212206ab3f785a03ec8c25da11a05b41388aaf8f1861dd939e076c0958ce306b66e7264736f6c63430008130033";

type S_UpdateActiveStatusSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: S_UpdateActiveStatusSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class S_UpdateActiveStatusSystem__factory extends ContractFactory {
  constructor(...args: S_UpdateActiveStatusSystemConstructorParams) {
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
  ): Promise<S_UpdateActiveStatusSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<S_UpdateActiveStatusSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): S_UpdateActiveStatusSystem {
    return super.attach(address) as S_UpdateActiveStatusSystem;
  }
  override connect(signer: Signer): S_UpdateActiveStatusSystem__factory {
    return super.connect(signer) as S_UpdateActiveStatusSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): S_UpdateActiveStatusSystemInterface {
    return new utils.Interface(_abi) as S_UpdateActiveStatusSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): S_UpdateActiveStatusSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as S_UpdateActiveStatusSystem;
  }
}
