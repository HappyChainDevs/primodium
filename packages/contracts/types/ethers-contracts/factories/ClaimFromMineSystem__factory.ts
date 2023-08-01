/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  ClaimFromMineSystem,
  ClaimFromMineSystemInterface,
} from "../ClaimFromMineSystem";

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
        name: "coord",
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
  "0x60806040523480156200001157600080fd5b5060405162002587380380620025878339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b61233180620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063cb6cbba7146100a7578063f2fde38b146100ba575b600080fd5b61006461005f366004611e59565b6100cf565b6040516100719190611f0c565b60405180910390f35b610082610431565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b5366004611f87565b610476565b6100cd6100c8366004611fea565b6104bf565b005b606060003390506000838060200190518101906100ec9190612007565b905060006100f98261053b565b60005490915061013f9073ffffffffffffffffffffffffffffffffffffffff167f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c56106fb565b73ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e826040518263ffffffff1660e01b815260040161017991815260200190565b602060405180830381865afa158015610196573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ba919061203c565b610272576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526044602482018190527f5b436c61696d46726f6d4d696e6553797374656d5d2043616e6e6f7420636c61908201527f696d2066726f6d206d696e6573206f6e20616e20656d70747920636f6f72646960648201527f6e61746500000000000000000000000000000000000000000000000000000000608482015260a4015b60405180910390fd5b600080546102b69073ffffffffffffffffffffffffffffffffffffffff167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c75406106fb565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916836040518263ffffffff1660e01b81526004016102f091815260200190565b602060405180830381865afa15801561030d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610331919061205e565b90508381146103e8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604660248201527f5b436c61696d46726f6d4d696e6553797374656d5d2043616e6e6f7420636c6160448201527f696d2066726f6d206d696e6573206f6e20612074696c6520796f7520646f206e60648201527f6f74206f776e0000000000000000000000000000000000000000000000000000608482015260a401610269565b60015461040b9073ffffffffffffffffffffffffffffffffffffffff168561083f565b604080516000602082015201604051602081830303815290604052945050505050919050565b60006104717f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60606104b9826040516020016104a591908151600390810b8252602092830151900b9181019190915260400190565b6040516020818303038152906040526100cf565b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461052f576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61053881610ec2565b50565b6000805481906105819073ffffffffffffffffffffffffffffffffffffffff167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c75406106fb565b905060006105c4846040518060400160405280600d81526020017f6275696c64696e672e74696c6500000000000000000000000000000000000000815250610ecb565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa158015610632573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610656919061203c565b610664575060009392505050565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905273ffffffffffffffffffffffffffffffffffffffff831690630ff4c91690602401602060405180830381865afa1580156106cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106f3919061205e565b949350505050565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa15801561076b573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526107b19190810190612077565b9050805160000361081e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f7420726567697374657265640000000000000000000000000000006044820152606401610269565b6106f38160008151811061083457610834612111565b602002602001015190565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fb3c62762a3762f5f11947c1589f40ecb45ee2b286a2a0d62946782f12d42327a600482015260009073ffffffffffffffffffffffffffffffffffffffff841690634f27da1890602401602060405180830381865afa1580156108cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108f09190612140565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810184905290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa15801561095e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610982919061203c565b61098b57505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e600482015260009073ffffffffffffffffffffffffffffffffffffffff851690634f27da1890602401602060405180830381865afa158015610a18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a3c9190612140565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f28af5d27f505af4c2623e23765f78ddc3a122099072ad9e28ef93b476bccb6c7600482015290915060009073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa158015610acc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610af09190612140565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810186905290915060009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401600060405180830381865afa158015610b61573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610ba79190810190612077565b905060005b8151811015610eb9576000610c01838381518110610bcc57610bcc612111565b602002602001015188604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f3dfdde75f9971afc18a000a5725bade43b0032029a6a77c9c8039c28ed5ff0d0600482015290915073ffffffffffffffffffffffffffffffffffffffff891690634f27da1890602401602060405180830381865afa158015610c8e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb29190612140565b73ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e826040518263ffffffff1660e01b8152600401610cec91815260200190565b602060405180830381865afa158015610d09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d2d919061203c565b15610d5657610d568888858581518110610d4957610d49612111565b6020026020010151610f64565b6000610d628583611634565b905063ffffffff811615610d9757610d9589858581518110610d8657610d86612111565b6020026020010151838b611760565b505b6040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810183905243602482015273ffffffffffffffffffffffffffffffffffffffff871690631ab06ee590604401600060405180830381600087803b158015610e0557600080fd5b505af1158015610e19573d6000803e3d6000fd5b50506040517fd923c3c4000000000000000000000000000000000000000000000000000000008152600481018590526000602482015273ffffffffffffffffffffffffffffffffffffffff8816925063d923c3c49150604401600060405180830381600087803b158015610e8c57600080fd5b505af1158015610ea0573d6000803e3d6000fd5b5050505050508080610eb19061218c565b915050610bac565b50505050505050565b610538816119d1565b6000826000015160e01b836020015160e01b83610ee7906121c4565b604080517fffffffff0000000000000000000000000000000000000000000000000000000094851660208201529390921660248401527fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000016602883015201604051602081830303815290604052610f5d90612214565b9392505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f28af5d27f505af4c2623e23765f78ddc3a122099072ad9e28ef93b476bccb6c7600482015260009073ffffffffffffffffffffffffffffffffffffffff851690634f27da1890602401602060405180830381865afa158015610ff1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110159190612140565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e600482015290915060009073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa1580156110a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110c99190612140565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f3dfdde75f9971afc18a000a5725bade43b0032029a6a77c9c8039c28ed5ff0d0600482015290915060009073ffffffffffffffffffffffffffffffffffffffff871690634f27da1890602401602060405180830381865afa158015611159573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061117d9190612140565b604080516020808201889052818301899052825180830384018152606090920190925280519101209091506000906040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015611219573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061123d919061203c565b6112d0576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810182905243602482015273ffffffffffffffffffffffffffffffffffffffff841690631ab06ee590604401600060405180830381600087803b1580156112af57600080fd5b505af11580156112c3573d6000803e3d6000fd5b5050505050505050505050565b6040517f0ff4c91600000000000000000000000000000000000000000000000000000000815260048101829052439073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa15801561133d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611361919061205e565b0361136f5750505050505050565b600061137b8383611634565b905060008163ffffffff161161141b576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810183905243602482015273ffffffffffffffffffffffffffffffffffffffff851690631ab06ee590604401600060405180830381600087803b1580156113f957600080fd5b505af115801561140d573d6000803e3d6000fd5b505050505050505050505050565b6000611428898989611a7d565b905060008163ffffffff16116114c9576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810184905243602482015273ffffffffffffffffffffffffffffffffffffffff861690631ab06ee590604401600060405180830381600087803b1580156114a657600080fd5b505af11580156114ba573d6000803e3d6000fd5b50505050505050505050505050565b60006114d58685611ba4565b6114df9043612259565b6114e9908461226c565b6114f38886611634565b6114fd9190612294565b90508063ffffffff168263ffffffff1610156115165750805b6040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810185905243602482015273ffffffffffffffffffffffffffffffffffffffff871690631ab06ee590604401600060405180830381600087803b15801561158457600080fd5b505af1158015611598573d6000803e3d6000fd5b50506040517fd923c3c40000000000000000000000000000000000000000000000000000000081526004810187905263ffffffff8416602482015273ffffffffffffffffffffffffffffffffffffffff8a16925063d923c3c49150604401600060405180830381600087803b15801561161057600080fd5b505af1158015611624573d6000803e3d6000fd5b5050505050505050505050505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa1580156116a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116c6919061203c565b6116d1576000610f5d565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa15801561173c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5d91906122b8565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f15106408456004820152600090819073ffffffffffffffffffffffffffffffffffffffff871690634f27da1890602401602060405180830381865afa1580156117ef573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118139190612140565b60408051602080820189905281830187905282518083038401815260609092019092528051910120909150600061184b888689611a7d565b90508563ffffffff168163ffffffff161115611913578273ffffffffffffffffffffffffffffffffffffffff1663d923c3c483886118898787611634565b6118939190612294565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b1580156118ef57600080fd5b505af1158015611903573d6000803e3d6000fd5b50505050600093505050506106f3565b8273ffffffffffffffffffffffffffffffffffffffff1663d923c3c4838361193b8787611634565b6119459190612294565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b1580156119a157600080fd5b505af11580156119b5573d6000803e3d6000fd5b5050505080866119c591906122de565b98975050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600080611a8b858585611cd0565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f15106408456004820152909150600090611b709073ffffffffffffffffffffffffffffffffffffffff881690634f27da1890602401602060405180830381865afa158015611b1f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b439190612140565b6040805160208082018990528183018a905282518083038401815260609092019092528051910120611634565b90508063ffffffff168263ffffffff1611611b9057600092505050610f5d565b611b9a81836122de565b9695505050505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015611c12573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c36919061203c565b611c41576000610f5d565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa158015611cac573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5d919061205e565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f211ec405e276c4670499c53a5acad168c5576b06d549dd3a610b8d516174e2d960048201526000906106f39073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa158015611d61573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d859190612140565b60408051602080820187905281830188905282518083038401815260609092019092528051910120611634565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715611e0457611e04611db2565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611e5157611e51611db2565b604052919050565b60006020808385031215611e6c57600080fd5b823567ffffffffffffffff80821115611e8457600080fd5b818501915085601f830112611e9857600080fd5b813581811115611eaa57611eaa611db2565b611eda847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611e0a565b91508082528684828501011115611ef057600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015611f3957858101830151858201604001528201611f1d565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b8060030b811461053857600080fd5b600060408284031215611f9957600080fd5b611fa1611de1565b8235611fac81611f78565b81526020830135611fbc81611f78565b60208201529392505050565b73ffffffffffffffffffffffffffffffffffffffff8116811461053857600080fd5b600060208284031215611ffc57600080fd5b8135610f5d81611fc8565b60006040828403121561201957600080fd5b612021611de1565b825161202c81611f78565b81526020830151611fbc81611f78565b60006020828403121561204e57600080fd5b81518015158114610f5d57600080fd5b60006020828403121561207057600080fd5b5051919050565b6000602080838503121561208a57600080fd5b825167ffffffffffffffff808211156120a257600080fd5b818501915085601f8301126120b657600080fd5b8151818111156120c8576120c8611db2565b8060051b91506120d9848301611e0a565b81815291830184019184810190888411156120f357600080fd5b938501935b838510156119c5578451825293850193908501906120f8565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561215257600080fd5b8151610f5d81611fc8565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036121bd576121bd61215d565b5060010190565b6000815160208301517fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000008082169350601883101561220c5780818460180360031b1b83161693505b505050919050565b80516020808301519190811015612253577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8160200360031b1b821691505b50919050565b818103818111156104b9576104b961215d565b63ffffffff81811683821602808216919082811461228c5761228c61215d565b505092915050565b63ffffffff8181168382160190808211156122b1576122b161215d565b5092915050565b6000602082840312156122ca57600080fd5b815163ffffffff81168114610f5d57600080fd5b63ffffffff8281168282160390808211156122b1576122b161215d56fea264697066735822122064587f865c301219899b6bcbba244374d6947a1772a2fcb6fd6672cf78810e9a64736f6c63430008130033";

type ClaimFromMineSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ClaimFromMineSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ClaimFromMineSystem__factory extends ContractFactory {
  constructor(...args: ClaimFromMineSystemConstructorParams) {
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
  ): Promise<ClaimFromMineSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<ClaimFromMineSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): ClaimFromMineSystem {
    return super.attach(address) as ClaimFromMineSystem;
  }
  override connect(signer: Signer): ClaimFromMineSystem__factory {
    return super.connect(signer) as ClaimFromMineSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ClaimFromMineSystemInterface {
    return new utils.Interface(_abi) as ClaimFromMineSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ClaimFromMineSystem {
    return new Contract(address, _abi, signerOrProvider) as ClaimFromMineSystem;
  }
}
