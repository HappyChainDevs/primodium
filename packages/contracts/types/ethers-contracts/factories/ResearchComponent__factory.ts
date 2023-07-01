/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  ResearchComponent,
  ResearchComponentInterface,
} from "../ResearchComponent";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "world",
        type: "address",
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
        internalType: "bool",
        name: "value",
        type: "bool",
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
        internalType: "bool",
        name: "",
        type: "bool",
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
  "0x60806040523480156200001157600080fd5b5060405162002f1438038062002f14833981016040819052620000349162000266565b807f260499b7630a3093f2f4ce16a340a578c70fc65603511dac57ee1b24a87e1ecd8181818162000065336200012b565b60028190556001600160a01b038216156200008557620000858262000194565b505060405162000095906200024a565b604051809103906000f080158015620000b2573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b0392909216919091179055604051620000e19062000258565b604051809103906000f080158015620000fe573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b039290921691909117905550620002989350505050565b60008051602062002ef483398151915280546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60008051602062002ef4833981519152546001600160a01b03163314620001ce57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200022e57600080fd5b505af115801562000243573d6000803e3d6000fd5b5050505050565b6108088062001e9d83390190565b61084f80620026a583390190565b6000602082840312156200027957600080fd5b81516001600160a01b03811681146200029157600080fd5b9392505050565b611bf580620002a86000396000f3fe608060405234801561001057600080fd5b50600436106101505760003560e01c8063861eb905116100cd578063b361be4611610081578063bf4fe57e11610066578063bf4fe57e146102dd578063cccf7a8e146102f0578063f2fde38b1461030357600080fd5b8063b361be46146102aa578063b8bc073d146102bd57600080fd5b80638da5cb5b116100b25780638da5cb5b146102785780639d2c76b414610280578063af640d0f1461029357600080fd5b8063861eb905146102525780638b2829471461026557600080fd5b80634cc822151161012457806360fe47b11161010957806360fe47b1146102165780636b122fe01461022957806375c0669c1461023f57600080fd5b80634cc82215146101ee5780634fef6a381461020357600080fd5b80621326ab146101555780630ff4c9161461017e57806330b67baa146101a157806331b933b9146101e6575b600080fd5b61016861016336600461141f565b610316565b604051610175919061143c565b60405180910390f35b61019161018c366004611480565b61034a565b6040519015158152602001610175565b6000546101c19073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610175565b610168610370565b6102016101fc366004611480565b61042b565b005b610201610211366004611499565b610476565b610201610224366004611480565b610554565b61023161057a565b604051610175929190611562565b61020161024d366004611499565b610666565b610191610260366004611499565b61071c565b61020161027336600461175e565b6107a6565b6101c16107f3565b61020161028e366004611499565b610833565b61029c60025481565b604051908152602001610175565b6101686102b83660046117a5565b61095c565b6102d06102cb366004611480565b610a19565b60405161017591906117e2565b6102016102eb366004611499565b610abb565b6101916102fe366004611480565b610b96565b610201610311366004611499565b610c2a565b606061034482604051602001610330911515815260200190565b60405160208183030381529060405261095c565b92915050565b60008061035683610a19565b80602001905181019061036991906117f5565b9392505050565b600354604080517f410d59cc000000000000000000000000000000000000000000000000000000008152905160609273ffffffffffffffffffffffffffffffffffffffff169163410d59cc9160048083019260009291908290030181865afa1580156103e0573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526104269190810190611812565b905090565b6104343361071c565b61046a576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61047381610ca3565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146104e6576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff1660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c9096020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b6040805160016020820152610473918391016040516020818303038152906040526107a6565b604080516001808252818301909252606091829190816020015b6060815260200190600190039081610594575050604080516001808252818301909252919350602080830190803683370190505090506040518060400160405280600581526020017f76616c756500000000000000000000000000000000000000000000000000000081525082600081518110610613576106136118b8565b6020026020010181905250600081600081518110610633576106336118b8565b6020026020010190602181111561064c5761064c611533565b9081602181111561065f5761065f611533565b9052509091565b61066f3361071c565b6106a5576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b73ffffffffffffffffffffffffffffffffffffffff811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff168061034457506107726107f3565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161492915050565b6107af3361071c565b6107e5576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6107ef8282610f62565b5050565b60006104267f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146108a3576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556002546040517ff3034770000000000000000000000000000000000000000000000000000000008152306004820152602481019190915263f3034770906044015b600060405180830381600087803b15801561094157600080fd5b505af1158015610955573d6000803e3d6000fd5b5050505050565b60048054825160208401206040517f796c5e940000000000000000000000000000000000000000000000000000000081529283015260609173ffffffffffffffffffffffffffffffffffffffff9091169063796c5e9490602401600060405180830381865afa1580156109d3573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526103449190810190611812565b6000818152600160205260409020805460609190610a36906118e7565b80601f0160208091040260200160405190810160405280929190818152602001828054610a62906118e7565b8015610aaf5780601f10610a8457610100808354040283529160200191610aaf565b820191906000526020600020905b815481529060010190602001808311610a9257829003601f168201915b50505050509050919050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610b2b576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff1660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c9096020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055565b6003546040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009173ffffffffffffffffffffffffffffffffffffffff169063cccf7a8e90602401602060405180830381865afa158015610c06573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061034491906117f5565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610c9a576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610473816111f9565b60045460008281526001602052604090819020905173ffffffffffffffffffffffffffffffffffffffff909216916385edea1391610ce09161193a565b60405190819003812060e083901b7fffffffff000000000000000000000000000000000000000000000000000000001682526004820152602401602060405180830381865afa158015610d37573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d5b91906119ce565b600003610d655750565b60045460008281526001602052604090819020905173ffffffffffffffffffffffffffffffffffffffff90921691636526db7a91610da29161193a565b60405190819003812060e083901b7fffffffff00000000000000000000000000000000000000000000000000000000168252600482015260248101849052604401600060405180830381600087803b158015610dfd57600080fd5b505af1158015610e11573d6000803e3d6000fd5b50506003546040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810185905273ffffffffffffffffffffffffffffffffffffffff9091169250634cc822159150602401600060405180830381600087803b158015610e8157600080fd5b505af1158015610e95573d6000803e3d6000fd5b50505050610ea281611202565b60005b6005548110156107ef5760058181548110610ec257610ec26118b8565b6000918252602090912001546040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff90911690634cc8221590602401600060405180830381600087803b158015610f3757600080fd5b505af1158015610f4b573d6000803e3d6000fd5b505050508080610f5a906119e7565b915050610ea5565b6003546040517f1003e2d20000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff90911690631003e2d290602401600060405180830381600087803b158015610fce57600080fd5b505af1158015610fe2573d6000803e3d6000fd5b505060045460008581526001602052604090819020905173ffffffffffffffffffffffffffffffffffffffff9092169350636526db7a92506110239161193a565b60405190819003812060e083901b7fffffffff00000000000000000000000000000000000000000000000000000000168252600482015260248101859052604401600060405180830381600087803b15801561107e57600080fd5b505af1158015611092573d6000803e3d6000fd5b505060048054845160208601206040517f771602f7000000000000000000000000000000000000000000000000000000008152928301526024820186905273ffffffffffffffffffffffffffffffffffffffff16925063771602f79150604401600060405180830381600087803b15801561110c57600080fd5b505af1158015611120573d6000803e3d6000fd5b5050505061112e8282611270565b60005b6005548110156111f4576005818154811061114e5761114e6118b8565b6000918252602090912001546040517f0216b83800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690630216b838906111af9086908690600401611a46565b600060405180830381600087803b1580156111c957600080fd5b505af11580156111dd573d6000803e3d6000fd5b5050505080806111ec906119e7565b915050611131565b505050565b61047381611317565b6000818152600160205260408120611219916113c3565b6000546040517f0de3b7b50000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff90911690630de3b7b590602401610927565b60008281526001602052604090206112888282611aa5565b506000546040517fcfd3c57f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063cfd3c57f906112e19085908590600401611a46565b600060405180830381600087803b1580156112fb57600080fd5b505af115801561130f573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b5080546113cf906118e7565b6000825580601f106113df575050565b601f01602090049060005260206000209081019061047391905b8082111561140d57600081556001016113f9565b5090565b801515811461047357600080fd5b60006020828403121561143157600080fd5b813561036981611411565b6020808252825182820181905260009190848201906040850190845b8181101561147457835183529284019291840191600101611458565b50909695505050505050565b60006020828403121561149257600080fd5b5035919050565b6000602082840312156114ab57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461036957600080fd5b6000815180845260005b818110156114f5576020818501810151868301820152016114d9565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b838110156115d7577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa08887030185526115c58683516114cf565b9550938201939082019060010161158b565b50508584038187015286518085528782019482019350915060005b8281101561164557845160228110611633577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b845293810193928101926001016115f2565b5091979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156116c8576116c8611652565b604052919050565b600082601f8301126116e157600080fd5b813567ffffffffffffffff8111156116fb576116fb611652565b61172c60207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611681565b81815284602083860101111561174157600080fd5b816020850160208301376000918101602001919091529392505050565b6000806040838503121561177157600080fd5b82359150602083013567ffffffffffffffff81111561178f57600080fd5b61179b858286016116d0565b9150509250929050565b6000602082840312156117b757600080fd5b813567ffffffffffffffff8111156117ce57600080fd5b6117da848285016116d0565b949350505050565b60208152600061036960208301846114cf565b60006020828403121561180757600080fd5b815161036981611411565b6000602080838503121561182557600080fd5b825167ffffffffffffffff8082111561183d57600080fd5b818501915085601f83011261185157600080fd5b81518181111561186357611863611652565b8060051b9150611874848301611681565b818152918301840191848101908884111561188e57600080fd5b938501935b838510156118ac57845182529385019390850190611893565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600181811c908216806118fb57607f821691505b602082108103611934577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b6000808354611948816118e7565b600182811680156119605760018114611993576119c2565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00841687528215158302870194506119c2565b8760005260208060002060005b858110156119b95781548a8201529084019082016119a0565b50505082870194505b50929695505050505050565b6000602082840312156119e057600080fd5b5051919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611a3f577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b8281526040602082015260006117da60408301846114cf565b601f8211156111f457600081815260208120601f850160051c81016020861015611a865750805b601f850160051c820191505b8181101561130f57828155600101611a92565b815167ffffffffffffffff811115611abf57611abf611652565b611ad381611acd84546118e7565b84611a5f565b602080601f831160018114611b265760008415611af05750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b17855561130f565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b82811015611b7357888601518255948401946001909101908401611b54565b5085821015611baf57878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220de001efd1342c1990af8bcfba40c934a7d4b1750eabe8ef7ad548ec1a12b53d064736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610760806100a86000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638e7cb6e11161005b5780638e7cb6e114610100578063949d225d1461012a578063cccf7a8e1461013b578063f2fde38b1461015e57600080fd5b80631003e2d21461008d578063410d59cc146100a25780634cc82215146100c05780638da5cb5b146100d3575b600080fd5b6100a061009b3660046105f2565b610171565b005b6100aa610233565b6040516100b7919061060b565b60405180910390f35b6100a06100ce3660046105f2565b61028b565b6100db6103ef565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100b7565b61011361010e3660046105f2565b610434565b6040805192151583526020830191909152016100b7565b6000546040519081526020016100b7565b61014e6101493660046105f2565b610467565b60405190151581526020016100b7565b6100a061016c36600461064f565b6104ca565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146101e1576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6101ea81610467565b61023057600080548282526001602081905260408320829055810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018190555b50565b6060600080548060200260200160405190810160405280929190818152602001828054801561028157602002820191906000526020600020905b81548152602001906001019080831161026d575b5050505050905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146102fb576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61030481610467565b1561023057600080546103199060019061068c565b81548110610329576103296106cc565b9060005260206000200154600060016000848152602001908152602001600020548154811061035a5761035a6106cc565b60009182526020808320909101929092558281526001918290526040812054815490929190819084908110610391576103916106cc565b9060005260206000200154815260200190815260200160002081905550600160008281526020019081526020016000206000905560008054806103d6576103d66106fb565b6001900381819060005260206000200160009055905550565b600061042f7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60008061044083610467565b61044f57506000928392509050565b50506000908152600160208190526040909120549091565b60008054810361047957506000919050565b60008281526001602052604081205490036104b55781600080815481106104a2576104a26106cc565b9060005260206000200154149050919050565b50600090815260016020526040902054151590565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461053a576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610230817f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804608054604051610230928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60006020828403121561060457600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561064357835183529284019291840191600101610627565b50909695505050505050565b60006020828403121561066157600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461068557600080fd5b9392505050565b818103818111156106c6577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea2646970667358221220ae0610919c4e63fc77cbdaa4bee009623b1b99e555dcf39f329a613b9dedd60d64736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6107a7806100a86000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806385edea131161005b57806385edea13146100d35780638da5cb5b14610101578063a0265ff81461012e578063f2fde38b1461015157600080fd5b80636526db7a14610082578063771602f714610097578063796c5e94146100aa575b600080fd5b61009561009036600461061d565b610164565b005b6100956100a536600461061d565b610301565b6100bd6100b836600461063f565b6103b5565b6040516100ca9190610658565b60405180910390f35b6100f36100e136600461063f565b60009081526020819052604090205490565b6040519081526020016100ca565b610109610415565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100ca565b61014161013c36600461061d565b61045a565b60405190151581526020016100ca565b61009561015f36600461069c565b6104ed565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146101d4576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6101de828261045a565b156102fd57600082815260208190526040902080546101ff906001906106d9565b8154811061020f5761020f610713565b6000918252602080832090910154848352828252604080842060018452818520868652909352909220548154811061024957610249610713565b60009182526020808320909101929092558381526001825260408082208483528084528183205486845283855291832085845293819052835491939092918490811061029757610297610713565b600091825260208083209091015483528281019390935260409182018120939093558483526001825280832084845282528083208390558483529082905290208054806102e6576102e6610742565b600190038181906000526020600020016000905590555b5050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610371576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61037b828261045a565b6102fd5760009182526020828152604080842080546001808552838720868852855292862081905585845291820181558452922090910155565b6000818152602081815260409182902080548351818402810184019094528084526060939283018282801561040957602002820191906000526020600020905b8154815260200190600101908083116103f5575b50505050509050919050565b60006104557f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b6000828152602081905260408120548103610477575060006104e7565b600083815260016020908152604080832085845290915281205490036104c957600083815260208190526040812080548492906104b6576104b6610713565b90600052602060002001541490506104e7565b50600082815260016020908152604080832084845290915290205415155b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461055d576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61056681610569565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804608054604051610566928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000806040838503121561063057600080fd5b50508035926020909101359150565b60006020828403121561065157600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561069057835183529284019291840191600101610674565b50909695505050505050565b6000602082840312156106ae57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146106d257600080fd5b9392505050565b818103818111156104e7577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea2646970667358221220fed01f7ebef662afeac6e0ecfb467eab86b0dcba8d8fcf64b44b72098d4934fd64736f6c634300081300338a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460";

type ResearchComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ResearchComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ResearchComponent__factory extends ContractFactory {
  constructor(...args: ResearchComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ResearchComponent> {
    return super.deploy(world, overrides || {}) as Promise<ResearchComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): ResearchComponent {
    return super.attach(address) as ResearchComponent;
  }
  override connect(signer: Signer): ResearchComponent__factory {
    return super.connect(signer) as ResearchComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ResearchComponentInterface {
    return new utils.Interface(_abi) as ResearchComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ResearchComponent {
    return new Contract(address, _abi, signerOrProvider) as ResearchComponent;
  }
}
