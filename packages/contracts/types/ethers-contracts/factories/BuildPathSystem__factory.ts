/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BuildPathSystem,
  BuildPathSystemInterface,
} from "../BuildPathSystem";

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
          {
            internalType: "uint256",
            name: "parent",
            type: "uint256",
          },
        ],
        internalType: "struct Coord",
        name: "coordStart",
        type: "tuple",
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
          {
            internalType: "uint256",
            name: "parent",
            type: "uint256",
          },
        ],
        internalType: "struct Coord",
        name: "coordEnd",
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
  "0x60806040523480156200001157600080fd5b506040516200247f3803806200247f8339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b61222980620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe1461005157806331b20e7a1461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004611b45565b6100cf565b6040516100719190611be9565b60405180910390f35b610064610088366004611c97565b610b21565b610095610b56565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c8366004611cee565b610b9b565b005b6060600080838060200190518101906100e89190611d60565b91509150806000015160030b826000015160030b1480156101165750806020015160030b826020015160030b145b156101ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604260248201527f5b4275696c645061746853797374656d5d2043616e6e6f74207374617274206160448201527f6e6420656e642070617468206174207468652073616d6520636f6f7264696e6160648201527f7465000000000000000000000000000000000000000000000000000000000000608482015260a4015b60405180910390fd5b60006101d983610c17565b905060006101e683610c17565b90506101f28282610dd7565b61027e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603460248201527f5b4275696c645061746853797374656d5d2043616e6e6f74206275696c64207060448201527f617468206f6e20756e6f776e65642074696c657300000000000000000000000060648201526084016101c5565b6102a77f0d469bcaf5f43a6290ca2906ecdeb5ef80d7723e8cad27045bddb6e1eb9da43561107e565b73ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e836040518263ffffffff1660e01b81526004016102e191815260200190565b602060405180830381865afa1580156102fe573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103229190611d8c565b156103d5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604860248201527f5b4275696c645061746853797374656d5d2043616e6e6f74207374617274206d60448201527f6f7265207468616e206f6e6520706174682066726f6d207468652073616d652060648201527f6275696c64696e67000000000000000000000000000000000000000000000000608482015260a4016101c5565b6103df82826110a2565b61046b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5b4275696c645061746853797374656d5d2043616e6e6f74206275696c64207060448201527f617468000000000000000000000000000000000000000000000000000000000060648201526084016101c5565b600080546104af9073ffffffffffffffffffffffffffffffffffffffff167f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c56117c2565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916846040518263ffffffff1660e01b81526004016104e991815260200190565b602060405180830381865afa158015610506573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061052a9190611dae565b60008054919250906105fe9083906105789073ffffffffffffffffffffffffffffffffffffffff167fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e6117c2565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916876040518263ffffffff1660e01b81526004016105b291815260200190565b602060405180830381865afa1580156105cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f39190611de0565b63ffffffff16611906565b90506106297f0d469bcaf5f43a6290ca2906ecdeb5ef80d7723e8cad27045bddb6e1eb9da43561107e565b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018690526024810185905273ffffffffffffffffffffffffffffffffffffffff9190911690631ab06ee590604401600060405180830381600087803b15801561069a57600080fd5b505af11580156106ae573d6000803e3d6000fd5b5050505060006106e07fa9030fd5d2d8df4ef9e9a591c66869629e3031bc7112e7766b55d9f29321005d60001c61107e565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810186905290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa15801561074e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107729190611d8c565b156108d657600154604080517f0d59332e00000000000000000000000000000000000000000000000000000000815290516108329273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa1580156107e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080c9190611dfb565b7fac9642b56338c209f76541aaaff3c4074452a3c14b101c14f80550868ccebebf6117c2565b73ffffffffffffffffffffffffffffffffffffffff166327b45099338760006040518463ffffffff1660e01b815260040161086f93929190611e18565b6000604051808303816000875af115801561088e573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526108d49190810190611e81565b505b6000546109199073ffffffffffffffffffffffffffffffffffffffff167f2444db3b2cf5ba1059ebafe0212ddf405afa28d4ca9f16e72b56afe6e5f673c86117c2565b73ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e836040518263ffffffff1660e01b815260040161095391815260200190565b602060405180830381865afa158015610970573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109949190611d8c565b15610af857600154604080517f0d59332e0000000000000000000000000000000000000000000000000000000081529051610a549273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610a0a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a2e9190611dfb565b7ff2021642afaf65bb89c355c68b4a3fc6356dc9299686fc001113a2e2b7b600a36117c2565b73ffffffffffffffffffffffffffffffffffffffff166327b45099338760006040518463ffffffff1660e01b8152600401610a9193929190611e18565b6000604051808303816000875af1158015610ab0573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610af69190810190611e81565b505b604080516020810187905201604051602081830303815290604052975050505050505050919050565b6060610b4d8383604051602001610b39929190611ef8565b6040516020818303038152906040526100cf565b90505b92915050565b6000610b967f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610c0b576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610c148161195b565b50565b600080548190610c5d9073ffffffffffffffffffffffffffffffffffffffff167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c75406117c2565b90506000610ca06040518060400160405280600d81526020017f6275696c64696e672e74696c650000000000000000000000000000000000000081525085611964565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa158015610d0e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d329190611d8c565b610d40575060009392505050565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905273ffffffffffffffffffffffffffffffffffffffff831690630ff4c91690602401602060405180830381865afa158015610dab573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dcf9190611dae565b949350505050565b600080548190610e1d9073ffffffffffffffffffffffffffffffffffffffff167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c75406117c2565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810186905290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa158015610e8b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eaf9190611d8c565b8015610f4557506040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa158015610f21573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f459190611d8c565b8015610fde5750336040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810186905273ffffffffffffffffffffffffffffffffffffffff831690630ff4c91690602401602060405180830381865afa158015610fb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fdc9190611dae565b145b8015610dcf5750336040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810185905273ffffffffffffffffffffffffffffffffffffffff831690630ff4c91690602401602060405180830381865afa158015611051573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110759190611dae565b14949350505050565b60008054610b509073ffffffffffffffffffffffffffffffffffffffff16836117c2565b6000806110ce7fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e61107e565b905060006110fb7f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c561107e565b905060006111d18273ffffffffffffffffffffffffffffffffffffffff16630ff4c916886040518263ffffffff1660e01b815260040161113d91815260200190565b602060405180830381865afa15801561115a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061117e9190611dae565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810189905273ffffffffffffffffffffffffffffffffffffffff861690630ff4c916906024016105b2565b905060006111fe7f2444db3b2cf5ba1059ebafe0212ddf405afa28d4ca9f16e72b56afe6e5f673c861107e565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810184905290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa15801561126c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112909190611d8c565b6112a1576000945050505050610b50565b6040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018790527fd1951468cf9e9494d5703385454c036cef4267b4bf50da6ae1b4239c5fa946d39073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa15801561132e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113529190611dae565b03611364576001945050505050610b50565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810187905260009061144d9073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa1580156113d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113fa9190611dae565b6040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018a905273ffffffffffffffffffffffffffffffffffffffff881690630ff4c916906024016105b2565b9050600061147a7fa9030fd5d2d8df4ef9e9a591c66869629e3031bc7112e7766b55d9f29321005d61107e565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810184905290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa1580156114e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061150c9190611d8c565b61151f5760009650505050505050610b50565b600061154a7fcd21223913df34354e53714bb49095fd4d6a8c8d2ac1fe38f8a14e9fd673e77c61107e565b6040517fcccf7a8e000000000000000000000000000000000000000000000000000000008152600481018b905290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa1580156115b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115dc9190611d8c565b156115f1576000975050505050505050610b50565b6040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018a905260009073ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401600060405180830381865afa15801561165f573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526116a59190810190611fd4565b905060005b8160200151518110156117b0576040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810188905273ffffffffffffffffffffffffffffffffffffffff871690630ff4c916906024016040805180830381865afa158015611721573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061174591906120c4565b51825180518390811061175a5761175a6120fa565b60200260200101510361179e5760008260200151828151811061177f5761177f6120fa565b602002602001015163ffffffff16119950505050505050505050610b50565b806117a881612129565b9150506116aa565b5060009b9a5050505050505050505050565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015611832573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526118789190810190612188565b905080516000036118e5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f74207265676973746572656400000000000000000000000000000060448201526064016101c5565b610dcf816000815181106118fb576118fb6120fa565b602002602001015190565b60408051602081018490529081018290526000906060015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081840301815291905280516020909101209392505050565b610c1481611989565b60008282600001518360200151846040015160405160200161191e94939291906121bd565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040516060810167ffffffffffffffff81118282101715611a8757611a87611a35565b60405290565b6040805190810167ffffffffffffffff81118282101715611a8757611a87611a35565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611af757611af7611a35565b604052919050565b600067ffffffffffffffff821115611b1957611b19611a35565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b600060208284031215611b5757600080fd5b813567ffffffffffffffff811115611b6e57600080fd5b8201601f81018413611b7f57600080fd5b8035611b92611b8d82611aff565b611ab0565b818152856020838501011115611ba757600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b83811015611be0578181015183820152602001611bc8565b50506000910152565b6020815260008251806020840152611c08816040850160208701611bc5565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b8060030b8114610c1457600080fd5b600060608284031215611c5b57600080fd5b611c63611a64565b90508135611c7081611c3a565b81526020820135611c8081611c3a565b806020830152506040820135604082015292915050565b60008060c08385031215611caa57600080fd5b611cb48484611c49565b9150611cc38460608501611c49565b90509250929050565b73ffffffffffffffffffffffffffffffffffffffff81168114610c1457600080fd5b600060208284031215611d0057600080fd5b8135611d0b81611ccc565b9392505050565b600060608284031215611d2457600080fd5b611d2c611a64565b90508151611d3981611c3a565b81526020820151611d4981611c3a565b806020830152506040820151604082015292915050565b60008060c08385031215611d7357600080fd5b611d7d8484611d12565b9150611cc38460608501611d12565b600060208284031215611d9e57600080fd5b81518015158114611d0b57600080fd5b600060208284031215611dc057600080fd5b5051919050565b805163ffffffff81168114611ddb57600080fd5b919050565b600060208284031215611df257600080fd5b610b4d82611dc7565b600060208284031215611e0d57600080fd5b8151611d0b81611ccc565b73ffffffffffffffffffffffffffffffffffffffff84168152602081018390526060810160038310611e73577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b826040830152949350505050565b600060208284031215611e9357600080fd5b815167ffffffffffffffff811115611eaa57600080fd5b8201601f81018413611ebb57600080fd5b8051611ec9611b8d82611aff565b818152856020838501011115611ede57600080fd5b611eef826020830160208601611bc5565b95945050505050565b60c08101611f238285805160030b8252602081015160030b6020830152604081015160408301525050565b8251600390810b60608401526020840151900b6080830152604083015160a0830152611d0b565b600067ffffffffffffffff821115611f6457611f64611a35565b5060051b60200190565b600082601f830112611f7f57600080fd5b81516020611f8f611b8d83611f4a565b82815260059290921b84018101918181019086841115611fae57600080fd5b8286015b84811015611fc95780518352918301918301611fb2565b509695505050505050565b60006020808385031215611fe757600080fd5b825167ffffffffffffffff80821115611fff57600080fd5b908401906040828703121561201357600080fd5b61201b611a8d565b82518281111561202a57600080fd5b61203688828601611f6e565b825250838301518281111561204a57600080fd5b80840193505086601f84011261205f57600080fd5b8251915061206f611b8d83611f4a565b82815260059290921b8301840191848101908884111561208e57600080fd5b938501935b838510156120b3576120a485611dc7565b82529385019390850190612093565b948201949094529695505050505050565b6000604082840312156120d657600080fd5b6120de611a8d565b825181526120ee60208401611dc7565b60208201529392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612181577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b60006020828403121561219a57600080fd5b815167ffffffffffffffff8111156121b157600080fd5b610dcf84828501611f6e565b600085516121cf818460208a01611bc5565b60e095861b9201918252509190921b6004820152600881019190915260280191905056fea26469706673582212207ce2706b67d045717aba8ecdff98301dd128a9d11db47e6d380f641c8e7e9b2964736f6c63430008130033";

type BuildPathSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BuildPathSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BuildPathSystem__factory extends ContractFactory {
  constructor(...args: BuildPathSystemConstructorParams) {
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
  ): Promise<BuildPathSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<BuildPathSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): BuildPathSystem {
    return super.attach(address) as BuildPathSystem;
  }
  override connect(signer: Signer): BuildPathSystem__factory {
    return super.connect(signer) as BuildPathSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BuildPathSystemInterface {
    return new utils.Interface(_abi) as BuildPathSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BuildPathSystem {
    return new Contract(address, _abi, signerOrProvider) as BuildPathSystem;
  }
}
