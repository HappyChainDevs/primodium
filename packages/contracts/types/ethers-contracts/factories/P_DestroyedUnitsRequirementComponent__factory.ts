/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  P_DestroyedUnitsRequirementComponent,
  P_DestroyedUnitsRequirementComponentInterface,
} from "../P_DestroyedUnitsRequirementComponent";

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
        components: [
          {
            internalType: "uint256[]",
            name: "resources",
            type: "uint256[]",
          },
          {
            internalType: "uint32[]",
            name: "values",
            type: "uint32[]",
          },
        ],
        internalType: "struct ResourceValues",
        name: "mines",
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
        components: [
          {
            internalType: "uint256[]",
            name: "resources",
            type: "uint256[]",
          },
          {
            internalType: "uint32[]",
            name: "values",
            type: "uint32[]",
          },
        ],
        internalType: "struct ResourceValues",
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
        components: [
          {
            internalType: "uint256[]",
            name: "resources",
            type: "uint256[]",
          },
          {
            internalType: "uint32[]",
            name: "values",
            type: "uint32[]",
          },
        ],
        internalType: "struct ResourceValues",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002a6538038062002a65833981016040819052620000349162000262565b807ffb5436e0cd423ce3090c159000986662e2ef20b50d03759f53d23583c5d9aa4d8181620000633362000127565b60028190556001600160a01b038216156200008357620000838262000190565b5050604051620000939062000246565b604051809103906000f080158015620000b0573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b0392909216919091179055604051620000df9062000254565b604051809103906000f080158015620000fc573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b03929092169190911790555062000294915050565b60008051602062002a4583398151915280546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60008051602062002a45833981519152546001600160a01b03163314620001ca57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200022a57600080fd5b505af11580156200023f573d6000803e3d6000fd5b5050505050565b6106c98062001c7183390190565b61070b806200233a83390190565b6000602082840312156200027557600080fd5b81516001600160a01b03811681146200028d57600080fd5b9392505050565b6119cd80620002a46000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c8063861eb905116100ad578063b361be4611610071578063b361be461461026e578063b8bc073d14610281578063bf4fe57e146102a1578063cccf7a8e146102b4578063f2fde38b146102c757600080fd5b8063861eb905146102065780638b282947146102295780638da5cb5b1461023c5780639d2c76b414610244578063af640d0f1461025757600080fd5b806331b933b9116100f457806331b933b9146101af5780634cc82215146101b75780634fef6a38146101ca5780636b122fe0146101dd57806375c0669c146101f357600080fd5b806304638dbc1461012657806308a43e021461014f5780630ff4c9161461016457806330b67baa14610184575b600080fd5b610139610134366004611031565b6102da565b604051610146919061106e565b60405180910390f35b61016261015d3660046110b2565b61030a565b005b6101776101723660046110f9565b610350565b6040516101469190611112565b600054610197906001600160a01b031681565b6040516001600160a01b039091168152602001610146565b61013961039d565b6101626101c53660046110f9565b610414565b6101626101d83660046111a1565b610446565b6101e56104c2565b60405161014692919061122d565b6101626102013660046111a1565b61061c565b6102196102143660046111a1565b610694565b6040519015158152602001610146565b61016261023736600461139d565b6106f7565b610197610727565b6101626102523660046111a1565b610731565b61026060025481565b604051908152602001610146565b61013961027c3660046113da565b6107e5565b61029461028f3660046110f9565b61085e565b604051610146919061140f565b6101626102af3660046111a1565b610900565b6102196102c23660046110f9565b610979565b6101626102d53660046111a1565b6109e7565b6060610304826040516020016102f091906114fc565b6040516020818303038152906040526107e5565b92915050565b61034c826103188380611552565b6103256020860186611552565b604051602001610338949392919061159c565b6040516020818303038152906040526106f7565b5050565b60408051808201909152606080825260208201526000806103708461085e565b806020019051810190610383919061165d565b604080518082019091529182526020820152949350505050565b60035460408051631043567360e21b815290516060926001600160a01b03169163410d59cc9160048083019260009291908290030181865afa1580156103e7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261040f9190810190611721565b905090565b61041d33610694565b61043a5760405163203769ed60e11b815260040160405180910390fd5b61044381610a29565b50565b61044e610c52565b6001600160a01b0316336001600160a01b03161461047f57604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19166001179055565b6040805160028082526060828101909352829190816020015b60608152602001906001900390816104db5750506040805160028082526060820183529294509190602083019080368337019050509050604051806040016040528060098152602001687265736f757263657360b81b8152508260008151811061054757610547611756565b6020026020010181905250601f8160008151811061056757610567611756565b6020026020010190602181111561058057610580611217565b9081602181111561059357610593611217565b815250506040518060400160405280600681526020016576616c75657360d01b815250826001815181106105c9576105c9611756565b6020026020010181905250601c816001815181106105e9576105e9611756565b6020026020010190602181111561060257610602611217565b9081602181111561061557610615611217565b9052509091565b61062533610694565b6106425760405163203769ed60e11b815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff168061030457506106dd610727565b6001600160a01b0316826001600160a01b03161492915050565b61070033610694565b61071d5760405163203769ed60e11b815260040160405180910390fd5b61034c8282610c80565b600061040f610c52565b610739610c52565b6001600160a01b0316336001600160a01b03161461076a57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f3034770906044015b600060405180830381600087803b1580156107ca57600080fd5b505af11580156107de573d6000803e3d6000fd5b5050505050565b6004805482516020840120604051631e5b17a560e21b8152928301526060916001600160a01b039091169063796c5e9490602401600060405180830381865afa158015610836573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103049190810190611721565b600081815260016020526040902080546060919061087b9061176c565b80601f01602080910402602001604051908101604052809291908181526020018280546108a79061176c565b80156108f45780601f106108c9576101008083540402835291602001916108f4565b820191906000526020600020905b8154815290600101906020018083116108d757829003601f168201915b50505050509050919050565b610908610c52565b6001600160a01b0316336001600160a01b03161461093957604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19169055565b600354604051636667bd4760e11b8152600481018390526000916001600160a01b03169063cccf7a8e90602401602060405180830381865afa1580156109c3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061030491906117a0565b6109ef610c52565b6001600160a01b0316336001600160a01b031614610a2057604051632f7a8ee160e01b815260040160405180910390fd5b61044381610e7f565b6004546000828152600160205260409081902090516001600160a01b03909216916385edea1391610a59916117c2565b60405190819003812060e083901b6001600160e01b03191682526004820152602401602060405180830381865afa158015610a98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610abc9190611838565b600003610ac65750565b6004546000828152600160205260409081902090516001600160a01b0390921691636526db7a91610af6916117c2565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101849052604401600060405180830381600087803b158015610b3957600080fd5b505af1158015610b4d573d6000803e3d6000fd5b5050600354604051634cc8221560e01b8152600481018590526001600160a01b039091169250634cc822159150602401600060405180830381600087803b158015610b9757600080fd5b505af1158015610bab573d6000803e3d6000fd5b50505050610bb881610e88565b60005b60055481101561034c5760058181548110610bd857610bd8611756565b600091825260209091200154604051634cc8221560e01b8152600481018490526001600160a01b0390911690634cc8221590602401600060405180830381600087803b158015610c2757600080fd5b505af1158015610c3b573d6000803e3d6000fd5b505050508080610c4a90611851565b915050610bbb565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b600354604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b158015610cc657600080fd5b505af1158015610cda573d6000803e3d6000fd5b50506004546000858152600160205260409081902090516001600160a01b039092169350636526db7a9250610d0e916117c2565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101859052604401600060405180830381600087803b158015610d5157600080fd5b505af1158015610d65573d6000803e3d6000fd5b5050600480548451602086012060405163771602f760e01b815292830152602482018690526001600160a01b0316925063771602f79150604401600060405180830381600087803b158015610db957600080fd5b505af1158015610dcd573d6000803e3d6000fd5b50505050610ddb8282610ed0565b60005b600554811015610e7a5760058181548110610dfb57610dfb611756565b6000918252602090912001546040516242d70760e31b81526001600160a01b0390911690630216b83890610e359086908690600401611878565b600060405180830381600087803b158015610e4f57600080fd5b505af1158015610e63573d6000803e3d6000fd5b505050508080610e7290611851565b915050610dde565b505050565b61044381610f51565b6000818152600160205260408120610e9f91610fcb565b600054604051630de3b7b560e01b8152600481018390526001600160a01b0390911690630de3b7b5906024016107b0565b6000828152600160205260409020610ee882826118d7565b5060005460405163cfd3c57f60e01b81526001600160a01b039091169063cfd3c57f90610f1b9085908590600401611878565b600060405180830381600087803b158015610f3557600080fd5b505af1158015610f49573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b508054610fd79061176c565b6000825580601f10610fe7575050565b601f01602090049060005260206000209081019061044391905b808211156110155760008155600101611001565b5090565b60006040828403121561102b57600080fd5b50919050565b60006020828403121561104357600080fd5b813567ffffffffffffffff81111561105a57600080fd5b61106684828501611019565b949350505050565b6020808252825182820181905260009190848201906040850190845b818110156110a65783518352928401929184019160010161108a565b50909695505050505050565b600080604083850312156110c557600080fd5b82359150602083013567ffffffffffffffff8111156110e357600080fd5b6110ef85828601611019565b9150509250929050565b60006020828403121561110b57600080fd5b5035919050565b6020808252825160408383015280516060840181905260009291820190839060808601905b808310156111575783518252928401926001929092019190840190611137565b5086840151868203601f190160408801528051808352908501935090840191506000905b808210156110a657835163ffffffff16835292840192918401916001919091019061117b565b6000602082840312156111b357600080fd5b81356001600160a01b03811681146111ca57600080fd5b9392505050565b6000815180845260005b818110156111f7576020818501810151868301820152016111db565b506000602082860101526020601f19601f83011685010191505092915050565b634e487b7160e01b600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b8381101561128457605f198887030185526112728683516111d1565b95509382019390820190600101611256565b50508584038187015286518085528782019482019350915060005b828110156112d9578451602281106112c757634e487b7160e01b600052602160045260246000fd5b8452938101939281019260010161129f565b5091979650505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611325576113256112e6565b604052919050565b600082601f83011261133e57600080fd5b813567ffffffffffffffff811115611358576113586112e6565b61136b601f8201601f19166020016112fc565b81815284602083860101111561138057600080fd5b816020850160208301376000918101602001919091529392505050565b600080604083850312156113b057600080fd5b82359150602083013567ffffffffffffffff8111156113ce57600080fd5b6110ef8582860161132d565b6000602082840312156113ec57600080fd5b813567ffffffffffffffff81111561140357600080fd5b6110668482850161132d565b6020815260006111ca60208301846111d1565b6000808335601e1984360301811261143957600080fd5b830160208101925035905067ffffffffffffffff81111561145957600080fd5b8060051b360382131561146b57600080fd5b9250929050565b81835260006001600160fb1b0383111561148b57600080fd5b8260051b80836020870137939093016020019392505050565b63ffffffff8116811461044357600080fd5b8183526000602080850194508260005b858110156114f15781356114d9816114a4565b63ffffffff16875295820195908201906001016114c6565b509495945050505050565b60208152600061150c8384611422565b60406020850152611521606085018284611472565b9150506115316020850185611422565b848303601f190160408601526115488382846114b6565b9695505050505050565b6000808335601e1984360301811261156957600080fd5b83018035915067ffffffffffffffff82111561158457600080fd5b6020019150600581901b360382131561146b57600080fd5b6040815260006115b0604083018688611472565b82810360208401526115c38185876114b6565b979650505050505050565b600067ffffffffffffffff8211156115e8576115e86112e6565b5060051b60200190565b600082601f83011261160357600080fd5b81516020611618611613836115ce565b6112fc565b82815260059290921b8401810191818101908684111561163757600080fd5b8286015b84811015611652578051835291830191830161163b565b509695505050505050565b6000806040838503121561167057600080fd5b825167ffffffffffffffff8082111561168857600080fd5b611694868387016115f2565b93506020915081850151818111156116ab57600080fd5b85019050601f810186136116be57600080fd5b80516116cc611613826115ce565b81815260059190911b820183019083810190888311156116eb57600080fd5b928401925b82841015611712578351611703816114a4565b825292840192908401906116f0565b80955050505050509250929050565b60006020828403121561173357600080fd5b815167ffffffffffffffff81111561174a57600080fd5b611066848285016115f2565b634e487b7160e01b600052603260045260246000fd5b600181811c9082168061178057607f821691505b60208210810361102b57634e487b7160e01b600052602260045260246000fd5b6000602082840312156117b257600080fd5b815180151581146111ca57600080fd5b60008083546117d08161176c565b600182811680156117e857600181146117fd5761182c565b60ff198416875282151583028701945061182c565b8760005260208060002060005b858110156118235781548a82015290840190820161180a565b50505082870194505b50929695505050505050565b60006020828403121561184a57600080fd5b5051919050565b60006001820161187157634e487b7160e01b600052601160045260246000fd5b5060010190565b82815260406020820152600061106660408301846111d1565b601f821115610e7a57600081815260208120601f850160051c810160208610156118b85750805b601f850160051c820191505b81811015610f49578281556001016118c4565b815167ffffffffffffffff8111156118f1576118f16112e6565b611905816118ff845461176c565b84611891565b602080601f83116001811461193a57600084156119225750858301515b600019600386901b1c1916600185901b178555610f49565b600085815260208120601f198616915b828110156119695788860151825594840194600190910190840161194a565b50858210156119875787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea264697066735822122072ca10d5bfdf017666fb8d712ee218edd09ac88b8c3f449a5cf4bf1264d68db664736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610621806100a86000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638e7cb6e11161005b5780638e7cb6e1146100f3578063949d225d1461011d578063cccf7a8e1461012e578063f2fde38b1461015157600080fd5b80631003e2d21461008d578063410d59cc146100a25780634cc82215146100c05780638da5cb5b146100d3575b600080fd5b6100a061009b36600461050b565b610164565b005b6100aa6101ef565b6040516100b79190610524565b60405180910390f35b6100a06100ce36600461050b565b610247565b6100db610374565b6040516001600160a01b0390911681526020016100b7565b61010661010136600461050b565b610383565b6040805192151583526020830191909152016100b7565b6000546040519081526020016100b7565b61014161013c36600461050b565b6103b6565b60405190151581526020016100b7565b6100a061015f366004610568565b610419565b61016c61045b565b6001600160a01b0316336001600160a01b03161461019d57604051632f7a8ee160e01b815260040160405180910390fd5b6101a6816103b6565b6101ec57600080548282526001602081905260408320829055810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018190555b50565b6060600080548060200260200160405190810160405280929190818152602001828054801561023d57602002820191906000526020600020905b815481526020019060010190808311610229575b5050505050905090565b61024f61045b565b6001600160a01b0316336001600160a01b03161461028057604051632f7a8ee160e01b815260040160405180910390fd5b610289816103b6565b156101ec576000805461029e90600190610598565b815481106102ae576102ae6105bf565b906000526020600020015460006001600084815260200190815260200160002054815481106102df576102df6105bf565b60009182526020808320909101929092558281526001918290526040812054815490929190819084908110610316576103166105bf565b90600052602060002001548152602001908152602001600020819055506001600082815260200190815260200160002060009055600080548061035b5761035b6105d5565b6001900381819060005260206000200160009055905550565b600061037e61045b565b905090565b60008061038f836103b6565b61039e57506000928392509050565b50506000908152600160208190526040909120549091565b6000805481036103c857506000919050565b60008281526001602052604081205490036104045781600080815481106103f1576103f16105bf565b9060005260206000200154149050919050565b50600090815260016020526040902054151590565b61042161045b565b6001600160a01b0316336001600160a01b03161461045257604051632f7a8ee160e01b815260040160405180910390fd5b6101ec81610489565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516101ec92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60006020828403121561051d57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561055c57835183529284019291840191600101610540565b50909695505050505050565b60006020828403121561057a57600080fd5b81356001600160a01b038116811461059157600080fd5b9392505050565b818103818111156105b957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea2646970667358221220e26b625121584afbfcdd5a7c76a89bd07c2a082781c4635c0fc11c4dffdf9aed64736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610663806100a86000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806385edea131161005b57806385edea13146100d35780638da5cb5b14610101578063a0265ff814610121578063f2fde38b1461014457600080fd5b80636526db7a14610082578063771602f714610097578063796c5e94146100aa575b600080fd5b610095610090366004610531565b610157565b005b6100956100a5366004610531565b6102bd565b6100bd6100b8366004610553565b61033a565b6040516100ca919061056c565b60405180910390f35b6100f36100e1366004610553565b60009081526020819052604090205490565b6040519081526020016100ca565b61010961039a565b6040516001600160a01b0390911681526020016100ca565b61013461012f366004610531565b6103a9565b60405190151581526020016100ca565b6100956101523660046105b0565b61043c565b61015f610481565b6001600160a01b0316336001600160a01b03161461019057604051632f7a8ee160e01b815260040160405180910390fd5b61019a82826103a9565b156102b957600082815260208190526040902080546101bb906001906105e0565b815481106101cb576101cb610601565b6000918252602080832090910154848352828252604080842060018452818520868652909352909220548154811061020557610205610601565b60009182526020808320909101929092558381526001825260408082208483528084528183205486845283855291832085845293819052835491939092918490811061025357610253610601565b600091825260208083209091015483528281019390935260409182018120939093558483526001825280832084845282528083208390558483529082905290208054806102a2576102a2610617565b600190038181906000526020600020016000905590555b5050565b6102c5610481565b6001600160a01b0316336001600160a01b0316146102f657604051632f7a8ee160e01b815260040160405180910390fd5b61030082826103a9565b6102b95760009182526020828152604080842080546001808552838720868852855292862081905585845291820181558452922090910155565b6000818152602081815260409182902080548351818402810184019094528084526060939283018282801561038e57602002820191906000526020600020905b81548152602001906001019080831161037a575b50505050509050919050565b60006103a4610481565b905090565b60008281526020819052604081205481036103c657506000610436565b60008381526001602090815260408083208584529091528120549003610418576000838152602081905260408120805484929061040557610405610601565b9060005260206000200154149050610436565b50600082815260016020908152604080832084845290915290205415155b92915050565b610444610481565b6001600160a01b0316336001600160a01b03161461047557604051632f7a8ee160e01b815260040160405180910390fd5b61047e816104af565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161047e92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6000806040838503121561054457600080fd5b50508035926020909101359150565b60006020828403121561056557600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156105a457835183529284019291840191600101610588565b50909695505050505050565b6000602082840312156105c257600080fd5b81356001600160a01b03811681146105d957600080fd5b9392505050565b8181038181111561043657634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea264697066735822122074d2dbc3f020a29d6081fb9fcf69e8e3c85026be8658abafc11ba431c108e33464736f6c634300081300338a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460";

type P_DestroyedUnitsRequirementComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: P_DestroyedUnitsRequirementComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class P_DestroyedUnitsRequirementComponent__factory extends ContractFactory {
  constructor(...args: P_DestroyedUnitsRequirementComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<P_DestroyedUnitsRequirementComponent> {
    return super.deploy(
      world,
      overrides || {}
    ) as Promise<P_DestroyedUnitsRequirementComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): P_DestroyedUnitsRequirementComponent {
    return super.attach(address) as P_DestroyedUnitsRequirementComponent;
  }
  override connect(
    signer: Signer
  ): P_DestroyedUnitsRequirementComponent__factory {
    return super.connect(
      signer
    ) as P_DestroyedUnitsRequirementComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): P_DestroyedUnitsRequirementComponentInterface {
    return new utils.Interface(
      _abi
    ) as P_DestroyedUnitsRequirementComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): P_DestroyedUnitsRequirementComponent {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as P_DestroyedUnitsRequirementComponent;
  }
}
