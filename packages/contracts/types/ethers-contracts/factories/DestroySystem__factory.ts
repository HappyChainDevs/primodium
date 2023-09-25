/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { DestroySystem, DestroySystemInterface } from "../DestroySystem";

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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200324b3803806200324b8339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b612ff580620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780634f2870da1461007a5780638da5cb5b1461008d578063f2fde38b146100ad575b600080fd5b61006461005f366004612a2f565b6100c2565b6040516100719190612ad3565b60405180910390f35b610064610088366004612b15565b611568565b6100956115bf565b6040516001600160a01b039091168152602001610071565b6100c06100bb366004612b77565b6115f7565b005b60606000828060200190518101906100da9190612b94565b905060006101077f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c561164d565b905060006101347faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c754061164d565b905060006101617ff0cb43e036bae834910fad0a5f691ed43d8c3edb41f55275901bc5d576f8f49161164d565b600080549192509061019c906001600160a01b03167fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e611660565b905060006101a986611742565b90506000336040516307fa648b60e11b8152600481018490529091506000906001600160a01b03881690630ff4c91690602401602060405180830381865afa1580156101f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021d9190612be1565b905061022883611891565b61032d5760405162461bcd60e51b81526020600482015260b260248201527f5b44657374726f7953797374656d5d2063616e206e6f7420646573746f72792060448201527f5574696c697479207265736f757263652070726f64756374696f6e206275696c60648201527f64696e6720696620726571756972656d656e747320617265206e6f74206d657460848201527f2c2064657374726f79205574696c697479207265736f7572636520636f6e737560a48201527f6d657273206669727374206f7220696e637265617365205574696c697479207260c48201527132b9b7bab931b290383937b23ab1ba34b7b760711b60e4820152610104015b60405180910390fd5b6040516307fa648b60e11b81526004810184905282906001600160a01b03881690630ff4c91690602401602060405180830381865afa158015610374573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103989190612be1565b146103f95760405162461bcd60e51b815260206004820152602b60248201527f5b44657374726f795d203a206f6e6c79206f776e65722063616e20646573747260448201526a6f79206275696c64696e6760a81b6064820152608401610324565b6001546040516307fa648b60e11b815260048101859052610477916001600160a01b03908116918591859190891690630ff4c91690602401602060405180830381865afa15801561044e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104729190612c13565b611b66565b6104ff5760405162461bcd60e51b815260206004820152604d60248201527f5b44657374726f7953797374656d5d2063616e206e6f742064657374726f792060448201527f6275696c64696e6720696620697420726573756c747320696e206e656761746960648201526c3b3290383937b23ab1ba34b7b760991b608482015260a401610324565b6040516307fa648b60e11b8152600481018490526000906001600160a01b03871690630ff4c91690602401600060405180830381865afa158015610547573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261056f9190810190612cb8565b604051634cc8221560e01b8152600481018690529091506001600160a01b03871690634cc8221590602401600060405180830381600087803b1580156105b457600080fd5b505af11580156105c8573d6000803e3d6000fd5b5050505060005b815181101561060d576105fb888383815181106105ee576105ee612ced565b6020026020010151611dbe565b8061060581612d19565b9150506105cf565b50604051634cc8221560e01b8152600481018590526001600160a01b03871690634cc8221590602401600060405180830381600087803b15801561065057600080fd5b505af1158015610664573d6000803e3d6000fd5b5050505060006106e883876001600160a01b0316630ff4c916886040518263ffffffff1660e01b815260040161069c91815260200190565b602060405180830381865afa1580156106b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106dd9190612c13565b63ffffffff16611eeb565b6001546040516307fa648b60e11b81526004810188905291925061076a916001600160a01b0391821691879187918b1690630ff4c91690602401602060405180830381865afa15801561073f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107639190612c13565b6000611f22565b6000546107a0906001600160a01b03167f2444db3b2cf5ba1059ebafe0212ddf405afa28d4ca9f16e72b56afe6e5f673c8611660565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b81526004016107cd91815260200190565b602060405180830381865afa1580156107ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080e9190612d32565b1561092157600154604080516306ac999760e11b815290516108a8926001600160a01b031691630d59332e9160048083019260209291908290030181865afa15801561085e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108829190612d54565b7f99825e92fefa8d02b75d4a96d0a395986be32968d8e664ccf86fe82a1a6314b7611660565b6001600160a01b03166327b45099338760026040518463ffffffff1660e01b81526004016108d893929190612d71565b6000604051808303816000875af11580156108f7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261091f9190810190612db4565b505b7f2e6aeb9730616b6b2a8fcc7abab3fc9310bd984b40af25951e4bdc63a056b92d83016109d25760006109737f84dcd47dfd0ba519a03bd44d032054d6f29f79700587b112a577b94d6440fa6661164d565b604051634cc8221560e01b8152600481018790529091506001600160a01b03821690634cc8221590602401600060405180830381600087803b1580156109b857600080fd5b505af11580156109cc573d6000803e3d6000fd5b50505050505b6109fb7fd984664f54fc6fda5470509ef9c0e55b1727f163cfff0999a19085f3302d89f361164d565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b8152600401610a2891815260200190565b602060405180830381865afa158015610a45573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a699190612d32565b15610b7c57600154604080516306ac999760e11b81529051610b03926001600160a01b031691630d59332e9160048083019260209291908290030181865afa158015610ab9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610add9190612d54565b7f690f759f3a1f00ae23e931e20f0dd3a4c4600194af4ab836b252764cb88421ee611660565b6001600160a01b03166327b45099338760026040518463ffffffff1660e01b8152600401610b3393929190612d71565b6000604051808303816000875af1158015610b52573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610b7a9190810190612db4565b505b610ba57f391ed979ad48ef48aa0e385aaffe280328c830054d2153bba1cf3da0b7bf45ab61164d565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b8152600401610bd291815260200190565b602060405180830381865afa158015610bef573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c139190612d32565b15610d2657600154604080516306ac999760e11b81529051610cad926001600160a01b031691630d59332e9160048083019260209291908290030181865afa158015610c63573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c879190612d54565b7f3b853fcf76b99875472d129abafa9494b9cc622934bd81349a2d0a8c03069f29611660565b6001600160a01b03166327b45099338760026040518463ffffffff1660e01b8152600401610cdd93929190612d71565b6000604051808303816000875af1158015610cfc573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610d249190810190612db4565b505b610d4f7f72887d78bbad0f2696fb431d6367da7b429df07154724db7df055e27fb64080f61164d565b6001600160a01b031663cccf7a8e610d68856001611eeb565b6040518263ffffffff1660e01b8152600401610d8691815260200190565b602060405180830381865afa158015610da3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dc79190612d32565b15610eda57600154604080516306ac999760e11b81529051610e61926001600160a01b031691630d59332e9160048083019260209291908290030181865afa158015610e17573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3b9190612d54565b7faa8242bee50b0300451ea2c344f4e688de8f3fd6285f41dc966a799512ca9eb0611660565b6001600160a01b03166327b45099338760026040518463ffffffff1660e01b8152600401610e9193929190612d71565b6000604051808303816000875af1158015610eb0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610ed89190810190612db4565b505b610f037f3ed7887def160de572ade02c8436bfc219b818bf6aebb6881c66cc27bda2b5bf61164d565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b8152600401610f3091815260200190565b602060405180830381865afa158015610f4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f719190612d32565b15610fff57610f9f7f9de349a5ebb25e4948f087042ac901652bc7ca239eacb04610389265e211e52761164d565b6001600160a01b0316634cc82215866040518263ffffffff1660e01b8152600401610fcc91815260200190565b600060405180830381600087803b158015610fe657600080fd5b505af1158015610ffa573d6000803e3d6000fd5b505050505b6001546040516309e4fb4360e31b81527fc98dece22d4fc1ab6208787b4976aedbfdeba9a3aeb560f6bb84a9204edb172b60048201526001600160a01b0390911690634f27da1890602401602060405180830381865afa158015611067573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061108b9190612d54565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b81526004016110b891815260200190565b602060405180830381865afa1580156110d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110f99190612d32565b15611295576001546040516309e4fb4360e31b81527fc98dece22d4fc1ab6208787b4976aedbfdeba9a3aeb560f6bb84a9204edb172b60048201526000916001600160a01b031690634f27da1890602401602060405180830381865afa158015611167573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061118b9190612d54565b6001600160a01b0316630ff4c916836040518263ffffffff1660e01b81526004016111b891815260200190565b602060405180830381865afa1580156111d5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111f99190612c13565b6001546040516309e4fb4360e31b81527f7651874c1aa517de3f92126b41a38b36bad6f30fe5bbff80095c761374b273036004820152919250611293916001600160a01b0390911690634f27da1890602401602060405180830381865afa158015611268573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061128c9190612d54565b86836125b8565b505b604051634cc8221560e01b8152600481018690526001600160a01b03871690634cc8221590602401600060405180830381600087803b1580156112d757600080fd5b505af11580156112eb573d6000803e3d6000fd5b5050604051634cc8221560e01b8152600481018890526001600160a01b038c169250634cc822159150602401600060405180830381600087803b15801561133157600080fd5b505af1158015611345573d6000803e3d6000fd5b5050604051634cc8221560e01b8152600481018890526001600160a01b038b169250634cc822159150602401600060405180830381600087803b15801561138b57600080fd5b505af115801561139f573d6000803e3d6000fd5b5050604051634cc8221560e01b8152600481018890526001600160a01b038a169250634cc822159150602401600060405180830381600087803b1580156113e557600080fd5b505af11580156113f9573d6000803e3d6000fd5b505050506114297f49a4584d9706380e35459e1f31e673445371b5bac20aa516f8ba8650b184310660001c61164d565b6001600160a01b0316634cc82215866040518263ffffffff1660e01b815260040161145691815260200190565b600060405180830381600087803b15801561147057600080fd5b505af1158015611484573d6000803e3d6000fd5b5050505061153c61152b600160009054906101000a90046001600160a01b03166001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156114e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115059190612d54565b7f5526f91117fcbeb07c3b12b6023fc0c3d82ba570ebda32c27c5003d46b75abec611660565b6115358587611eeb565b60016125b8565b6040805160208101879052016040516020818303038152906040529a5050505050505050505050919050565b60606115b9826040516020016115a591906000606082019050825160030b8252602083015160030b60208301526040830151604083015292915050565b6040516020818303038152906040526100c2565b92915050565b60006115f27f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b0316331461164157604051632f7a8ee160e01b815260040160405180910390fd5b61164a8161269e565b50565b600080546115b9906001600160a01b0316835b604051637defd0f560e11b81526004810182905260009081906001600160a01b0385169063fbdfa1ea90602401600060405180830381865afa1580156116aa573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526116d29190810190612cb8565b905080516000036117195760405162461bcd60e51b81526020600482015260116024820152701a59081b9bdd081c9959da5cdd195c9959607a1b6044820152606401610324565b61173a8160008151811061172f5761172f612ced565b602002602001015190565b949350505050565b60008054819061177b906001600160a01b03167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c7540611660565b905060006117ae6040518060400160405280600d81526020016c6275696c64696e672e74696c6560981b815250856126a7565b604051636667bd4760e11b8152600481018290529091506001600160a01b0383169063cccf7a8e90602401602060405180830381865afa1580156117f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061181a9190612d32565b611828575060009392505050565b6040516307fa648b60e11b8152600481018290526001600160a01b03831690630ff4c91690602401602060405180830381865afa15801561186d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061173a9190612be1565b6000805481906118ca906001600160a01b03167fd984664f54fc6fda5470509ef9c0e55b1727f163cfff0999a19085f3302d89f3611660565b6000805491925090611905906001600160a01b03167f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c5611660565b6000805491925090611940906001600160a01b03167fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e611660565b905060006119e3836001600160a01b0316630ff4c916886040518263ffffffff1660e01b815260040161197591815260200190565b602060405180830381865afa158015611992573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119b69190612be1565b6040516307fa648b60e11b8152600481018990526001600160a01b03851690630ff4c9169060240161069c565b604051636667bd4760e11b8152600481018290529091506001600160a01b0385169063cccf7a8e90602401602060405180830381865afa158015611a2b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a4f9190612d32565b15611b5a576040516307fa648b60e11b8152600481018290526001600160a01b03851690630ff4c916906024016040805180830381865afa158015611a98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611abc9190612e22565b6020015160015463ffffffff90911690611b48906001600160a01b0316336040516307fa648b60e11b8152600481018690526001600160a01b03891690630ff4c916906024016040805180830381865afa158015611b1e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b429190612e22565b516126cc565b63ffffffff1610159695505050505050565b50600195945050505050565b6040516309e4fb4360e31b81527f2444db3b2cf5ba1059ebafe0212ddf405afa28d4ca9f16e72b56afe6e5f673c8600482015260009081906001600160a01b03871690634f27da1890602401602060405180830381865afa158015611bcf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bf39190612d54565b6040516309e4fb4360e31b81527f222d9674c2fee077bc82c84232803a9168906e2be25c4560d094c76895b8a43260048201529091506000906001600160a01b03881690634f27da1890602401602060405180830381865afa158015611c5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c819190612d54565b90506000611c95868663ffffffff16611eeb565b604051636667bd4760e11b8152600481018290529091506001600160a01b0384169063cccf7a8e90602401602060405180830381865afa158015611cdd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d019190612d32565b611d11576001935050505061173a565b6040516307fa648b60e11b81526004810182905260009081906001600160a01b03861690630ff4c916906024016040805180830381865afa158015611d5a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d7e9190612e22565b90506000611d9082600001518b611eeb565b9050816020015163ffffffff16611da78683612813565b63ffffffff1610159b9a5050505050505050505050565b604051636667bd4760e11b8152600481018290526001600160a01b0383169063cccf7a8e90602401602060405180830381865afa158015611e03573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e279190612d32565b611e8d5760405162461bcd60e51b815260206004820152603160248201527f5b44657374726f7953797374656d5d2043616e6e6f742064657374726f7920756044820152706e6f776e656420636f6f7264696e61746560781b6064820152608401610324565b604051634cc8221560e01b8152600481018290526001600160a01b03831690634cc8221590602401600060405180830381600087803b158015611ecf57600080fd5b505af1158015611ee3573d6000803e3d6000fd5b505050505050565b60408051602081018490529081018290526000906060015b60408051601f1981840301815291905280516020909101209392505050565b6040516309e4fb4360e31b81527fa9030fd5d2d8df4ef9e9a591c66869629e3031bc7112e7766b55d9f29321005d60048201526000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015611f89573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fad9190612d54565b90506000611fc1858563ffffffff16611eeb565b604051636667bd4760e11b8152600481018290529091506001600160a01b0383169063cccf7a8e90602401602060405180830381865afa158015612009573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061202d9190612d32565b6120385750506125b1565b6040516307fa648b60e11b8152600481018290526000906001600160a01b03841690630ff4c91690602401600060405180830381865afa158015612080573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526120a89190810190612e58565b90506120c7604051806040016040528060608152602001606081525090565b60008580156120dc575060018763ffffffff16115b15612163576120f0886106dd60018a612f48565b6040516307fa648b60e11b8152600481018290529091506001600160a01b03861690630ff4c91690602401600060405180830381865afa158015612138573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526121609190810190612e58565b91505b6040516309e4fb4360e31b81527f222d9674c2fee077bc82c84232803a9168906e2be25c4560d094c76895b8a43260048201526000906001600160a01b038c1690634f27da1890602401602060405180830381865afa1580156121ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121ee9190612d54565b905060005b8451518110156125a95760006122268660000151838151811061221857612218612ced565b60200260200101518d611eeb565b905060008660200151838151811061224057612240612ced565b6020026020010151905089801561225d575060018b63ffffffff16115b1561228e578560200151838151811061227857612278612ced565b60200260200101518161228b9190612f48565b90505b8063ffffffff166000036122a3575050612597565b61232e8e6001600160a01b0316630d59332e6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156122e4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123089190612d54565b7fbfa4e94ac46519bd16654700fe5605b990ceb82f41218bfba1018857ba5e01c0611660565b6001600160a01b0316636ad0ccab8e895180518790811061235157612351612ced565b60200260200101516040518363ffffffff1660e01b815260040161238a9291906001600160a01b03929092168252602082015260400190565b6000604051808303816000875af11580156123a9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526123d19190810190612db4565b5089156124b8576040516307fa648b60e11b8152600481018390526001600160a01b0385169063d923c3c490849084908490630ff4c91690602401602060405180830381865afa158015612429573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061244d9190612c13565b6124579190612f48565b6040516001600160e01b031960e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b15801561249b57600080fd5b505af11580156124af573d6000803e3d6000fd5b50505050612594565b6040516307fa648b60e11b8152600481018390526001600160a01b0385169063d923c3c490849084908490630ff4c91690602401602060405180830381865afa158015612509573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061252d9190612c13565b6125379190612f6c565b6040516001600160e01b031960e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b15801561257b57600080fd5b505af115801561258f573d6000803e3d6000fd5b505050505b50505b806125a181612d19565b9150506121f3565b505050505050505b5050505050565b60006125c48484612813565b90508163ffffffff168163ffffffff1610156126225760405162461bcd60e51b815260206004820152601c60248201527f6e6f7420656e6f7567682076616c756520746f207375627472616374000000006044820152606401610324565b6001600160a01b03841663d923c3c48461263c8585612f48565b6040516001600160e01b031960e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b15801561268057600080fd5b505af1158015612694573d6000803e3d6000fd5b5050505050505050565b61164a816128fa565b600082826000015183602001518460400151604051602001611f039493929190612f89565b6000806126d98385611eeb565b6040516309e4fb4360e31b81527f4f2e352c22f4d6e8661eee4a98890fa6dfead6e74bc680ee4c52da1cc198d7c9600482015290915061276e906001600160a01b03871690634f27da1890602401602060405180830381865afa158015612744573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127689190612d54565b82612813565b6040516309e4fb4360e31b81527fe3a8010d924b064ccb2378dcbee6dbdeb5bbd9716eb2cffb16c3df92a53e84956004820152612800906001600160a01b03881690634f27da1890602401602060405180830381865afa1580156127d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127fa9190612d54565b83612813565b61280a9190612f48565b95945050505050565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa15801561285b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061287f9190612d32565b61288a5760006128f3565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa1580156128cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128f39190612c13565b9392505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b634e487b7160e01b600052604160045260246000fd5b6040516060810167ffffffffffffffff811182821017156129ad576129ad612974565b60405290565b6040805190810167ffffffffffffffff811182821017156129ad576129ad612974565b604051601f8201601f1916810167ffffffffffffffff811182821017156129ff576129ff612974565b604052919050565b600067ffffffffffffffff821115612a2157612a21612974565b50601f01601f191660200190565b600060208284031215612a4157600080fd5b813567ffffffffffffffff811115612a5857600080fd5b8201601f81018413612a6957600080fd5b8035612a7c612a7782612a07565b6129d6565b818152856020838501011115612a9157600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b83811015612aca578181015183820152602001612ab2565b50506000910152565b6020815260008251806020840152612af2816040850160208701612aaf565b601f01601f19169190910160400192915050565b8060030b811461164a57600080fd5b600060608284031215612b2757600080fd5b612b2f61298a565b8235612b3a81612b06565b81526020830135612b4a81612b06565b60208201526040928301359281019290925250919050565b6001600160a01b038116811461164a57600080fd5b600060208284031215612b8957600080fd5b81356128f381612b62565b600060608284031215612ba657600080fd5b612bae61298a565b8251612bb981612b06565b81526020830151612bc981612b06565b60208201526040928301519281019290925250919050565b600060208284031215612bf357600080fd5b5051919050565b805163ffffffff81168114612c0e57600080fd5b919050565b600060208284031215612c2557600080fd5b6128f382612bfa565b600067ffffffffffffffff821115612c4857612c48612974565b5060051b60200190565b600082601f830112612c6357600080fd5b81516020612c73612a7783612c2e565b82815260059290921b84018101918181019086841115612c9257600080fd5b8286015b84811015612cad5780518352918301918301612c96565b509695505050505050565b600060208284031215612cca57600080fd5b815167ffffffffffffffff811115612ce157600080fd5b61173a84828501612c52565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201612d2b57612d2b612d03565b5060010190565b600060208284031215612d4457600080fd5b815180151581146128f357600080fd5b600060208284031215612d6657600080fd5b81516128f381612b62565b6001600160a01b0384168152602081018390526060810160038310612da657634e487b7160e01b600052602160045260246000fd5b826040830152949350505050565b600060208284031215612dc657600080fd5b815167ffffffffffffffff811115612ddd57600080fd5b8201601f81018413612dee57600080fd5b8051612dfc612a7782612a07565b818152856020838501011115612e1157600080fd5b61280a826020830160208601612aaf565b600060408284031215612e3457600080fd5b612e3c6129b3565b82518152612e4c60208401612bfa565b60208201529392505050565b60006020808385031215612e6b57600080fd5b825167ffffffffffffffff80821115612e8357600080fd5b9084019060408287031215612e9757600080fd5b612e9f6129b3565b825182811115612eae57600080fd5b612eba88828601612c52565b8252508383015182811115612ece57600080fd5b80840193505086601f840112612ee357600080fd5b82519150612ef3612a7783612c2e565b82815260059290921b83018401918481019088841115612f1257600080fd5b938501935b83851015612f3757612f2885612bfa565b82529385019390850190612f17565b948201949094529695505050505050565b63ffffffff828116828216039080821115612f6557612f65612d03565b5092915050565b63ffffffff818116838216019080821115612f6557612f65612d03565b60008551612f9b818460208a01612aaf565b60e095861b9201918252509190921b6004820152600881019190915260280191905056fea2646970667358221220126edb95b67628f9cc6d43cecca8b51741103002c0c2300412d00a282a60e4fd64736f6c63430008130033";

type DestroySystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DestroySystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DestroySystem__factory extends ContractFactory {
  constructor(...args: DestroySystemConstructorParams) {
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
  ): Promise<DestroySystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<DestroySystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): DestroySystem {
    return super.attach(address) as DestroySystem;
  }
  override connect(signer: Signer): DestroySystem__factory {
    return super.connect(signer) as DestroySystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DestroySystemInterface {
    return new utils.Interface(_abi) as DestroySystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DestroySystem {
    return new Contract(address, _abi, signerOrProvider) as DestroySystem;
  }
}
