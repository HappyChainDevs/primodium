/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { S_RaidSystem, S_RaidSystemInterface } from "../S_RaidSystem";

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
        name: "battleEntity",
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
  "0x60806040523480156200001157600080fd5b5060405162002c1e38038062002c1e8339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b6129c880620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780636ad0ccab1461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f3660046123f1565b6100cf565b6040516100719190612495565b60405180910390f35b610064610088366004612508565b610283565b6100956102cd565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c8366004612534565b610312565b005b6060600080838060200190518101906100e89190612551565b909250905060006101187fe640406de38b5823e93b424dea7e50f1ad48bbf64449bd5a2cb23e5979ef462561038e565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810184905290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa158015610186573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101aa919061257f565b61023b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f535f5261696453797374656d3a20626174746c6520686173206e6f742072657360448201527f6f6c76656420796574000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60015461025e9073ffffffffffffffffffffffffffffffffffffffff16836103b8565b6040805160208101849052016040516020818303038152906040529350505050919050565b6040805173ffffffffffffffffffffffffffffffffffffffff841660208201529081018290526060906102c69082016040516020818303038152906040526100cf565b9392505050565b600061030d7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610382576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61038b81610cd0565b50565b600080546103b29073ffffffffffffffffffffffffffffffffffffffff1683610cd9565b92915050565b60006103c48383610e25565b90508063ffffffff166000036103d957505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ff9768ca34b9927c41f0ddbd0cce635ef12f645937c14ca934428e6a9c05e48da600482015260009073ffffffffffffffffffffffffffffffffffffffff851690634f27da1890602401602060405180830381865afa158015610466573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048a91906125a1565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916846040518263ffffffff1660e01b81526004016104c491815260200190565b600060405180830381865afa1580156104e1573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261052791908101906126c3565b905060008061053a86846000015161131b565b915091508163ffffffff1660000361055457505050505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f36b0c3b8398693329455058d1e1551eb4ed06a51e8f6e8cffc5da55872caccd860048201526106ac90879073ffffffffffffffffffffffffffffffffffffffff821690634f27da18906024015b602060405180830381865afa1580156105e5573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061060991906125a1565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916886040518263ffffffff1660e01b815260040161064391815260200190565b600060405180830381865afa158015610660573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526106a691908101906126c3565b5161165e565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ff9768ca34b9927c41f0ddbd0cce635ef12f645937c14ca934428e6a9c05e48da600482015261072490879073ffffffffffffffffffffffffffffffffffffffff821690634f27da18906024016105c8565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f36b0c3b8398693329455058d1e1551eb4ed06a51e8f6e8cffc5da55872caccd8600482015260009073ffffffffffffffffffffffffffffffffffffffff881690634f27da1890602401602060405180830381865afa1580156107b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d591906125a1565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916876040518263ffffffff1660e01b815260040161080f91815260200190565b600060405180830381865afa15801561082c573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261087291908101906126c3565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f1510640845600482015290915060009073ffffffffffffffffffffffffffffffffffffffff891690634f27da1890602401602060405180830381865afa158015610902573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061092691906125a1565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f72887d78bbad0f2696fb431d6367da7b429df07154724db7df055e27fb64080f600482015290915060009073ffffffffffffffffffffffffffffffffffffffff8a1690634f27da1890602401602060405180830381865afa1580156109b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109da91906125a1565b86516040517f0ff4c91600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9290921691630ff4c91691610a329160040190815260200190565b600060405180830381865afa158015610a4f573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610a959190810190612782565b905060005b8451811015610cc457600086868381518110610ab857610ab86127b7565b60200260200101518a610acb9190612815565b610ad5919061283d565b90508063ffffffff16868381518110610af057610af06127b7565b602002602001015163ffffffff1610610b595780868381518110610b1657610b166127b7565b6020026020010151610b289190612887565b868381518110610b3a57610b3a6127b7565b602002602001019063ffffffff16908163ffffffff1681525050610ba4565b858281518110610b6b57610b6b6127b7565b602002602001015190506000868381518110610b8957610b896127b7565b602002602001019063ffffffff16908163ffffffff16815250505b610bcd8b848481518110610bba57610bba6127b7565b6020026020010151838860000151611cb2565b508373ffffffffffffffffffffffffffffffffffffffff1663d923c3c4610c38858581518110610bff57610bff6127b7565b60200260200101518b60000151604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b888581518110610c4a57610c4a6127b7565b60200260200101516040518363ffffffff1660e01b8152600401610c7e92919091825263ffffffff16602082015260400190565b600060405180830381600087803b158015610c9857600080fd5b505af1158015610cac573d6000803e3d6000fd5b50505050508080610cbc906128ab565b915050610a9a565b50505050505050505050565b61038b81611f23565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610d49573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610d8f9190810190612782565b90508051600003610dfc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f7420726567697374657265640000000000000000000000000000006044820152606401610232565b610e1d81600081518110610e1257610e126127b7565b602002602001015190565b949350505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e6004820152600090819073ffffffffffffffffffffffffffffffffffffffff851690634f27da1890602401602060405180830381865afa158015610eb4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed891906125a1565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f599ba4f498db499c3d65955cccdb49ec5849ea3e14dc235526a15d98a09e9644600482015290915060009073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa158015610f68573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f8c91906125a1565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f36b0c3b8398693329455058d1e1551eb4ed06a51e8f6e8cffc5da55872caccd8600482015290915060009073ffffffffffffffffffffffffffffffffffffffff871690634f27da1890602401602060405180830381865afa15801561101c573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061104091906125a1565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810187905290915060009073ffffffffffffffffffffffffffffffffffffffff831690630ff4c91690602401600060405180830381865afa1580156110b1573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526110f791908101906126c3565b90506000945060005b81602001515181101561131057600061116183602001518381518110611128576111286127b7565b60200260200101518460000151604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905290915060009073ffffffffffffffffffffffffffffffffffffffff881690630ff4c91690602401602060405180830381865afa1580156111d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111f691906128e3565b90508573ffffffffffffffffffffffffffffffffffffffff16630ff4c9166112688660200151868151811061122d5761122d6127b7565b60200260200101518463ffffffff16604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6040518263ffffffff1660e01b815260040161128691815260200190565b602060405180830381865afa1580156112a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112c791906128e3565b846060015184815181106112dd576112dd6127b7565b60200260200101516112ef9190612815565b6112f990896128fe565b975050508080611308906128ab565b915050611100565b505050505092915050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f15106408456004820152600090606090829073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa1580156113ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113d191906125a1565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f72887d78bbad0f2696fb431d6367da7b429df07154724db7df055e27fb64080f600482015290915060009073ffffffffffffffffffffffffffffffffffffffff871690634f27da1890602401602060405180830381865afa158015611461573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061148591906125a1565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810187905290915060009073ffffffffffffffffffffffffffffffffffffffff831690630ff4c91690602401600060405180830381865afa1580156114f6573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261153c9190810190612782565b9050805167ffffffffffffffff81111561155857611558612304565b604051908082528060200260200182016040528015611581578160200160208202803683370190505b5093506000945060005b81518110156116535760006115e08383815181106115ab576115ab6127b7565b602002602001015189604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b90506115ec8582611fcf565b8683815181106115fe576115fe6127b7565b602002602001019063ffffffff16908163ffffffff168152505085828151811061162a5761162a6127b7565b60200260200101518761163d91906128fe565b965050808061164b906128ab565b91505061158b565b505050509250929050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f72887d78bbad0f2696fb431d6367da7b429df07154724db7df055e27fb64080f600482015260009073ffffffffffffffffffffffffffffffffffffffff841690634f27da1890602401602060405180830381865afa1580156116eb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061170f91906125a1565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810184905290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa15801561177d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117a1919061257f565b6117aa57505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e600482015260009073ffffffffffffffffffffffffffffffffffffffff851690634f27da1890602401602060405180830381865afa158015611837573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061185b91906125a1565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810185905290915060009073ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401600060405180830381865afa1580156118cc573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526119129190810190612782565b905060005b8151811015611caa57600061196c838381518110611937576119376127b7565b602002602001015187604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f222d9674c2fee077bc82c84232803a9168906e2be25c4560d094c76895b8a432600482015290915073ffffffffffffffffffffffffffffffffffffffff881690634f27da1890602401602060405180830381865afa1580156119f9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a1d91906125a1565b73ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e826040518263ffffffff1660e01b8152600401611a5791815260200190565b602060405180830381865afa158015611a74573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a98919061257f565b15611c1057611b358773ffffffffffffffffffffffffffffffffffffffff16630d59332e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015611aeb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b0f91906125a1565b7fbfa4e94ac46519bd16654700fe5605b990ceb82f41218bfba1018857ba5e01c0610cd9565b73ffffffffffffffffffffffffffffffffffffffff16636ad0ccab33858581518110611b6357611b636127b7565b60200260200101516040518363ffffffff1660e01b8152600401611ba992919073ffffffffffffffffffffffffffffffffffffffff929092168252602082015260400190565b6000604051808303816000875af1158015611bc8573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052611c0e919081019061291b565b505b6040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810182905243602482015273ffffffffffffffffffffffffffffffffffffffff851690631ab06ee590604401600060405180830381600087803b158015611c7e57600080fd5b505af1158015611c92573d6000803e3d6000fd5b50505050508080611ca2906128ab565b915050611917565b505050505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f15106408456004820152600090819073ffffffffffffffffffffffffffffffffffffffff871690634f27da1890602401602060405180830381865afa158015611d41573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d6591906125a1565b604080516020808201899052818301879052825180830384018152606090920190925280519101209091506000611d9d8886896120fb565b90508563ffffffff168163ffffffff161115611e65578273ffffffffffffffffffffffffffffffffffffffff1663d923c3c48388611ddb8787611fcf565b611de591906128fe565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b158015611e4157600080fd5b505af1158015611e55573d6000803e3d6000fd5b5050505060009350505050610e1d565b8273ffffffffffffffffffffffffffffffffffffffff1663d923c3c48383611e8d8787611fcf565b611e9791906128fe565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b158015611ef357600080fd5b505af1158015611f07573d6000803e3d6000fd5b505050508086611f179190612887565b98975050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa15801561203d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612061919061257f565b61206c5760006102c6565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa1580156120d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102c691906128e3565b600080612109858585612222565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f151064084560048201529091506000906121ee9073ffffffffffffffffffffffffffffffffffffffff881690634f27da1890602401602060405180830381865afa15801561219d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121c191906125a1565b6040805160208082018990528183018a905282518083038401815260609092019092528051910120611fcf565b90508063ffffffff168263ffffffff161161220e576000925050506102c6565b6122188183612887565b9695505050505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f16b501788471b0e2be7833a8d54a049f02ca15b837831d34c5bc534a33e5a1f76004820152600090610e1d9073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa1580156122b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122d791906125a1565b60408051602080820187905281830188905282518083038401815260609092019092528051910120611fcf565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040516080810167ffffffffffffffff8111828210171561235657612356612304565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156123a3576123a3612304565b604052919050565b600067ffffffffffffffff8211156123c5576123c5612304565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b60006020828403121561240357600080fd5b813567ffffffffffffffff81111561241a57600080fd5b8201601f8101841361242b57600080fd5b803561243e612439826123ab565b61235c565b81815285602083850101111561245357600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b8381101561248c578181015183820152602001612474565b50506000910152565b60208152600082518060208401526124b4816040850160208701612471565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b73ffffffffffffffffffffffffffffffffffffffff8116811461038b57600080fd5b6000806040838503121561251b57600080fd5b8235612526816124e6565b946020939093013593505050565b60006020828403121561254657600080fd5b81356102c6816124e6565b6000806040838503121561256457600080fd5b825161256f816124e6565b6020939093015192949293505050565b60006020828403121561259157600080fd5b815180151581146102c657600080fd5b6000602082840312156125b357600080fd5b81516102c6816124e6565b600067ffffffffffffffff8211156125d8576125d8612304565b5060051b60200190565b600082601f8301126125f357600080fd5b81516020612603612439836125be565b82815260059290921b8401810191818101908684111561262257600080fd5b8286015b8481101561263d5780518352918301918301612626565b509695505050505050565b805163ffffffff8116811461265c57600080fd5b919050565b600082601f83011261267257600080fd5b81516020612682612439836125be565b82815260059290921b840181019181810190868411156126a157600080fd5b8286015b8481101561263d576126b681612648565b83529183019183016126a5565b6000602082840312156126d557600080fd5b815167ffffffffffffffff808211156126ed57600080fd5b908301906080828603121561270157600080fd5b612709612333565b8251815260208301518281111561271f57600080fd5b61272b878286016125e2565b60208301525060408301518281111561274357600080fd5b61274f87828601612661565b60408301525060608301518281111561276757600080fd5b61277387828601612661565b60608301525095945050505050565b60006020828403121561279457600080fd5b815167ffffffffffffffff8111156127ab57600080fd5b610e1d848285016125e2565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b63ffffffff818116838216028082169190828114612835576128356127e6565b505092915050565b600063ffffffff8084168061287b577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b92169190910492915050565b63ffffffff8281168282160390808211156128a4576128a46127e6565b5092915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036128dc576128dc6127e6565b5060010190565b6000602082840312156128f557600080fd5b6102c682612648565b63ffffffff8181168382160190808211156128a4576128a46127e6565b60006020828403121561292d57600080fd5b815167ffffffffffffffff81111561294457600080fd5b8201601f8101841361295557600080fd5b8051612963612439826123ab565b81815285602083850101111561297857600080fd5b612989826020830160208601612471565b9594505050505056fea2646970667358221220b550ccca31646079fe84f6edebb7f507370839b3c04b90140d186f93cb77a4a864736f6c63430008130033";

type S_RaidSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: S_RaidSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class S_RaidSystem__factory extends ContractFactory {
  constructor(...args: S_RaidSystemConstructorParams) {
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
  ): Promise<S_RaidSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<S_RaidSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): S_RaidSystem {
    return super.attach(address) as S_RaidSystem;
  }
  override connect(signer: Signer): S_RaidSystem__factory {
    return super.connect(signer) as S_RaidSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): S_RaidSystemInterface {
    return new utils.Interface(_abi) as S_RaidSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): S_RaidSystem {
    return new Contract(address, _abi, signerOrProvider) as S_RaidSystem;
  }
}
