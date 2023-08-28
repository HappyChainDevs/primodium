/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  UpgradeBuildingSystem,
  UpgradeBuildingSystemInterface,
} from "../UpgradeBuildingSystem";

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
  "0x60806040523480156200001157600080fd5b50604051620031f4380380620031f48339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b612f9e80620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780634f2870da1461007a5780638da5cb5b1461008d578063f2fde38b146100ad575b600080fd5b61006461005f3660046129b3565b6100c2565b6040516100719190612a57565b60405180910390f35b610064610088366004612a99565b611778565b6100956117cf565b6040516001600160a01b039091168152602001610071565b6100c06100bb366004612afb565b611807565b005b60606000828060200190518101906100da9190612b18565b6000805491925090610115906001600160a01b03167f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c561185d565b6000805491925090610150906001600160a01b03167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c754061185d565b600080549192509061018b906001600160a01b03167fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e61185d565b60008054919250906101c6906001600160a01b03167f4b4a810b1b9d1e9cbc5e2151ce528a36f909ea687f49c43c49a9fbc92c84351761185d565b905060006101d38661193f565b9050806000036102495760405162461bcd60e51b815260206004820152603660248201527f5b557067726164654275696c64696e6753797374656d5d206e6f206275696c64604482015275696e67206174207468697320636f6f7264696e61746560501b60648201526084015b60405180910390fd5b604051636667bd4760e11b8152600481018290526001600160a01b0384169063cccf7a8e90602401602060405180830381865afa15801561028e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102b29190612b65565b61030a5760405162461bcd60e51b81526020600482015260356024820152600080516020612f498339815191526044820152747067726164652061206e6f6e2d6275696c64696e6760581b6064820152608401610240565b6000336040516307fa648b60e11b81526004810184905290915081906001600160a01b03871690630ff4c91690602401602060405180830381865afa158015610357573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061037b9190612b87565b146103ef5760405162461bcd60e51b815260206004820152604a6024820152600080516020612f4983398151915260448201527f7067726164652061206275696c64696e672074686174206973206e6f74206f776064820152696e656420627920796f7560b01b608482015260a401610240565b6040516307fa648b60e11b8152600481018390526000906001600160a01b03881690630ff4c91690602401602060405180830381865afa158015610437573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061045b9190612b87565b604051636667bd4760e11b8152600481018290529091506001600160a01b0385169063cccf7a8e90602401602060405180830381865afa1580156104a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c79190612b65565b80156105b457506040516307fa648b60e11b8152600481018290526001600160a01b03851690630ff4c91690602401602060405180830381865afa158015610513573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105379190612bb9565b63ffffffff16856001600160a01b0316630ff4c916856040518263ffffffff1660e01b815260040161056b91815260200190565b602060405180830381865afa158015610588573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ac9190612bb9565b63ffffffff16105b6106485760405162461bcd60e51b81526020600482015260656024820152600080516020612f4983398151915260448201527f706772616465206275696c64696e67207468617420646f6573206e6f7420686160648201527f7665206d6178206c6576656c206f72206861732072656163686564206d6178206084820152641b195d995b60da1b60a482015260c401610240565b60006106d382876001600160a01b0316630ff4c916876040518263ffffffff1660e01b815260040161067c91815260200190565b602060405180830381865afa158015610699573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106bd9190612bb9565b6106c8906001612bea565b63ffffffff16611a8e565b6001549091506106ed906001600160a01b03168285611ac5565b6107735760405162461bcd60e51b815260206004820152605a6024820152600080516020612f4983398151915260448201527f7067726164652061206275696c64696e67207468617420646f6573206e6f742060648201527f6d65657420726573656172636820726571756972656d656e7473000000000000608482015260a401610240565b60015461078a906001600160a01b03168483611d4e565b6107f25760405162461bcd60e51b815260206004820152603360248201527f5b526573656172636853797374656d5d204d61696e42617365206c6576656c206044820152721c995c5d5a5c995b595b9d081b9bdd081b595d606a1b6064820152608401610240565b600054610828906001600160a01b03167ff5bd2f5cb6567cf0fa832e8e7971a94af009d0ec1e329976b883c7ab5048827861185d565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b815260040161085591815260200190565b602060405180830381865afa158015610872573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108969190612b65565b15610a3857600180546108b8916001600160a01b039091169085908490611eea565b61092a5760405162461bcd60e51b815260206004820152603e60248201527f5b557067726164654275696c64696e6753797374656d5d20596f7520646f206e60448201527f6f74206861766520746865207265717569726564207265736f757263657300006064820152608401610240565b600154604080516306ac999760e11b815290516109bf926001600160a01b031691630d59332e9160048083019260209291908290030181865afa158015610975573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109999190612c0e565b7f260bed7a4ae2c80f17d6f2234fcc01f312c59c50933985489f350f675fc3ed1461185d565b604051636ad0ccab60e01b8152336004820152602481018390526001600160a01b039190911690636ad0ccab906044016000604051808303816000875af1158015610a0e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610a369190810190612c2b565b505b6040516307fa648b60e11b8152600481018590526000906001600160a01b03881690630ff4c91690602401602060405180830381865afa158015610a80573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa49190612bb9565b610aaf906001612bea565b604051633648f0f160e21b81526004810187905263ffffffff821660248201529091506001600160a01b0388169063d923c3c490604401600060405180830381600087803b158015610b0057600080fd5b505af1158015610b14573d6000803e3d6000fd5b505050506000610b2a848363ffffffff16611a8e565b6001546040516309e4fb4360e31b81527fc98dece22d4fc1ab6208787b4976aedbfdeba9a3aeb560f6bb84a9204edb172b60048201529192506001600160a01b031690634f27da1890602401602060405180830381865afa158015610b93573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb79190612c0e565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b8152600401610be491815260200190565b602060405180830381865afa158015610c01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c259190612b65565b15610edf576001546040516309e4fb4360e31b81527fc98dece22d4fc1ab6208787b4976aedbfdeba9a3aeb560f6bb84a9204edb172b60048201526000916001600160a01b031690634f27da1890602401602060405180830381865afa158015610c93573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cb79190612c0e565b6001600160a01b0316630ff4c916836040518263ffffffff1660e01b8152600401610ce491815260200190565b602060405180830381865afa158015610d01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d259190612bb9565b90506000610d38866106c8600187612c99565b6001546040516309e4fb4360e31b81527fc98dece22d4fc1ab6208787b4976aedbfdeba9a3aeb560f6bb84a9204edb172b60048201529192506000916001600160a01b0390911690634f27da1890602401602060405180830381865afa158015610da6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dca9190612c0e565b6001600160a01b0316630ff4c916836040518263ffffffff1660e01b8152600401610df791815260200190565b602060405180830381865afa158015610e14573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e389190612bb9565b6001546040516309e4fb4360e31b81527f7651874c1aa517de3f92126b41a38b36bad6f30fe5bbff80095c761374b273036004820152919250610edb916001600160a01b0390911690634f27da1890602401602060405180830381865afa158015610ea7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ecb9190612c0e565b89610ed68487612c99565b61237a565b5050505b600054610f15906001600160a01b03167fa9030fd5d2d8df4ef9e9a591c66869629e3031bc7112e7766b55d9f29321005d61185d565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b8152600401610f4291815260200190565b602060405180830381865afa158015610f5f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f839190612b65565b1561109657600154604080516306ac999760e11b8152905161101d926001600160a01b031691630d59332e9160048083019260209291908290030181865afa158015610fd3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ff79190612c0e565b7f660f6c71dbaa192b9bd9e00021efa67f00d608c104acfa0d0e42fa323f5f31e361185d565b6001600160a01b03166327b45099338860016040518463ffffffff1660e01b815260040161104d93929190612cb6565b6000604051808303816000875af115801561106c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526110949190810190612c2b565b505b6000546110cc906001600160a01b03167f2444db3b2cf5ba1059ebafe0212ddf405afa28d4ca9f16e72b56afe6e5f673c861185d565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b81526004016110f991815260200190565b602060405180830381865afa158015611116573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061113a9190612b65565b1561124d57600154604080516306ac999760e11b815290516111d4926001600160a01b031691630d59332e9160048083019260209291908290030181865afa15801561118a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111ae9190612c0e565b7ff2021642afaf65bb89c355c68b4a3fc6356dc9299686fc001113a2e2b7b600a361185d565b6001600160a01b03166327b45099338860016040518463ffffffff1660e01b815260040161120493929190612cb6565b6000604051808303816000875af1158015611223573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261124b9190810190612c2b565b505b6112767f72887d78bbad0f2696fb431d6367da7b429df07154724db7df055e27fb64080f612404565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b81526004016112a391815260200190565b602060405180830381865afa1580156112c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112e49190612b65565b156113f757600154604080516306ac999760e11b8152905161137e926001600160a01b031691630d59332e9160048083019260209291908290030181865afa158015611334573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113589190612c0e565b7faa8242bee50b0300451ea2c344f4e688de8f3fd6285f41dc966a799512ca9eb061185d565b6001600160a01b03166327b45099338860016040518463ffffffff1660e01b81526004016113ae93929190612cb6565b6000604051808303816000875af11580156113cd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526113f59190810190612c2b565b505b6114207fd984664f54fc6fda5470509ef9c0e55b1727f163cfff0999a19085f3302d89f3612404565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b815260040161144d91815260200190565b602060405180830381865afa15801561146a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061148e9190612b65565b156115a157600154604080516306ac999760e11b81529051611528926001600160a01b031691630d59332e9160048083019260209291908290030181865afa1580156114de573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115029190612c0e565b7f690f759f3a1f00ae23e931e20f0dd3a4c4600194af4ab836b252764cb88421ee61185d565b6001600160a01b03166327b45099338860016040518463ffffffff1660e01b815260040161155893929190612cb6565b6000604051808303816000875af1158015611577573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261159f9190810190612c2b565b505b6115ca7f391ed979ad48ef48aa0e385aaffe280328c830054d2153bba1cf3da0b7bf45ab612404565b6001600160a01b031663cccf7a8e826040518263ffffffff1660e01b81526004016115f791815260200190565b602060405180830381865afa158015611614573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116389190612b65565b1561174b57600154604080516306ac999760e11b815290516116d2926001600160a01b031691630d59332e9160048083019260209291908290030181865afa158015611688573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116ac9190612c0e565b7f3b853fcf76b99875472d129abafa9494b9cc622934bd81349a2d0a8c03069f2961185d565b6001600160a01b03166327b45099338860016040518463ffffffff1660e01b815260040161170293929190612cb6565b6000604051808303816000875af1158015611721573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526117499190810190612c2b565b505b6040805160208101889052016040516020818303038152906040529b505050505050505050505050919050565b60606117c9826040516020016117b591906000606082019050825160030b8252602083015160030b60208301526040830151604083015292915050565b6040516020818303038152906040526100c2565b92915050565b60006118027f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b0316331461185157604051632f7a8ee160e01b815260040160405180910390fd5b61185a8161241b565b50565b604051637defd0f560e11b81526004810182905260009081906001600160a01b0385169063fbdfa1ea90602401600060405180830381865afa1580156118a7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526118cf9190810190612d83565b905080516000036119165760405162461bcd60e51b81526020600482015260116024820152701a59081b9bdd081c9959da5cdd195c9959607a1b6044820152606401610240565b6119378160008151811061192c5761192c612db8565b602002602001015190565b949350505050565b600080548190611978906001600160a01b03167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c754061185d565b905060006119ab6040518060400160405280600d81526020016c6275696c64696e672e74696c6560981b81525085612424565b604051636667bd4760e11b8152600481018290529091506001600160a01b0383169063cccf7a8e90602401602060405180830381865afa1580156119f3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a179190612b65565b611a25575060009392505050565b6040516307fa648b60e11b8152600481018290526001600160a01b03831690630ff4c91690602401602060405180830381865afa158015611a6a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119379190612b87565b60408051602081018490529081018290526000906060015b60408051601f1981840301815291905280516020909101209392505050565b600080611b53856001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b09573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b2d9190612c0e565b7fde1c65b05c7ffe64309a45c5521210871b3b7dda339e8e2921d5bea2543e2ef861185d565b604051636667bd4760e11b8152600481018690529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa158015611b9b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bbf9190612b65565b611bcd576001915050611d47565b6000611c5a866001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa158015611c10573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c349190612c0e565b7fcac70f64f2c43ee6b17f4ff03bae772a913c7198090af99d8b3ebb1c25a8641e61185d565b9050806001600160a01b031663cccf7a8e611ce3846001600160a01b0316630ff4c916896040518263ffffffff1660e01b8152600401611c9c91815260200190565b602060405180830381865afa158015611cb9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cdd9190612b87565b87611a8e565b6040518263ffffffff1660e01b8152600401611d0191815260200190565b602060405180830381865afa158015611d1e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d429190612b65565b925050505b9392505050565b600080611ddc856001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d92573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611db69190612c0e565b7fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e61185d565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa158015611e24573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e489190612b65565b611e56576001915050611d47565b6000611e628686612449565b63ffffffff169050816001600160a01b0316630ff4c916856040518263ffffffff1660e01b8152600401611e9891815260200190565b602060405180830381865afa158015611eb5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ed99190612bb9565b63ffffffff16111595945050505050565b6040516309e4fb4360e31b81527ff5bd2f5cb6567cf0fa832e8e7971a94af009d0ec1e329976b883c7ab50488278600482015260009081906001600160a01b03871690634f27da1890602401602060405180830381865afa158015611f53573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f779190612c0e565b6040516309e4fb4360e31b81527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f151064084560048201529091506000906001600160a01b03881690634f27da1890602401602060405180830381865afa158015611fe1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120059190612c0e565b604051636667bd4760e11b8152600481018790529091506001600160a01b0383169063cccf7a8e90602401602060405180830381865afa15801561204d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120719190612b65565b61208057600192505050611937565b6040516309e4fb4360e31b81527f222d9674c2fee077bc82c84232803a9168906e2be25c4560d094c76895b8a43260048201526000906001600160a01b03891690634f27da1890602401602060405180830381865afa1580156120e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061210b9190612c0e565b6040516309e4fb4360e31b81527fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e60048201529091506000906001600160a01b038a1690634f27da1890602401602060405180830381865afa158015612175573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121999190612c0e565b6040516307fa648b60e11b8152600481018990529091506000906001600160a01b03861690630ff4c91690602401600060405180830381865afa1580156121e4573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261220c9190810190612dce565b905060005b815151811015612369576000888360200151838151811061223457612234612db8565b60200260200101516122469190612ebe565b905060006122718460000151848151811061226357612263612db8565b60200260200101518d611a8e565b9050600061227f88836126be565b9050600061228d88846126be565b63ffffffff16111561232d576122a3868361279e565b6122ad9043612ee6565b6040516307fa648b60e11b8152600481018490526001600160a01b03891690630ff4c91690602401602060405180830381865afa1580156122f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123169190612bb9565b6123209190612ebe565b61232a9082612bea565b90505b8063ffffffff168363ffffffff1611156123535760009950505050505050505050611937565b505050808061236190612ef9565b915050612211565b5060019a9950505050505050505050565b600061238684846126be565b90506001600160a01b03841663d923c3c4846123a28585612bea565b6040516001600160e01b031960e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b1580156123e657600080fd5b505af11580156123fa573d6000803e3d6000fd5b5050505050505050565b600080546117c9906001600160a01b03168361185d565b61185a8161287e565b600082826000015183602001518460400151604051602001611aa69493929190612f12565b6040516309e4fb4360e31b81527f84dcd47dfd0ba519a03bd44d032054d6f29f79700587b112a577b94d6440fa66600482015260009081906001600160a01b03851690634f27da1890602401602060405180830381865afa1580156124b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124d69190612c0e565b604051636667bd4760e11b8152600481018590529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa15801561251e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125429190612b65565b6125505760009150506117c9565b6040516307fa648b60e11b8152600481018490526000906001600160a01b03831690630ff4c91690602401602060405180830381865afa158015612598573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125bc9190612b87565b6040516309e4fb4360e31b81527fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e60048201529091506001600160a01b03861690634f27da1890602401602060405180830381865afa158015612623573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126479190612c0e565b6001600160a01b0316630ff4c916826040518263ffffffff1660e01b815260040161267491815260200190565b602060405180830381865afa158015612691573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126b59190612bb9565b95945050505050565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa158015612706573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061272a9190612b65565b612735576000611d47565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa15801561277a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d479190612bb9565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa1580156127e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061280a9190612b65565b612815576000611d47565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa15801561285a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d479190612b87565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b634e487b7160e01b600052604160045260246000fd5b6040516060810167ffffffffffffffff81118282101715612931576129316128f8565b60405290565b6040805190810167ffffffffffffffff81118282101715612931576129316128f8565b604051601f8201601f1916810167ffffffffffffffff81118282101715612983576129836128f8565b604052919050565b600067ffffffffffffffff8211156129a5576129a56128f8565b50601f01601f191660200190565b6000602082840312156129c557600080fd5b813567ffffffffffffffff8111156129dc57600080fd5b8201601f810184136129ed57600080fd5b8035612a006129fb8261298b565b61295a565b818152856020838501011115612a1557600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b83811015612a4e578181015183820152602001612a36565b50506000910152565b6020815260008251806020840152612a76816040850160208701612a33565b601f01601f19169190910160400192915050565b8060030b811461185a57600080fd5b600060608284031215612aab57600080fd5b612ab361290e565b8235612abe81612a8a565b81526020830135612ace81612a8a565b60208201526040928301359281019290925250919050565b6001600160a01b038116811461185a57600080fd5b600060208284031215612b0d57600080fd5b8135611d4781612ae6565b600060608284031215612b2a57600080fd5b612b3261290e565b8251612b3d81612a8a565b81526020830151612b4d81612a8a565b60208201526040928301519281019290925250919050565b600060208284031215612b7757600080fd5b81518015158114611d4757600080fd5b600060208284031215612b9957600080fd5b5051919050565b805163ffffffff81168114612bb457600080fd5b919050565b600060208284031215612bcb57600080fd5b611d4782612ba0565b634e487b7160e01b600052601160045260246000fd5b63ffffffff818116838216019080821115612c0757612c07612bd4565b5092915050565b600060208284031215612c2057600080fd5b8151611d4781612ae6565b600060208284031215612c3d57600080fd5b815167ffffffffffffffff811115612c5457600080fd5b8201601f81018413612c6557600080fd5b8051612c736129fb8261298b565b818152856020838501011115612c8857600080fd5b6126b5826020830160208601612a33565b63ffffffff828116828216039080821115612c0757612c07612bd4565b6001600160a01b0384168152602081018390526060810160038310612ceb57634e487b7160e01b600052602160045260246000fd5b826040830152949350505050565b600067ffffffffffffffff821115612d1357612d136128f8565b5060051b60200190565b600082601f830112612d2e57600080fd5b81516020612d3e6129fb83612cf9565b82815260059290921b84018101918181019086841115612d5d57600080fd5b8286015b84811015612d785780518352918301918301612d61565b509695505050505050565b600060208284031215612d9557600080fd5b815167ffffffffffffffff811115612dac57600080fd5b61193784828501612d1d565b634e487b7160e01b600052603260045260246000fd5b60006020808385031215612de157600080fd5b825167ffffffffffffffff80821115612df957600080fd5b9084019060408287031215612e0d57600080fd5b612e15612937565b825182811115612e2457600080fd5b612e3088828601612d1d565b8252508383015182811115612e4457600080fd5b80840193505086601f840112612e5957600080fd5b82519150612e696129fb83612cf9565b82815260059290921b83018401918481019088841115612e8857600080fd5b938501935b83851015612ead57612e9e85612ba0565b82529385019390850190612e8d565b948201949094529695505050505050565b63ffffffff818116838216028082169190828114612ede57612ede612bd4565b505092915050565b818103818111156117c9576117c9612bd4565b600060018201612f0b57612f0b612bd4565b5060010190565b60008551612f24818460208a01612a33565b60e095861b9201918252509190921b6004820152600881019190915260280191905056fe5b557067726164654275696c64696e6753797374656d5d2043616e6e6f742075a2646970667358221220604d427e22c017fb023b77d9c9e304a9df954a513c5f908ce70938197c5bdecc64736f6c63430008130033";

type UpgradeBuildingSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UpgradeBuildingSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UpgradeBuildingSystem__factory extends ContractFactory {
  constructor(...args: UpgradeBuildingSystemConstructorParams) {
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
  ): Promise<UpgradeBuildingSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<UpgradeBuildingSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): UpgradeBuildingSystem {
    return super.attach(address) as UpgradeBuildingSystem;
  }
  override connect(signer: Signer): UpgradeBuildingSystem__factory {
    return super.connect(signer) as UpgradeBuildingSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UpgradeBuildingSystemInterface {
    return new utils.Interface(_abi) as UpgradeBuildingSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UpgradeBuildingSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as UpgradeBuildingSystem;
  }
}
