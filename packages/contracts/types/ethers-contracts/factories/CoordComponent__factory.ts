/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  CoordComponent,
  CoordComponentInterface,
} from "../CoordComponent";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "world",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BareComponent__NotImplemented",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnableWritable__NotWriter",
    type: "error",
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
        internalType: "address",
        name: "writer",
        type: "address",
      },
    ],
    name: "authorizeWriter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntities",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "value",
        type: "bytes",
      },
    ],
    name: "getEntitiesWithValue",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
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
    name: "getEntitiesWithValue",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
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
    name: "getRawValue",
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
    inputs: [],
    name: "getSchema",
    outputs: [
      {
        internalType: "string[]",
        name: "keys",
        type: "string[]",
      },
      {
        internalType: "enum LibTypes.SchemaValue[]",
        name: "values",
        type: "uint8[]",
      },
    ],
    stateMutability: "pure",
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
    name: "getValue",
    outputs: [
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
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
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
    name: "has",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
        name: "indexer",
        type: "address",
      },
    ],
    name: "registerIndexer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_world",
        type: "address",
      },
    ],
    name: "registerWorld",
    outputs: [],
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
    name: "remove",
    outputs: [],
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
      {
        internalType: "bytes",
        name: "value",
        type: "bytes",
      },
    ],
    name: "set",
    outputs: [],
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
        name: "value",
        type: "tuple",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "writer",
        type: "address",
      },
    ],
    name: "unauthorizeWriter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "world",
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
        name: "operator",
        type: "address",
      },
    ],
    name: "writeAccess",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200316f3803806200316f83398101604081905262000034916200029a565b81818181620000433362000108565b60028190556001600160a01b03821615620000635762000063826200017c565b505060405162000073906200027e565b604051809103906000f08015801562000090573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b0392909216919091179055604051620000bf906200028c565b604051809103906000f080158015620000dc573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b039290921691909117905550620002d692505050565b60006200011f6200023460201b62000d821760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6200018662000258565b6001600160a01b0316336001600160a01b031614620001b857604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200021857600080fd5b505af11580156200022d573d6000803e3d6000fd5b5050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b60006200026f6200023460201b62000d821760201c565b546001600160a01b0316919050565b61084c806200209583390190565b61088e80620028e183390190565b60008060408385031215620002ae57600080fd5b82516001600160a01b0381168114620002c657600080fd5b6020939093015192949293505050565b611daf80620002e66000396000f3fe608060405234801561001057600080fd5b50600436106101515760003560e01c80638da5cb5b116100cd578063bf3bf26a11610081578063cccf7a8e11610066578063cccf7a8e146102fc578063dcb14c2f1461030f578063f2fde38b1461032257600080fd5b8063bf3bf26a146102d6578063bf4fe57e146102e957600080fd5b8063af640d0f116100b2578063af640d0f1461028c578063b361be46146102a3578063b8bc073d146102b657600080fd5b80638da5cb5b146102715780639d2c76b41461027957600080fd5b80634fef6a381161012457806375c0669c1161010957806375c0669c14610228578063861eb9051461023b5780638b2829471461025e57600080fd5b80634fef6a38146101ff5780636b122fe01461021257600080fd5b80630ff4c9161461015657806330b67baa1461019057806331b933b9146101d55780634cc82215146101ea575b600080fd5b610169610164366004611514565b610335565b604080518251600390810b8252602093840151900b92810192909252015b60405180910390f35b6000546101b09073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610187565b6101dd610388565b604051610187919061152d565b6101fd6101f8366004611514565b610443565b005b6101fd61020d366004611571565b61048e565b61021a61056c565b604051610187929190611641565b6101fd610236366004611571565b6106f1565b61024e610249366004611571565b6107a7565b6040519015158152602001610187565b6101fd61026c36600461183d565b610832565b6101b061087f565b6101fd610287366004611571565b6108bf565b61029560025481565b604051908152602001610187565b6101dd6102b1366004611884565b6109e8565b6102c96102c4366004611514565b610aa5565b60405161018791906118c1565b6101dd6102e43660046118ec565b610b47565b6101fd6102f7366004611571565b610b71565b61024e61030a366004611514565b610c4c565b6101fd61031d366004611908565b610ce0565b6101fd610330366004611571565b610d09565b604080518082019091526000808252602082015260008061035584610aa5565b8060200190518101906103689190611944565b60408051808201909152600392830b8152910b6020820152949350505050565b600354604080517f410d59cc000000000000000000000000000000000000000000000000000000008152905160609273ffffffffffffffffffffffffffffffffffffffff169163410d59cc9160048083019260009291908290030181865afa1580156103f8573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261043e919081019061197e565b905090565b61044c336107a7565b610482576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61048b81610da6565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146104fe576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff1660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c9096020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b6040805160028082526060828101909352829190816020015b606081526020019060019003908161058557505060408051600280825260608201835292945091906020830190803683370190505090506040518060400160405280600181526020017f78000000000000000000000000000000000000000000000000000000000000008152508260008151811061060557610605611a24565b602002602001018190525060038160008151811061062557610625611a24565b6020026020010190602181111561063e5761063e611612565b9081602181111561065157610651611612565b815250506040518060400160405280600181526020017f79000000000000000000000000000000000000000000000000000000000000008152508260018151811061069e5761069e611a24565b60200260200101819052506003816001815181106106be576106be611a24565b602002602001019060218111156106d7576106d7611612565b908160218111156106ea576106ea611612565b9052509091565b6106fa336107a7565b610730576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b73ffffffffffffffffffffffffffffffffffffffff811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff168061082c57506107fd61087f565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b92915050565b61083b336107a7565b610871576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61087b8282611065565b5050565b600061043e7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461092f576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556002546040517ff3034770000000000000000000000000000000000000000000000000000000008152306004820152602481019190915263f3034770906044015b600060405180830381600087803b1580156109cd57600080fd5b505af11580156109e1573d6000803e3d6000fd5b5050505050565b60048054825160208401206040517f796c5e940000000000000000000000000000000000000000000000000000000081529283015260609173ffffffffffffffffffffffffffffffffffffffff9091169063796c5e9490602401600060405180830381865afa158015610a5f573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261082c919081019061197e565b6000818152600160205260409020805460609190610ac290611a53565b80601f0160208091040260200160405190810160405280929190818152602001828054610aee90611a53565b8015610b3b5780601f10610b1057610100808354040283529160200191610b3b565b820191906000526020600020905b815481529060010190602001808311610b1e57829003601f168201915b50505050509050919050565b606061082c82604051602001610b5d9190611aa0565b6040516020818303038152906040526109e8565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610be1576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff1660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c9096020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055565b6003546040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009173ffffffffffffffffffffffffffffffffffffffff169063cccf7a8e90602401602060405180830381865afa158015610cbc573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061082c9190611ad2565b61087b8282604051602001610cf59190611aa0565b604051602081830303815290604052610832565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610d79576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61048b816112fc565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b60045460008281526001602052604090819020905173ffffffffffffffffffffffffffffffffffffffff909216916385edea1391610de391611af4565b60405190819003812060e083901b7fffffffff000000000000000000000000000000000000000000000000000000001682526004820152602401602060405180830381865afa158015610e3a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e5e9190611b88565b600003610e685750565b60045460008281526001602052604090819020905173ffffffffffffffffffffffffffffffffffffffff90921691636526db7a91610ea591611af4565b60405190819003812060e083901b7fffffffff00000000000000000000000000000000000000000000000000000000168252600482015260248101849052604401600060405180830381600087803b158015610f0057600080fd5b505af1158015610f14573d6000803e3d6000fd5b50506003546040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810185905273ffffffffffffffffffffffffffffffffffffffff9091169250634cc822159150602401600060405180830381600087803b158015610f8457600080fd5b505af1158015610f98573d6000803e3d6000fd5b50505050610fa581611305565b60005b60055481101561087b5760058181548110610fc557610fc5611a24565b6000918252602090912001546040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff90911690634cc8221590602401600060405180830381600087803b15801561103a57600080fd5b505af115801561104e573d6000803e3d6000fd5b50505050808061105d90611ba1565b915050610fa8565b6003546040517f1003e2d20000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff90911690631003e2d290602401600060405180830381600087803b1580156110d157600080fd5b505af11580156110e5573d6000803e3d6000fd5b505060045460008581526001602052604090819020905173ffffffffffffffffffffffffffffffffffffffff9092169350636526db7a925061112691611af4565b60405190819003812060e083901b7fffffffff00000000000000000000000000000000000000000000000000000000168252600482015260248101859052604401600060405180830381600087803b15801561118157600080fd5b505af1158015611195573d6000803e3d6000fd5b505060048054845160208601206040517f771602f7000000000000000000000000000000000000000000000000000000008152928301526024820186905273ffffffffffffffffffffffffffffffffffffffff16925063771602f79150604401600060405180830381600087803b15801561120f57600080fd5b505af1158015611223573d6000803e3d6000fd5b505050506112318282611373565b60005b6005548110156112f7576005818154811061125157611251611a24565b6000918252602090912001546040517f0216b83800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690630216b838906112b29086908690600401611c00565b600060405180830381600087803b1580156112cc57600080fd5b505af11580156112e0573d6000803e3d6000fd5b5050505080806112ef90611ba1565b915050611234565b505050565b61048b8161141a565b600081815260016020526040812061131c916114c6565b6000546040517f0de3b7b50000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff90911690630de3b7b5906024016109b3565b600082815260016020526040902061138b8282611c5f565b506000546040517fcfd3c57f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063cfd3c57f906113e49085908590600401611c00565b600060405180830381600087803b1580156113fe57600080fd5b505af1158015611412573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b5080546114d290611a53565b6000825580601f106114e2575050565b601f01602090049060005260206000209081019061048b91905b8082111561151057600081556001016114fc565b5090565b60006020828403121561152657600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561156557835183529284019291840191600101611549565b50909695505050505050565b60006020828403121561158357600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146115a757600080fd5b9392505050565b6000815180845260005b818110156115d4576020818501810151868301820152016115b8565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b838110156116b6577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa08887030185526116a48683516115ae565b9550938201939082019060010161166a565b50508584038187015286518085528782019482019350915060005b8281101561172457845160228110611712577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b845293810193928101926001016116d1565b5091979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156117a7576117a7611731565b604052919050565b600082601f8301126117c057600080fd5b813567ffffffffffffffff8111156117da576117da611731565b61180b60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611760565b81815284602083860101111561182057600080fd5b816020850160208301376000918101602001919091529392505050565b6000806040838503121561185057600080fd5b82359150602083013567ffffffffffffffff81111561186e57600080fd5b61187a858286016117af565b9150509250929050565b60006020828403121561189657600080fd5b813567ffffffffffffffff8111156118ad57600080fd5b6118b9848285016117af565b949350505050565b6020815260006115a760208301846115ae565b6000604082840312156118e657600080fd5b50919050565b6000604082840312156118fe57600080fd5b6115a783836118d4565b6000806060838503121561191b57600080fd5b8235915061192c84602085016118d4565b90509250929050565b8060030b811461048b57600080fd5b6000806040838503121561195757600080fd5b825161196281611935565b602084015190925061197381611935565b809150509250929050565b6000602080838503121561199157600080fd5b825167ffffffffffffffff808211156119a957600080fd5b818501915085601f8301126119bd57600080fd5b8151818111156119cf576119cf611731565b8060051b91506119e0848301611760565b81815291830184019184810190888411156119fa57600080fd5b938501935b83851015611a18578451825293850193908501906119ff565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600181811c90821680611a6757607f821691505b6020821081036118e6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b604081018235611aaf81611935565b60030b82526020830135611ac281611935565b8060030b60208401525092915050565b600060208284031215611ae457600080fd5b815180151581146115a757600080fd5b6000808354611b0281611a53565b60018281168015611b1a5760018114611b4d57611b7c565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0084168752821515830287019450611b7c565b8760005260208060002060005b85811015611b735781548a820152908401908201611b5a565b50505082870194505b50929695505050505050565b600060208284031215611b9a57600080fd5b5051919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611bf9577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b8281526040602082015260006118b960408301846115ae565b601f8211156112f757600081815260208120601f850160051c81016020861015611c405750805b601f850160051c820191505b8181101561141257828155600101611c4c565b815167ffffffffffffffff811115611c7957611c79611731565b611c8d81611c878454611a53565b84611c19565b602080601f831160018114611ce05760008415611caa5750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555611412565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b82811015611d2d57888601518255948401946001909101908401611d0e565b5085821015611d6957878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b0190555056fea26469706673582212204ee91331ad72ea1b3b41f9ee59cb633d7b7f3ad8497ef2636476f6e853a4af6864736f6c63430008110033608060405234801561001057600080fd5b5061001a3361001f565b6100b4565b600061003361009060201b6105431760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b610789806100c36000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638e7cb6e11161005b5780638e7cb6e114610100578063949d225d1461012a578063cccf7a8e1461013b578063f2fde38b1461015e57600080fd5b80631003e2d21461008d578063410d59cc146100a25780634cc82215146100c05780638da5cb5b146100d3575b600080fd5b6100a061009b36600461061b565b610171565b005b6100aa610233565b6040516100b79190610634565b60405180910390f35b6100a06100ce36600461061b565b61028b565b6100db6103ef565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100b7565b61011361010e36600461061b565b610434565b6040805192151583526020830191909152016100b7565b6000546040519081526020016100b7565b61014e61014936600461061b565b610467565b60405190151581526020016100b7565b6100a061016c366004610678565b6104ca565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146101e1576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6101ea81610467565b61023057600080548282526001602081905260408320829055810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018190555b50565b6060600080548060200260200160405190810160405280929190818152602001828054801561028157602002820191906000526020600020905b81548152602001906001019080831161026d575b5050505050905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146102fb576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61030481610467565b156102305760008054610319906001906106b5565b81548110610329576103296106f5565b9060005260206000200154600060016000848152602001908152602001600020548154811061035a5761035a6106f5565b60009182526020808320909101929092558281526001918290526040812054815490929190819084908110610391576103916106f5565b9060005260206000200154815260200190815260200160002081905550600160008281526020019081526020016000206000905560008054806103d6576103d6610724565b6001900381819060005260206000200160009055905550565b600061042f7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60008061044083610467565b61044f57506000928392509050565b50506000908152600160208190526040909120549091565b60008054810361047957506000919050565b60008281526001602052604081205490036104b55781600080815481106104a2576104a26106f5565b9060005260206000200154149050919050565b50600090815260016020526040902054151590565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461053a576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61023081610567565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804608054604051610230928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60006020828403121561062d57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561066c57835183529284019291840191600101610650565b50909695505050505050565b60006020828403121561068a57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146106ae57600080fd5b9392505050565b818103818111156106ef577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea26469706673582212209a78eb981d2558ca25aabc42133a6a0bf0a3f201072d3f86592ff4e562d30cf364736f6c63430008110033608060405234801561001057600080fd5b5061001a3361001f565b6100b4565b600061003361009060201b6105691760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6107cb806100c36000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806385edea131161005b57806385edea13146100d35780638da5cb5b14610101578063a0265ff81461012e578063f2fde38b1461015157600080fd5b80636526db7a14610082578063771602f714610097578063796c5e94146100aa575b600080fd5b610095610090366004610641565b610164565b005b6100956100a5366004610641565b610301565b6100bd6100b8366004610663565b6103b5565b6040516100ca919061067c565b60405180910390f35b6100f36100e1366004610663565b60009081526020819052604090205490565b6040519081526020016100ca565b610109610415565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100ca565b61014161013c366004610641565b61045a565b60405190151581526020016100ca565b61009561015f3660046106c0565b6104ed565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146101d4576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6101de828261045a565b156102fd57600082815260208190526040902080546101ff906001906106fd565b8154811061020f5761020f610737565b6000918252602080832090910154848352828252604080842060018452818520868652909352909220548154811061024957610249610737565b60009182526020808320909101929092558381526001825260408082208483528084528183205486845283855291832085845293819052835491939092918490811061029757610297610737565b600091825260208083209091015483528281019390935260409182018120939093558483526001825280832084845282528083208390558483529082905290208054806102e6576102e6610766565b600190038181906000526020600020016000905590555b5050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610371576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61037b828261045a565b6102fd5760009182526020828152604080842080546001808552838720868852855292862081905585845291820181558452922090910155565b6000818152602081815260409182902080548351818402810184019094528084526060939283018282801561040957602002820191906000526020600020905b8154815260200190600101908083116103f5575b50505050509050919050565b60006104557f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b6000828152602081905260408120548103610477575060006104e7565b600083815260016020908152604080832085845290915281205490036104c957600083815260208190526040812080548492906104b6576104b6610737565b90600052602060002001541490506104e7565b50600082815260016020908152604080832084845290915290205415155b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461055d576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6105668161058d565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804608054604051610566928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000806040838503121561065457600080fd5b50508035926020909101359150565b60006020828403121561067557600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156106b457835183529284019291840191600101610698565b50909695505050505050565b6000602082840312156106d257600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146106f657600080fd5b9392505050565b818103818111156104e7577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea26469706673582212203cab7859742f0ed568efd4384357586443224b9d521c17701377f93aaf4967ec64736f6c63430008110033";

type CoordComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CoordComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CoordComponent__factory extends ContractFactory {
  constructor(...args: CoordComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    id: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CoordComponent> {
    return super.deploy(world, id, overrides || {}) as Promise<CoordComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    id: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, id, overrides || {});
  }
  override attach(address: string): CoordComponent {
    return super.attach(address) as CoordComponent;
  }
  override connect(signer: Signer): CoordComponent__factory {
    return super.connect(signer) as CoordComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CoordComponentInterface {
    return new utils.Interface(_abi) as CoordComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CoordComponent {
    return new Contract(address, _abi, signerOrProvider) as CoordComponent;
  }
}
