/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  ChildrenComponent,
  ChildrenComponentInterface,
} from "../ChildrenComponent";

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
        name: "value",
        type: "uint256",
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
        internalType: "uint256[]",
        name: "value",
        type: "uint256[]",
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
  "0x60806040523480156200001157600080fd5b50604051620026a0380380620026a0833981016040819052620000349162000266565b807ff0cb43e036bae834910fad0a5f691ed43d8c3edb41f55275901bc5d576f8f4918181818162000065336200012b565b60028190556001600160a01b038216156200008557620000858262000194565b505060405162000095906200024a565b604051809103906000f080158015620000b2573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b0392909216919091179055604051620000e19062000258565b604051809103906000f080158015620000fe573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b039290921691909117905550620002989350505050565b6000805160206200268083398151915280546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60008051602062002680833981519152546001600160a01b03163314620001ce57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200022e57600080fd5b505af115801562000243573d6000803e3d6000fd5b5050505050565b6106c980620018ac83390190565b61070b8062001f7583390190565b6000602082840312156200027957600080fd5b81516001600160a01b03811681146200029157600080fd5b9392505050565b61160480620002a86000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80638da5cb5b116100ad578063b8bc073d11610071578063b8bc073d14610261578063bf4fe57e14610281578063cccf7a8e14610294578063f2fde38b146102a7578063fbdfa1ea146102ba57600080fd5b80638da5cb5b14610209578063946aadc6146102115780639d2c76b414610224578063af640d0f14610237578063b361be461461024e57600080fd5b80634fef6a38116100f45780634fef6a38146101975780636b122fe0146101aa57806375c0669c146101c0578063861eb905146101d35780638b282947146101f657600080fd5b80630ff4c9161461012657806330b67baa1461014f57806331b933b91461017a5780634cc8221514610182575b600080fd5b610139610134366004610f40565b6102cd565b6040516101469190610f59565b60405180910390f35b600054610162906001600160a01b031681565b6040516001600160a01b039091168152602001610146565b6101396102f1565b610195610190366004610f40565b610368565b005b6101956101a5366004610f9d565b61039a565b6101b2610416565b604051610146929190611029565b6101956101ce366004610f9d565b6104ea565b6101e66101e1366004610f9d565b610562565b6040519015158152602001610146565b610195610204366004611199565b6105c5565b6101626105f9565b61019561021f366004611204565b610603565b610195610232366004610f9d565b61062c565b61024060025481565b604051908152602001610146565b61013961025c3660046112a6565b6106e0565b61027461026f366004610f40565b610759565b60405161014691906112e3565b61019561028f366004610f9d565b6107fb565b6101e66102a2366004610f40565b610874565b6101956102b5366004610f9d565b6108e2565b6101396102c8366004610f40565b610924565b60606102d882610759565b8060200190518101906102eb91906112f6565b92915050565b60035460408051631043567360e21b815290516060926001600160a01b03169163410d59cc9160048083019260009291908290030181865afa15801561033b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261036391908101906112f6565b905090565b61037133610562565b61038e5760405163203769ed60e11b815260040160405180910390fd5b61039781610950565b50565b6103a2610b79565b6001600160a01b0316336001600160a01b0316146103d357604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19166001179055565b604080516001808252818301909252606091829190816020015b6060815260200190600190039081610430575050604080516001808252818301909252919350602080830190803683370190505090506040518060400160405280600581526020016476616c756560d81b8152508260008151811061049757610497611387565b6020026020010181905250601f816000815181106104b7576104b7611387565b602002602001019060218111156104d0576104d0611013565b908160218111156104e3576104e3611013565b9052509091565b6104f333610562565b6105105760405163203769ed60e11b815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff16806102eb57506105ab6105f9565b6001600160a01b0316826001600160a01b03161492915050565b6105ce33610562565b6105eb5760405163203769ed60e11b815260040160405180910390fd5b6105f58282610ba7565b5050565b6000610363610b79565b6105f582826040516020016106189190610f59565b6040516020818303038152906040526105c5565b610634610b79565b6001600160a01b0316336001600160a01b03161461066557604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f3034770906044015b600060405180830381600087803b1580156106c557600080fd5b505af11580156106d9573d6000803e3d6000fd5b5050505050565b6004805482516020840120604051631e5b17a560e21b8152928301526060916001600160a01b039091169063796c5e9490602401600060405180830381865afa158015610731573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102eb91908101906112f6565b60008181526001602052604090208054606091906107769061139d565b80601f01602080910402602001604051908101604052809291908181526020018280546107a29061139d565b80156107ef5780601f106107c4576101008083540402835291602001916107ef565b820191906000526020600020905b8154815290600101906020018083116107d257829003601f168201915b50505050509050919050565b610803610b79565b6001600160a01b0316336001600160a01b03161461083457604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19169055565b600354604051636667bd4760e11b8152600481018390526000916001600160a01b03169063cccf7a8e90602401602060405180830381865afa1580156108be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102eb91906113d7565b6108ea610b79565b6001600160a01b0316336001600160a01b03161461091b57604051632f7a8ee160e01b815260040160405180910390fd5b61039781610da6565b60606102eb8260405160200161093c91815260200190565b6040516020818303038152906040526106e0565b6004546000828152600160205260409081902090516001600160a01b03909216916385edea1391610980916113f9565b60405190819003812060e083901b6001600160e01b03191682526004820152602401602060405180830381865afa1580156109bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e3919061146f565b6000036109ed5750565b6004546000828152600160205260409081902090516001600160a01b0390921691636526db7a91610a1d916113f9565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101849052604401600060405180830381600087803b158015610a6057600080fd5b505af1158015610a74573d6000803e3d6000fd5b5050600354604051634cc8221560e01b8152600481018590526001600160a01b039091169250634cc822159150602401600060405180830381600087803b158015610abe57600080fd5b505af1158015610ad2573d6000803e3d6000fd5b50505050610adf81610daf565b60005b6005548110156105f55760058181548110610aff57610aff611387565b600091825260209091200154604051634cc8221560e01b8152600481018490526001600160a01b0390911690634cc8221590602401600060405180830381600087803b158015610b4e57600080fd5b505af1158015610b62573d6000803e3d6000fd5b505050508080610b7190611488565b915050610ae2565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b600354604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b158015610bed57600080fd5b505af1158015610c01573d6000803e3d6000fd5b50506004546000858152600160205260409081902090516001600160a01b039092169350636526db7a9250610c35916113f9565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101859052604401600060405180830381600087803b158015610c7857600080fd5b505af1158015610c8c573d6000803e3d6000fd5b5050600480548451602086012060405163771602f760e01b815292830152602482018690526001600160a01b0316925063771602f79150604401600060405180830381600087803b158015610ce057600080fd5b505af1158015610cf4573d6000803e3d6000fd5b50505050610d028282610df7565b60005b600554811015610da15760058181548110610d2257610d22611387565b6000918252602090912001546040516242d70760e31b81526001600160a01b0390911690630216b83890610d5c90869086906004016114af565b600060405180830381600087803b158015610d7657600080fd5b505af1158015610d8a573d6000803e3d6000fd5b505050508080610d9990611488565b915050610d05565b505050565b61039781610e78565b6000818152600160205260408120610dc691610ef2565b600054604051630de3b7b560e01b8152600481018390526001600160a01b0390911690630de3b7b5906024016106ab565b6000828152600160205260409020610e0f828261150e565b5060005460405163cfd3c57f60e01b81526001600160a01b039091169063cfd3c57f90610e4290859085906004016114af565b600060405180830381600087803b158015610e5c57600080fd5b505af1158015610e70573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b508054610efe9061139d565b6000825580601f10610f0e575050565b601f01602090049060005260206000209081019061039791905b80821115610f3c5760008155600101610f28565b5090565b600060208284031215610f5257600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610f9157835183529284019291840191600101610f75565b50909695505050505050565b600060208284031215610faf57600080fd5b81356001600160a01b0381168114610fc657600080fd5b9392505050565b6000815180845260005b81811015610ff357602081850181015186830182015201610fd7565b506000602082860101526020601f19601f83011685010191505092915050565b634e487b7160e01b600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b8381101561108057605f1988870301855261106e868351610fcd565b95509382019390820190600101611052565b50508584038187015286518085528782019482019350915060005b828110156110d5578451602281106110c357634e487b7160e01b600052602160045260246000fd5b8452938101939281019260010161109b565b5091979650505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611121576111216110e2565b604052919050565b600082601f83011261113a57600080fd5b813567ffffffffffffffff811115611154576111546110e2565b611167601f8201601f19166020016110f8565b81815284602083860101111561117c57600080fd5b816020850160208301376000918101602001919091529392505050565b600080604083850312156111ac57600080fd5b82359150602083013567ffffffffffffffff8111156111ca57600080fd5b6111d685828601611129565b9150509250929050565b600067ffffffffffffffff8211156111fa576111fa6110e2565b5060051b60200190565b6000806040838503121561121757600080fd5b8235915060208084013567ffffffffffffffff81111561123657600080fd5b8401601f8101861361124757600080fd5b803561125a611255826111e0565b6110f8565b81815260059190911b8201830190838101908883111561127957600080fd5b928401925b828410156112975783358252928401929084019061127e565b80955050505050509250929050565b6000602082840312156112b857600080fd5b813567ffffffffffffffff8111156112cf57600080fd5b6112db84828501611129565b949350505050565b602081526000610fc66020830184610fcd565b6000602080838503121561130957600080fd5b825167ffffffffffffffff81111561132057600080fd5b8301601f8101851361133157600080fd5b805161133f611255826111e0565b81815260059190911b8201830190838101908783111561135e57600080fd5b928401925b8284101561137c57835182529284019290840190611363565b979650505050505050565b634e487b7160e01b600052603260045260246000fd5b600181811c908216806113b157607f821691505b6020821081036113d157634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156113e957600080fd5b81518015158114610fc657600080fd5b60008083546114078161139d565b6001828116801561141f576001811461143457611463565b60ff1984168752821515830287019450611463565b8760005260208060002060005b8581101561145a5781548a820152908401908201611441565b50505082870194505b50929695505050505050565b60006020828403121561148157600080fd5b5051919050565b6000600182016114a857634e487b7160e01b600052601160045260246000fd5b5060010190565b8281526040602082015260006112db6040830184610fcd565b601f821115610da157600081815260208120601f850160051c810160208610156114ef5750805b601f850160051c820191505b81811015610e70578281556001016114fb565b815167ffffffffffffffff811115611528576115286110e2565b61153c81611536845461139d565b846114c8565b602080601f83116001811461157157600084156115595750858301515b600019600386901b1c1916600185901b178555610e70565b600085815260208120601f198616915b828110156115a057888601518255948401946001909101908401611581565b50858210156115be5787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220516a61fd993614a3f877c094cc152b1421675c907186cc06f9232e3ba5e8dc7664736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610621806100a86000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638e7cb6e11161005b5780638e7cb6e1146100f3578063949d225d1461011d578063cccf7a8e1461012e578063f2fde38b1461015157600080fd5b80631003e2d21461008d578063410d59cc146100a25780634cc82215146100c05780638da5cb5b146100d3575b600080fd5b6100a061009b36600461050b565b610164565b005b6100aa6101ef565b6040516100b79190610524565b60405180910390f35b6100a06100ce36600461050b565b610247565b6100db610374565b6040516001600160a01b0390911681526020016100b7565b61010661010136600461050b565b610383565b6040805192151583526020830191909152016100b7565b6000546040519081526020016100b7565b61014161013c36600461050b565b6103b6565b60405190151581526020016100b7565b6100a061015f366004610568565b610419565b61016c61045b565b6001600160a01b0316336001600160a01b03161461019d57604051632f7a8ee160e01b815260040160405180910390fd5b6101a6816103b6565b6101ec57600080548282526001602081905260408320829055810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018190555b50565b6060600080548060200260200160405190810160405280929190818152602001828054801561023d57602002820191906000526020600020905b815481526020019060010190808311610229575b5050505050905090565b61024f61045b565b6001600160a01b0316336001600160a01b03161461028057604051632f7a8ee160e01b815260040160405180910390fd5b610289816103b6565b156101ec576000805461029e90600190610598565b815481106102ae576102ae6105bf565b906000526020600020015460006001600084815260200190815260200160002054815481106102df576102df6105bf565b60009182526020808320909101929092558281526001918290526040812054815490929190819084908110610316576103166105bf565b90600052602060002001548152602001908152602001600020819055506001600082815260200190815260200160002060009055600080548061035b5761035b6105d5565b6001900381819060005260206000200160009055905550565b600061037e61045b565b905090565b60008061038f836103b6565b61039e57506000928392509050565b50506000908152600160208190526040909120549091565b6000805481036103c857506000919050565b60008281526001602052604081205490036104045781600080815481106103f1576103f16105bf565b9060005260206000200154149050919050565b50600090815260016020526040902054151590565b61042161045b565b6001600160a01b0316336001600160a01b03161461045257604051632f7a8ee160e01b815260040160405180910390fd5b6101ec81610489565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516101ec92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60006020828403121561051d57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561055c57835183529284019291840191600101610540565b50909695505050505050565b60006020828403121561057a57600080fd5b81356001600160a01b038116811461059157600080fd5b9392505050565b818103818111156105b957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea2646970667358221220e26b625121584afbfcdd5a7c76a89bd07c2a082781c4635c0fc11c4dffdf9aed64736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610663806100a86000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806385edea131161005b57806385edea13146100d35780638da5cb5b14610101578063a0265ff814610121578063f2fde38b1461014457600080fd5b80636526db7a14610082578063771602f714610097578063796c5e94146100aa575b600080fd5b610095610090366004610531565b610157565b005b6100956100a5366004610531565b6102bd565b6100bd6100b8366004610553565b61033a565b6040516100ca919061056c565b60405180910390f35b6100f36100e1366004610553565b60009081526020819052604090205490565b6040519081526020016100ca565b61010961039a565b6040516001600160a01b0390911681526020016100ca565b61013461012f366004610531565b6103a9565b60405190151581526020016100ca565b6100956101523660046105b0565b61043c565b61015f610481565b6001600160a01b0316336001600160a01b03161461019057604051632f7a8ee160e01b815260040160405180910390fd5b61019a82826103a9565b156102b957600082815260208190526040902080546101bb906001906105e0565b815481106101cb576101cb610601565b6000918252602080832090910154848352828252604080842060018452818520868652909352909220548154811061020557610205610601565b60009182526020808320909101929092558381526001825260408082208483528084528183205486845283855291832085845293819052835491939092918490811061025357610253610601565b600091825260208083209091015483528281019390935260409182018120939093558483526001825280832084845282528083208390558483529082905290208054806102a2576102a2610617565b600190038181906000526020600020016000905590555b5050565b6102c5610481565b6001600160a01b0316336001600160a01b0316146102f657604051632f7a8ee160e01b815260040160405180910390fd5b61030082826103a9565b6102b95760009182526020828152604080842080546001808552838720868852855292862081905585845291820181558452922090910155565b6000818152602081815260409182902080548351818402810184019094528084526060939283018282801561038e57602002820191906000526020600020905b81548152602001906001019080831161037a575b50505050509050919050565b60006103a4610481565b905090565b60008281526020819052604081205481036103c657506000610436565b60008381526001602090815260408083208584529091528120549003610418576000838152602081905260408120805484929061040557610405610601565b9060005260206000200154149050610436565b50600082815260016020908152604080832084845290915290205415155b92915050565b610444610481565b6001600160a01b0316336001600160a01b03161461047557604051632f7a8ee160e01b815260040160405180910390fd5b61047e816104af565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161047e92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6000806040838503121561054457600080fd5b50508035926020909101359150565b60006020828403121561056557600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156105a457835183529284019291840191600101610588565b50909695505050505050565b6000602082840312156105c257600080fd5b81356001600160a01b03811681146105d957600080fd5b9392505050565b8181038181111561043657634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea264697066735822122074d2dbc3f020a29d6081fb9fcf69e8e3c85026be8658abafc11ba431c108e33464736f6c634300081300338a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460";

type ChildrenComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ChildrenComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ChildrenComponent__factory extends ContractFactory {
  constructor(...args: ChildrenComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ChildrenComponent> {
    return super.deploy(world, overrides || {}) as Promise<ChildrenComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): ChildrenComponent {
    return super.attach(address) as ChildrenComponent;
  }
  override connect(signer: Signer): ChildrenComponent__factory {
    return super.connect(signer) as ChildrenComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ChildrenComponentInterface {
    return new utils.Interface(_abi) as ChildrenComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ChildrenComponent {
    return new Contract(address, _abi, signerOrProvider) as ChildrenComponent;
  }
}
