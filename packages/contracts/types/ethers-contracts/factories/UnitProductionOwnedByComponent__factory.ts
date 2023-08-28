/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  UnitProductionOwnedByComponent,
  UnitProductionOwnedByComponentInterface,
} from "../UnitProductionOwnedByComponent";

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
        internalType: "uint256",
        name: "",
        type: "uint256",
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
        internalType: "uint256",
        name: "value",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200260b3803806200260b833981016040819052620000349162000266565b807f9de349a5ebb25e4948f087042ac901652bc7ca239eacb04610389265e211e5278181818162000065336200012b565b60028190556001600160a01b038216156200008557620000858262000194565b505060405162000095906200024a565b604051809103906000f080158015620000b2573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b0392909216919091179055604051620000e19062000258565b604051809103906000f080158015620000fe573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b039290921691909117905550620002989350505050565b600080516020620025eb83398151915280546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b600080516020620025eb833981519152546001600160a01b03163314620001ce57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200022e57600080fd5b505af115801562000243573d6000803e3d6000fd5b5050505050565b6106c9806200181783390190565b61070b8062001ee083390190565b6000602082840312156200027957600080fd5b81516001600160a01b03811681146200029157600080fd5b9392505050565b61156f80620002a86000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80638b282947116100ad578063b8bc073d11610071578063b8bc073d1461025d578063bf4fe57e1461027d578063cccf7a8e14610290578063f2fde38b146102a3578063fbdfa1ea146102b657600080fd5b80638b282947146102135780638da5cb5b146102265780639d2c76b41461022e578063af640d0f14610241578063b361be461461024a57600080fd5b80634cc82215116100f45780634cc82215146101a15780634fef6a38146101b45780636b122fe0146101c757806375c0669c146101dd578063861eb905146101f057600080fd5b80630ff4c916146101265780631ab06ee51461014c57806330b67baa1461016157806331b933b91461018c575b600080fd5b610139610134366004610f41565b6102c9565b6040519081526020015b60405180910390f35b61015f61015a366004610f5a565b6102ef565b005b600054610174906001600160a01b031681565b6040516001600160a01b039091168152602001610143565b61019461031e565b6040516101439190610f7c565b61015f6101af366004610f41565b610395565b61015f6101c2366004610fc0565b6103c7565b6101cf610443565b604051610143929190611045565b61015f6101eb366004610fc0565b610517565b6102036101fe366004610fc0565b61058f565b6040519015158152602001610143565b61015f6102213660046111b5565b6105f3565b610174610623565b61015f61023c366004610fc0565b61062d565b61013960025481565b6101946102583660046111fc565b6106e1565b61027061026b366004610f41565b61075a565b6040516101439190611239565b61015f61028b366004610fc0565b6107fc565b61020361029e366004610f41565b610875565b61015f6102b1366004610fc0565b6108e3565b6101946102c4366004610f41565b610925565b6000806102d58361075a565b8060200190518101906102e8919061124c565b9392505050565b61031a828260405160200161030691815260200190565b6040516020818303038152906040526105f3565b5050565b60035460408051631043567360e21b815290516060926001600160a01b03169163410d59cc9160048083019260009291908290030181865afa158015610368573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103909190810190611265565b905090565b61039e3361058f565b6103bb5760405163203769ed60e11b815260040160405180910390fd5b6103c481610951565b50565b6103cf610b7a565b6001600160a01b0316336001600160a01b03161461040057604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19166001179055565b604080516001808252818301909252606091829190816020015b606081526020019060019003908161045d575050604080516001808252818301909252919350602080830190803683370190505090506040518060400160405280600581526020016476616c756560d81b815250826000815181106104c4576104c461130b565b6020026020010181905250600d816000815181106104e4576104e461130b565b602002602001019060218111156104fd576104fd61102f565b908160218111156105105761051061102f565b9052509091565b6105203361058f565b61053d5760405163203769ed60e11b815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff16806105ed57506105d8610623565b6001600160a01b0316826001600160a01b0316145b92915050565b6105fc3361058f565b6106195760405163203769ed60e11b815260040160405180910390fd5b61031a8282610ba8565b6000610390610b7a565b610635610b7a565b6001600160a01b0316336001600160a01b03161461066657604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f3034770906044015b600060405180830381600087803b1580156106c657600080fd5b505af11580156106da573d6000803e3d6000fd5b5050505050565b6004805482516020840120604051631e5b17a560e21b8152928301526060916001600160a01b039091169063796c5e9490602401600060405180830381865afa158015610732573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105ed9190810190611265565b600081815260016020526040902080546060919061077790611321565b80601f01602080910402602001604051908101604052809291908181526020018280546107a390611321565b80156107f05780601f106107c5576101008083540402835291602001916107f0565b820191906000526020600020905b8154815290600101906020018083116107d357829003601f168201915b50505050509050919050565b610804610b7a565b6001600160a01b0316336001600160a01b03161461083557604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19169055565b600354604051636667bd4760e11b8152600481018390526000916001600160a01b03169063cccf7a8e90602401602060405180830381865afa1580156108bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ed919061135b565b6108eb610b7a565b6001600160a01b0316336001600160a01b03161461091c57604051632f7a8ee160e01b815260040160405180910390fd5b6103c481610da7565b60606105ed8260405160200161093d91815260200190565b6040516020818303038152906040526106e1565b6004546000828152600160205260409081902090516001600160a01b03909216916385edea13916109819161137d565b60405190819003812060e083901b6001600160e01b03191682526004820152602401602060405180830381865afa1580156109c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e4919061124c565b6000036109ee5750565b6004546000828152600160205260409081902090516001600160a01b0390921691636526db7a91610a1e9161137d565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101849052604401600060405180830381600087803b158015610a6157600080fd5b505af1158015610a75573d6000803e3d6000fd5b5050600354604051634cc8221560e01b8152600481018590526001600160a01b039091169250634cc822159150602401600060405180830381600087803b158015610abf57600080fd5b505af1158015610ad3573d6000803e3d6000fd5b50505050610ae081610db0565b60005b60055481101561031a5760058181548110610b0057610b0061130b565b600091825260209091200154604051634cc8221560e01b8152600481018490526001600160a01b0390911690634cc8221590602401600060405180830381600087803b158015610b4f57600080fd5b505af1158015610b63573d6000803e3d6000fd5b505050508080610b72906113f3565b915050610ae3565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b600354604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b158015610bee57600080fd5b505af1158015610c02573d6000803e3d6000fd5b50506004546000858152600160205260409081902090516001600160a01b039092169350636526db7a9250610c369161137d565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101859052604401600060405180830381600087803b158015610c7957600080fd5b505af1158015610c8d573d6000803e3d6000fd5b5050600480548451602086012060405163771602f760e01b815292830152602482018690526001600160a01b0316925063771602f79150604401600060405180830381600087803b158015610ce157600080fd5b505af1158015610cf5573d6000803e3d6000fd5b50505050610d038282610df8565b60005b600554811015610da25760058181548110610d2357610d2361130b565b6000918252602090912001546040516242d70760e31b81526001600160a01b0390911690630216b83890610d5d908690869060040161141a565b600060405180830381600087803b158015610d7757600080fd5b505af1158015610d8b573d6000803e3d6000fd5b505050508080610d9a906113f3565b915050610d06565b505050565b6103c481610e79565b6000818152600160205260408120610dc791610ef3565b600054604051630de3b7b560e01b8152600481018390526001600160a01b0390911690630de3b7b5906024016106ac565b6000828152600160205260409020610e108282611479565b5060005460405163cfd3c57f60e01b81526001600160a01b039091169063cfd3c57f90610e43908590859060040161141a565b600060405180830381600087803b158015610e5d57600080fd5b505af1158015610e71573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b508054610eff90611321565b6000825580601f10610f0f575050565b601f0160209004906000526020600020908101906103c491905b80821115610f3d5760008155600101610f29565b5090565b600060208284031215610f5357600080fd5b5035919050565b60008060408385031215610f6d57600080fd5b50508035926020909101359150565b6020808252825182820181905260009190848201906040850190845b81811015610fb457835183529284019291840191600101610f98565b50909695505050505050565b600060208284031215610fd257600080fd5b81356001600160a01b03811681146102e857600080fd5b6000815180845260005b8181101561100f57602081850181015186830182015201610ff3565b506000602082860101526020601f19601f83011685010191505092915050565b634e487b7160e01b600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b8381101561109c57605f1988870301855261108a868351610fe9565b9550938201939082019060010161106e565b50508584038187015286518085528782019482019350915060005b828110156110f1578451602281106110df57634e487b7160e01b600052602160045260246000fd5b845293810193928101926001016110b7565b5091979650505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561113d5761113d6110fe565b604052919050565b600082601f83011261115657600080fd5b813567ffffffffffffffff811115611170576111706110fe565b611183601f8201601f1916602001611114565b81815284602083860101111561119857600080fd5b816020850160208301376000918101602001919091529392505050565b600080604083850312156111c857600080fd5b82359150602083013567ffffffffffffffff8111156111e657600080fd5b6111f285828601611145565b9150509250929050565b60006020828403121561120e57600080fd5b813567ffffffffffffffff81111561122557600080fd5b61123184828501611145565b949350505050565b6020815260006102e86020830184610fe9565b60006020828403121561125e57600080fd5b5051919050565b6000602080838503121561127857600080fd5b825167ffffffffffffffff8082111561129057600080fd5b818501915085601f8301126112a457600080fd5b8151818111156112b6576112b66110fe565b8060051b91506112c7848301611114565b81815291830184019184810190888411156112e157600080fd5b938501935b838510156112ff578451825293850193908501906112e6565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b600181811c9082168061133557607f821691505b60208210810361135557634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561136d57600080fd5b815180151581146102e857600080fd5b600080835461138b81611321565b600182811680156113a357600181146113b8576113e7565b60ff19841687528215158302870194506113e7565b8760005260208060002060005b858110156113de5781548a8201529084019082016113c5565b50505082870194505b50929695505050505050565b60006001820161141357634e487b7160e01b600052601160045260246000fd5b5060010190565b8281526040602082015260006112316040830184610fe9565b601f821115610da257600081815260208120601f850160051c8101602086101561145a5750805b601f850160051c820191505b81811015610e7157828155600101611466565b815167ffffffffffffffff811115611493576114936110fe565b6114a7816114a18454611321565b84611433565b602080601f8311600181146114dc57600084156114c45750858301515b600019600386901b1c1916600185901b178555610e71565b600085815260208120601f198616915b8281101561150b578886015182559484019460019091019084016114ec565b50858210156115295787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea264697066735822122097986d8c5aec2e522fc348e91ab48160d0589643123f2218d42435ff9dd1bdda64736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610621806100a86000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638e7cb6e11161005b5780638e7cb6e1146100f3578063949d225d1461011d578063cccf7a8e1461012e578063f2fde38b1461015157600080fd5b80631003e2d21461008d578063410d59cc146100a25780634cc82215146100c05780638da5cb5b146100d3575b600080fd5b6100a061009b36600461050b565b610164565b005b6100aa6101ef565b6040516100b79190610524565b60405180910390f35b6100a06100ce36600461050b565b610247565b6100db610374565b6040516001600160a01b0390911681526020016100b7565b61010661010136600461050b565b610383565b6040805192151583526020830191909152016100b7565b6000546040519081526020016100b7565b61014161013c36600461050b565b6103b6565b60405190151581526020016100b7565b6100a061015f366004610568565b610419565b61016c61045b565b6001600160a01b0316336001600160a01b03161461019d57604051632f7a8ee160e01b815260040160405180910390fd5b6101a6816103b6565b6101ec57600080548282526001602081905260408320829055810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018190555b50565b6060600080548060200260200160405190810160405280929190818152602001828054801561023d57602002820191906000526020600020905b815481526020019060010190808311610229575b5050505050905090565b61024f61045b565b6001600160a01b0316336001600160a01b03161461028057604051632f7a8ee160e01b815260040160405180910390fd5b610289816103b6565b156101ec576000805461029e90600190610598565b815481106102ae576102ae6105bf565b906000526020600020015460006001600084815260200190815260200160002054815481106102df576102df6105bf565b60009182526020808320909101929092558281526001918290526040812054815490929190819084908110610316576103166105bf565b90600052602060002001548152602001908152602001600020819055506001600082815260200190815260200160002060009055600080548061035b5761035b6105d5565b6001900381819060005260206000200160009055905550565b600061037e61045b565b905090565b60008061038f836103b6565b61039e57506000928392509050565b50506000908152600160208190526040909120549091565b6000805481036103c857506000919050565b60008281526001602052604081205490036104045781600080815481106103f1576103f16105bf565b9060005260206000200154149050919050565b50600090815260016020526040902054151590565b61042161045b565b6001600160a01b0316336001600160a01b03161461045257604051632f7a8ee160e01b815260040160405180910390fd5b6101ec81610489565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516101ec92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60006020828403121561051d57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561055c57835183529284019291840191600101610540565b50909695505050505050565b60006020828403121561057a57600080fd5b81356001600160a01b038116811461059157600080fd5b9392505050565b818103818111156105b957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212209120bb0a2a9936c2c457117a2d6e08d1b5892ce4c2794940e794c00e17bf899964736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610663806100a86000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806385edea131161005b57806385edea13146100d35780638da5cb5b14610101578063a0265ff814610121578063f2fde38b1461014457600080fd5b80636526db7a14610082578063771602f714610097578063796c5e94146100aa575b600080fd5b610095610090366004610531565b610157565b005b6100956100a5366004610531565b6102bd565b6100bd6100b8366004610553565b61033a565b6040516100ca919061056c565b60405180910390f35b6100f36100e1366004610553565b60009081526020819052604090205490565b6040519081526020016100ca565b61010961039a565b6040516001600160a01b0390911681526020016100ca565b61013461012f366004610531565b6103a9565b60405190151581526020016100ca565b6100956101523660046105b0565b61043c565b61015f610481565b6001600160a01b0316336001600160a01b03161461019057604051632f7a8ee160e01b815260040160405180910390fd5b61019a82826103a9565b156102b957600082815260208190526040902080546101bb906001906105e0565b815481106101cb576101cb610601565b6000918252602080832090910154848352828252604080842060018452818520868652909352909220548154811061020557610205610601565b60009182526020808320909101929092558381526001825260408082208483528084528183205486845283855291832085845293819052835491939092918490811061025357610253610601565b600091825260208083209091015483528281019390935260409182018120939093558483526001825280832084845282528083208390558483529082905290208054806102a2576102a2610617565b600190038181906000526020600020016000905590555b5050565b6102c5610481565b6001600160a01b0316336001600160a01b0316146102f657604051632f7a8ee160e01b815260040160405180910390fd5b61030082826103a9565b6102b95760009182526020828152604080842080546001808552838720868852855292862081905585845291820181558452922090910155565b6000818152602081815260409182902080548351818402810184019094528084526060939283018282801561038e57602002820191906000526020600020905b81548152602001906001019080831161037a575b50505050509050919050565b60006103a4610481565b905090565b60008281526020819052604081205481036103c657506000610436565b60008381526001602090815260408083208584529091528120549003610418576000838152602081905260408120805484929061040557610405610601565b9060005260206000200154149050610436565b50600082815260016020908152604080832084845290915290205415155b92915050565b610444610481565b6001600160a01b0316336001600160a01b03161461047557604051632f7a8ee160e01b815260040160405180910390fd5b61047e816104af565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161047e92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6000806040838503121561054457600080fd5b50508035926020909101359150565b60006020828403121561056557600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156105a457835183529284019291840191600101610588565b50909695505050505050565b6000602082840312156105c257600080fd5b81356001600160a01b03811681146105d957600080fd5b9392505050565b8181038181111561043657634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212204fe0e51f850fe860844b3ef4690dbe2f4106d195a4c983b0ea09e2b1f7ab027564736f6c634300081300338a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460";

type UnitProductionOwnedByComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UnitProductionOwnedByComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UnitProductionOwnedByComponent__factory extends ContractFactory {
  constructor(...args: UnitProductionOwnedByComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UnitProductionOwnedByComponent> {
    return super.deploy(
      world,
      overrides || {}
    ) as Promise<UnitProductionOwnedByComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): UnitProductionOwnedByComponent {
    return super.attach(address) as UnitProductionOwnedByComponent;
  }
  override connect(signer: Signer): UnitProductionOwnedByComponent__factory {
    return super.connect(signer) as UnitProductionOwnedByComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UnitProductionOwnedByComponentInterface {
    return new utils.Interface(_abi) as UnitProductionOwnedByComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UnitProductionOwnedByComponent {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as UnitProductionOwnedByComponent;
  }
}
