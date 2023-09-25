/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  OccupiedUtilityResourceComponent,
  OccupiedUtilityResourceComponentInterface,
} from "../OccupiedUtilityResourceComponent";

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
        internalType: "uint32",
        name: "value",
        type: "uint32",
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
        internalType: "uint32",
        name: "",
        type: "uint32",
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
        internalType: "uint32",
        name: "value",
        type: "uint32",
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
  "0x60806040523480156200001157600080fd5b506040516200267f3803806200267f833981016040819052620000349162000266565b807f4f2e352c22f4d6e8661eee4a98890fa6dfead6e74bc680ee4c52da1cc198d7c98181818162000065336200012b565b60028190556001600160a01b038216156200008557620000858262000194565b505060405162000095906200024a565b604051809103906000f080158015620000b2573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b0392909216919091179055604051620000e19062000258565b604051809103906000f080158015620000fe573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b039290921691909117905550620002989350505050565b6000805160206200265f83398151915280546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6000805160206200265f833981519152546001600160a01b03163314620001ce57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200022e57600080fd5b505af115801562000243573d6000803e3d6000fd5b5050505050565b6106c9806200188b83390190565b61070b8062001f5483390190565b6000602082840312156200027957600080fd5b81516001600160a01b03811681146200029157600080fd5b9392505050565b6115e380620002a86000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80638b282947116100ad578063b8bc073d11610071578063b8bc073d14610272578063bf4fe57e14610292578063cccf7a8e146102a5578063d923c3c4146102b8578063f2fde38b146102cb57600080fd5b80638b2829471461021a5780638da5cb5b1461022d5780639d2c76b414610235578063af640d0f14610248578063b361be461461025f57600080fd5b80634cc82215116100f45780634cc82215146101a65780634fef6a38146101bb5780636b122fe0146101ce57806375c0669c146101e4578063861eb905146101f757600080fd5b80630ff4c9161461012657806330b67baa1461015357806331b933b91461017e578063447e2bd214610193575b600080fd5b610139610134366004610f5b565b6102de565b60405163ffffffff90911681526020015b60405180910390f35b600054610166906001600160a01b031681565b6040516001600160a01b03909116815260200161014a565b610186610304565b60405161014a9190610f74565b6101866101a1366004610fca565b61037b565b6101b96101b4366004610f5b565b6103ad565b005b6101b96101c9366004610fe7565b6103df565b6101d661045b565b60405161014a92919061106c565b6101b96101f2366004610fe7565b61052f565b61020a610205366004610fe7565b6105a7565b604051901515815260200161014a565b6101b96102283660046111dc565b61060a565b61016661063e565b6101b9610243366004610fe7565b610648565b61025160025481565b60405190815260200161014a565b61018661026d366004611223565b6106fc565b610285610280366004610f5b565b610775565b60405161014a9190611260565b6101b96102a0366004610fe7565b610817565b61020a6102b3366004610f5b565b610890565b6101b96102c6366004611273565b6108fe565b6101b96102d9366004610fe7565b610929565b6000806102ea83610775565b8060200190518101906102fd91906112a3565b9392505050565b60035460408051631043567360e21b815290516060926001600160a01b03169163410d59cc9160048083019260009291908290030181865afa15801561034e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261037691908101906112c0565b905090565b6040805163ffffffff831660208201526060916103a791016040516020818303038152906040526106fc565b92915050565b6103b6336105a7565b6103d35760405163203769ed60e11b815260040160405180910390fd5b6103dc8161096b565b50565b6103e7610b94565b6001600160a01b0316336001600160a01b03161461041857604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19166001179055565b604080516001808252818301909252606091829190816020015b6060815260200190600190039081610475575050604080516001808252818301909252919350602080830190803683370190505090506040518060400160405280600581526020016476616c756560d81b815250826000815181106104dc576104dc611366565b6020026020010181905250600a816000815181106104fc576104fc611366565b6020026020010190602181111561051557610515611056565b9081602181111561052857610528611056565b9052509091565b610538336105a7565b6105555760405163203769ed60e11b815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff16806103a757506105f061063e565b6001600160a01b0316826001600160a01b03161492915050565b610613336105a7565b6106305760405163203769ed60e11b815260040160405180910390fd5b61063a8282610bc2565b5050565b6000610376610b94565b610650610b94565b6001600160a01b0316336001600160a01b03161461068157604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f3034770906044015b600060405180830381600087803b1580156106e157600080fd5b505af11580156106f5573d6000803e3d6000fd5b5050505050565b6004805482516020840120604051631e5b17a560e21b8152928301526060916001600160a01b039091169063796c5e9490602401600060405180830381865afa15801561074d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103a791908101906112c0565b60008181526001602052604090208054606091906107929061137c565b80601f01602080910402602001604051908101604052809291908181526020018280546107be9061137c565b801561080b5780601f106107e05761010080835404028352916020019161080b565b820191906000526020600020905b8154815290600101906020018083116107ee57829003601f168201915b50505050509050919050565b61081f610b94565b6001600160a01b0316336001600160a01b03161461085057604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19169055565b600354604051636667bd4760e11b8152600481018390526000916001600160a01b03169063cccf7a8e90602401602060405180830381865afa1580156108da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a791906113b6565b6040805163ffffffff8316602082015261063a9184910160405160208183030381529060405261060a565b610931610b94565b6001600160a01b0316336001600160a01b03161461096257604051632f7a8ee160e01b815260040160405180910390fd5b6103dc81610dc1565b6004546000828152600160205260409081902090516001600160a01b03909216916385edea139161099b916113d8565b60405190819003812060e083901b6001600160e01b03191682526004820152602401602060405180830381865afa1580156109da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109fe919061144e565b600003610a085750565b6004546000828152600160205260409081902090516001600160a01b0390921691636526db7a91610a38916113d8565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101849052604401600060405180830381600087803b158015610a7b57600080fd5b505af1158015610a8f573d6000803e3d6000fd5b5050600354604051634cc8221560e01b8152600481018590526001600160a01b039091169250634cc822159150602401600060405180830381600087803b158015610ad957600080fd5b505af1158015610aed573d6000803e3d6000fd5b50505050610afa81610dca565b60005b60055481101561063a5760058181548110610b1a57610b1a611366565b600091825260209091200154604051634cc8221560e01b8152600481018490526001600160a01b0390911690634cc8221590602401600060405180830381600087803b158015610b6957600080fd5b505af1158015610b7d573d6000803e3d6000fd5b505050508080610b8c90611467565b915050610afd565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b600354604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b158015610c0857600080fd5b505af1158015610c1c573d6000803e3d6000fd5b50506004546000858152600160205260409081902090516001600160a01b039092169350636526db7a9250610c50916113d8565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101859052604401600060405180830381600087803b158015610c9357600080fd5b505af1158015610ca7573d6000803e3d6000fd5b5050600480548451602086012060405163771602f760e01b815292830152602482018690526001600160a01b0316925063771602f79150604401600060405180830381600087803b158015610cfb57600080fd5b505af1158015610d0f573d6000803e3d6000fd5b50505050610d1d8282610e12565b60005b600554811015610dbc5760058181548110610d3d57610d3d611366565b6000918252602090912001546040516242d70760e31b81526001600160a01b0390911690630216b83890610d77908690869060040161148e565b600060405180830381600087803b158015610d9157600080fd5b505af1158015610da5573d6000803e3d6000fd5b505050508080610db490611467565b915050610d20565b505050565b6103dc81610e93565b6000818152600160205260408120610de191610f0d565b600054604051630de3b7b560e01b8152600481018390526001600160a01b0390911690630de3b7b5906024016106c7565b6000828152600160205260409020610e2a82826114ed565b5060005460405163cfd3c57f60e01b81526001600160a01b039091169063cfd3c57f90610e5d908590859060040161148e565b600060405180830381600087803b158015610e7757600080fd5b505af1158015610e8b573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b508054610f199061137c565b6000825580601f10610f29575050565b601f0160209004906000526020600020908101906103dc91905b80821115610f575760008155600101610f43565b5090565b600060208284031215610f6d57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610fac57835183529284019291840191600101610f90565b50909695505050505050565b63ffffffff811681146103dc57600080fd5b600060208284031215610fdc57600080fd5b81356102fd81610fb8565b600060208284031215610ff957600080fd5b81356001600160a01b03811681146102fd57600080fd5b6000815180845260005b818110156110365760208185018101518683018201520161101a565b506000602082860101526020601f19601f83011685010191505092915050565b634e487b7160e01b600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b838110156110c357605f198887030185526110b1868351611010565b95509382019390820190600101611095565b50508584038187015286518085528782019482019350915060005b828110156111185784516022811061110657634e487b7160e01b600052602160045260246000fd5b845293810193928101926001016110de565b5091979650505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561116457611164611125565b604052919050565b600082601f83011261117d57600080fd5b813567ffffffffffffffff81111561119757611197611125565b6111aa601f8201601f191660200161113b565b8181528460208386010111156111bf57600080fd5b816020850160208301376000918101602001919091529392505050565b600080604083850312156111ef57600080fd5b82359150602083013567ffffffffffffffff81111561120d57600080fd5b6112198582860161116c565b9150509250929050565b60006020828403121561123557600080fd5b813567ffffffffffffffff81111561124c57600080fd5b6112588482850161116c565b949350505050565b6020815260006102fd6020830184611010565b6000806040838503121561128657600080fd5b82359150602083013561129881610fb8565b809150509250929050565b6000602082840312156112b557600080fd5b81516102fd81610fb8565b600060208083850312156112d357600080fd5b825167ffffffffffffffff808211156112eb57600080fd5b818501915085601f8301126112ff57600080fd5b81518181111561131157611311611125565b8060051b915061132284830161113b565b818152918301840191848101908884111561133c57600080fd5b938501935b8385101561135a57845182529385019390850190611341565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b600181811c9082168061139057607f821691505b6020821081036113b057634e487b7160e01b600052602260045260246000fd5b50919050565b6000602082840312156113c857600080fd5b815180151581146102fd57600080fd5b60008083546113e68161137c565b600182811680156113fe576001811461141357611442565b60ff1984168752821515830287019450611442565b8760005260208060002060005b858110156114395781548a820152908401908201611420565b50505082870194505b50929695505050505050565b60006020828403121561146057600080fd5b5051919050565b60006001820161148757634e487b7160e01b600052601160045260246000fd5b5060010190565b8281526040602082015260006112586040830184611010565b601f821115610dbc57600081815260208120601f850160051c810160208610156114ce5750805b601f850160051c820191505b81811015610e8b578281556001016114da565b815167ffffffffffffffff81111561150757611507611125565b61151b81611515845461137c565b846114a7565b602080601f83116001811461155057600084156115385750858301515b600019600386901b1c1916600185901b178555610e8b565b600085815260208120601f198616915b8281101561157f57888601518255948401946001909101908401611560565b508582101561159d5787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea26469706673582212202f72b4fe833d8a45b1d32dadca6d52b504daf1416cf09a72d9376b2313bd847b64736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610621806100a86000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638e7cb6e11161005b5780638e7cb6e1146100f3578063949d225d1461011d578063cccf7a8e1461012e578063f2fde38b1461015157600080fd5b80631003e2d21461008d578063410d59cc146100a25780634cc82215146100c05780638da5cb5b146100d3575b600080fd5b6100a061009b36600461050b565b610164565b005b6100aa6101ef565b6040516100b79190610524565b60405180910390f35b6100a06100ce36600461050b565b610247565b6100db610374565b6040516001600160a01b0390911681526020016100b7565b61010661010136600461050b565b610383565b6040805192151583526020830191909152016100b7565b6000546040519081526020016100b7565b61014161013c36600461050b565b6103b6565b60405190151581526020016100b7565b6100a061015f366004610568565b610419565b61016c61045b565b6001600160a01b0316336001600160a01b03161461019d57604051632f7a8ee160e01b815260040160405180910390fd5b6101a6816103b6565b6101ec57600080548282526001602081905260408320829055810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018190555b50565b6060600080548060200260200160405190810160405280929190818152602001828054801561023d57602002820191906000526020600020905b815481526020019060010190808311610229575b5050505050905090565b61024f61045b565b6001600160a01b0316336001600160a01b03161461028057604051632f7a8ee160e01b815260040160405180910390fd5b610289816103b6565b156101ec576000805461029e90600190610598565b815481106102ae576102ae6105bf565b906000526020600020015460006001600084815260200190815260200160002054815481106102df576102df6105bf565b60009182526020808320909101929092558281526001918290526040812054815490929190819084908110610316576103166105bf565b90600052602060002001548152602001908152602001600020819055506001600082815260200190815260200160002060009055600080548061035b5761035b6105d5565b6001900381819060005260206000200160009055905550565b600061037e61045b565b905090565b60008061038f836103b6565b61039e57506000928392509050565b50506000908152600160208190526040909120549091565b6000805481036103c857506000919050565b60008281526001602052604081205490036104045781600080815481106103f1576103f16105bf565b9060005260206000200154149050919050565b50600090815260016020526040902054151590565b61042161045b565b6001600160a01b0316336001600160a01b03161461045257604051632f7a8ee160e01b815260040160405180910390fd5b6101ec81610489565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516101ec92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60006020828403121561051d57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561055c57835183529284019291840191600101610540565b50909695505050505050565b60006020828403121561057a57600080fd5b81356001600160a01b038116811461059157600080fd5b9392505050565b818103818111156105b957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea2646970667358221220e26b625121584afbfcdd5a7c76a89bd07c2a082781c4635c0fc11c4dffdf9aed64736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610663806100a86000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806385edea131161005b57806385edea13146100d35780638da5cb5b14610101578063a0265ff814610121578063f2fde38b1461014457600080fd5b80636526db7a14610082578063771602f714610097578063796c5e94146100aa575b600080fd5b610095610090366004610531565b610157565b005b6100956100a5366004610531565b6102bd565b6100bd6100b8366004610553565b61033a565b6040516100ca919061056c565b60405180910390f35b6100f36100e1366004610553565b60009081526020819052604090205490565b6040519081526020016100ca565b61010961039a565b6040516001600160a01b0390911681526020016100ca565b61013461012f366004610531565b6103a9565b60405190151581526020016100ca565b6100956101523660046105b0565b61043c565b61015f610481565b6001600160a01b0316336001600160a01b03161461019057604051632f7a8ee160e01b815260040160405180910390fd5b61019a82826103a9565b156102b957600082815260208190526040902080546101bb906001906105e0565b815481106101cb576101cb610601565b6000918252602080832090910154848352828252604080842060018452818520868652909352909220548154811061020557610205610601565b60009182526020808320909101929092558381526001825260408082208483528084528183205486845283855291832085845293819052835491939092918490811061025357610253610601565b600091825260208083209091015483528281019390935260409182018120939093558483526001825280832084845282528083208390558483529082905290208054806102a2576102a2610617565b600190038181906000526020600020016000905590555b5050565b6102c5610481565b6001600160a01b0316336001600160a01b0316146102f657604051632f7a8ee160e01b815260040160405180910390fd5b61030082826103a9565b6102b95760009182526020828152604080842080546001808552838720868852855292862081905585845291820181558452922090910155565b6000818152602081815260409182902080548351818402810184019094528084526060939283018282801561038e57602002820191906000526020600020905b81548152602001906001019080831161037a575b50505050509050919050565b60006103a4610481565b905090565b60008281526020819052604081205481036103c657506000610436565b60008381526001602090815260408083208584529091528120549003610418576000838152602081905260408120805484929061040557610405610601565b9060005260206000200154149050610436565b50600082815260016020908152604080832084845290915290205415155b92915050565b610444610481565b6001600160a01b0316336001600160a01b03161461047557604051632f7a8ee160e01b815260040160405180910390fd5b61047e816104af565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161047e92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6000806040838503121561054457600080fd5b50508035926020909101359150565b60006020828403121561056557600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156105a457835183529284019291840191600101610588565b50909695505050505050565b6000602082840312156105c257600080fd5b81356001600160a01b03811681146105d957600080fd5b9392505050565b8181038181111561043657634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea264697066735822122074d2dbc3f020a29d6081fb9fcf69e8e3c85026be8658abafc11ba431c108e33464736f6c634300081300338a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460";

type OccupiedUtilityResourceComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OccupiedUtilityResourceComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OccupiedUtilityResourceComponent__factory extends ContractFactory {
  constructor(...args: OccupiedUtilityResourceComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OccupiedUtilityResourceComponent> {
    return super.deploy(
      world,
      overrides || {}
    ) as Promise<OccupiedUtilityResourceComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): OccupiedUtilityResourceComponent {
    return super.attach(address) as OccupiedUtilityResourceComponent;
  }
  override connect(signer: Signer): OccupiedUtilityResourceComponent__factory {
    return super.connect(signer) as OccupiedUtilityResourceComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OccupiedUtilityResourceComponentInterface {
    return new utils.Interface(
      _abi
    ) as OccupiedUtilityResourceComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OccupiedUtilityResourceComponent {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as OccupiedUtilityResourceComponent;
  }
}
