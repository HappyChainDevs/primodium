/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { CraftSystem, CraftSystemInterface } from "../CraftSystem";

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
        name: "arguments",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002fa738038062002fa783398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b62001fbf17901c565b5050505062000292565b600062000126620001ef60201b620020501760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b612d0580620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063cb6cbba7146100a7578063f2fde38b146100ba575b600080fd5b61006461005f36600461293e565b6100cf565b60405161007191906129f1565b60405180910390f35b610082611eb5565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b5366004612a6c565b611efa565b6100cd6100c8366004612aad565b611f43565b005b6040805160a08101909152600080546060929081906101249073ffffffffffffffffffffffffffffffffffffffff167f49a4584d9706380e35459e1f31e673445371b5bac20aa516f8ba8650b1843106612074565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161017291167f30f1c358b0a577824afcc8e464bcbd763eba254820a547b425765e75cc511f1e612074565b73ffffffffffffffffffffffffffffffffffffffff90811682526000546020909201916101c091167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c7540612074565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161020e91167fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e612074565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161025c91167f2fc9fa89c3e33fdaa5feead211018b3d0b1d3edd613228f7f320915fddd8d039612074565b73ffffffffffffffffffffffffffffffffffffffff16815250905060008380602001905181019061028d9190612ae3565b82516040517fbf3bf26a0000000000000000000000000000000000000000000000000000000081528251600390810b60048301526020840151900b602482015291925060009173ffffffffffffffffffffffffffffffffffffffff9091169063bf3bf26a90604401600060405180830381865afa158015610312573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526103589190810190612b18565b905080516001146103f0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f5b437261667453797374656d5d2043616e6e6f7420637261667420617420616e60448201527f20656d70747920636f6f7264696e61746500000000000000000000000000000060648201526084015b60405180910390fd5b6000836040015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168360008151811061042557610425612bbe565b60200260200101516040518263ffffffff1660e01b815260040161044b91815260200190565b602060405180830381865afa158015610468573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061048c9190612bed565b905033811461051d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603360248201527f5b437261667453797374656d5d2043616e6e6f7420637261667420617420612060448201527f74696c6520796f7520646f206e6f74206f776e0000000000000000000000000060648201526084016103e7565b61054584608001518360008151811061053857610538612bbe565b60200260200101516121c0565b6105d1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603560248201527f5b437261667453797374656d5d2043616e6e6f7420637261667420617420612060448201527f74696c652077697468207a65726f206865616c7468000000000000000000000060648201526084016103e7565b7f02fcfa4b1578384291174d276cbf45b9ac04481dd20e0e1051d17c6fa0028ce360001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168460008151811061062857610628612bbe565b60200260200101516040518263ffffffff1660e01b815260040161064e91815260200190565b602060405180830381865afa15801561066b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061068f9190612bed565b036107a057600080546106d79073ffffffffffffffffffffffffffffffffffffffff167eea6b38263d991f021369e569e8467f8f3cbea72100244a5f281e24bfda2951612074565b600080549192509061071f9073ffffffffffffffffffffffffffffffffffffffff167fd187a1eaa929b0d8165b8f2565cc53668be1bde9279a4ac3327487ad8d44b82e612074565b60008054919250906107679073ffffffffffffffffffffffffffffffffffffffff167f2b1b2c311687f6d088e6878d29798bd311968672098eb007336cfa1029c1c3da612074565b905060008560008151811061077e5761077e612bbe565b60200260200101519050610797848460018086866122f8565b50505050611e8f565b7f5e81ec12aa8c2bb4493ce21f35dff56bf746562d8ebf1185b42b173bc80bcace60001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106107f7576107f7612bbe565b60200260200101516040518263ffffffff1660e01b815260040161081d91815260200190565b602060405180830381865afa15801561083a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085e9190612bed565b0361092557600080546108a79073ffffffffffffffffffffffffffffffffffffffff167fd187a1eaa929b0d8165b8f2565cc53668be1bde9279a4ac3327487ad8d44b82e612074565b60008054919250906108ef9073ffffffffffffffffffffffffffffffffffffffff167f3ee5be4d005d8c712c96c9a76e0b5687b496c714ba631ab879a7fbce480d0301612074565b905060008460008151811061090657610906612bbe565b6020026020010151905061091d83600a8484612541565b505050611e8f565b7f9794860cce6121893962dba8949d43114cb9f47063158452a8495d9f41ac14fa60001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168460008151811061097c5761097c612bbe565b60200260200101516040518263ffffffff1660e01b81526004016109a291815260200190565b602060405180830381865afa1580156109bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e39190612bed565b03610aed5760008054610a2c9073ffffffffffffffffffffffffffffffffffffffff167fc09a315aaed23a54ab125610397c87d26431e118184b9c88f80b861921833df0612074565b6000805491925090610a749073ffffffffffffffffffffffffffffffffffffffff167fd187a1eaa929b0d8165b8f2565cc53668be1bde9279a4ac3327487ad8d44b82e612074565b6000805491925090610abc9073ffffffffffffffffffffffffffffffffffffffff167f63918f516a057e384eaf1858a0b60cb81d0c2696ec79602dda05ad1057c9562c612074565b9050600085600081518110610ad357610ad3612bbe565b6020026020010151905061079784846064601486866122f8565b7fca256d02eff068cb848bbd6ac96fb95b98adc5396d2d6e5f8c75e35cf2a11d3a60001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c91684600081518110610b4457610b44612bbe565b60200260200101516040518263ffffffff1660e01b8152600401610b6a91815260200190565b602060405180830381865afa158015610b87573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bab9190612bed565b03610cb55760008054610bf49073ffffffffffffffffffffffffffffffffffffffff167f63918f516a057e384eaf1858a0b60cb81d0c2696ec79602dda05ad1057c9562c612074565b6000805491925090610c3c9073ffffffffffffffffffffffffffffffffffffffff167f9372649c816518b6dd0e3219cab061348a01565efb5c6c31efa3e18fd904867d612074565b6000805491925090610c849073ffffffffffffffffffffffffffffffffffffffff167f3fb4cb24943777045ea171f25676e53c604e34fef364bc21b495fbad4a7e79a1612074565b9050600085600081518110610c9b57610c9b612bbe565b602002602001015190506107978484600a601486866122f8565b7fcd4c83c6e4baad660288e899134b848be43d250ebe563a35a7440fe6f9420da160001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c91684600081518110610d0c57610d0c612bbe565b60200260200101516040518263ffffffff1660e01b8152600401610d3291815260200190565b602060405180830381865afa158015610d4f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d739190612bed565b03610e045760008054610dbc9073ffffffffffffffffffffffffffffffffffffffff167f34cf43ef8ad03ea44a2ba9f6195982a9d85c9ab53eeb2c4312d2e7bbe42e007d612074565b60008054919250906108ef9073ffffffffffffffffffffffffffffffffffffffff167f0295352aba65a139b64bea22713672641830e824d7f6ed5f7b29cdf31b7f5159612074565b7fbf16ee459ff450e19286f18a5254f689662eba512e1106efa83ea886d6e8821c60001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c91684600081518110610e5b57610e5b612bbe565b60200260200101516040518263ffffffff1660e01b8152600401610e8191815260200190565b602060405180830381865afa158015610e9e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ec29190612bed565b03610fcc5760008054610f0b9073ffffffffffffffffffffffffffffffffffffffff167f0295352aba65a139b64bea22713672641830e824d7f6ed5f7b29cdf31b7f5159612074565b6000805491925090610f539073ffffffffffffffffffffffffffffffffffffffff167f63918f516a057e384eaf1858a0b60cb81d0c2696ec79602dda05ad1057c9562c612074565b6000805491925090610f9b9073ffffffffffffffffffffffffffffffffffffffff167f8ffb3ea5426544cc2974f7b2a963e8b36d1136a295fe59e4713c00881cc1e288612074565b9050600085600081518110610fb257610fb2612bbe565b602002602001015190506107978484600a600286866122f8565b7fd8a643fa318db8acc88940eb9acac255a3e4f548e97580eb7f2ddde0b5cb611660001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168460008151811061102357611023612bbe565b60200260200101516040518263ffffffff1660e01b815260040161104991815260200190565b602060405180830381865afa158015611066573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061108a9190612bed565b0361119457600080546110d39073ffffffffffffffffffffffffffffffffffffffff167f0295352aba65a139b64bea22713672641830e824d7f6ed5f7b29cdf31b7f5159612074565b600080549192509061111b9073ffffffffffffffffffffffffffffffffffffffff167f8ffb3ea5426544cc2974f7b2a963e8b36d1136a295fe59e4713c00881cc1e288612074565b60008054919250906111639073ffffffffffffffffffffffffffffffffffffffff167ff3c7430dad85a0ed77db5ddb335fbdcc763b5f0283a40a84786569af59e95cfe612074565b905060008560008151811061117a5761117a612bbe565b6020026020010151905061079784846014600586866122f8565b7ff9c605cb8149d0ae8a5d9cd09945aec188d2a15377677572b521bfb0be5c80ed60001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106111eb576111eb612bbe565b60200260200101516040518263ffffffff1660e01b815260040161121191815260200190565b602060405180830381865afa15801561122e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112529190612bed565b0361132b576000805461129b9073ffffffffffffffffffffffffffffffffffffffff167ff3c7430dad85a0ed77db5ddb335fbdcc763b5f0283a40a84786569af59e95cfe612074565b60008054919250906112e39073ffffffffffffffffffffffffffffffffffffffff167f3fb4cb24943777045ea171f25676e53c604e34fef364bc21b495fbad4a7e79a1612074565b60008054919250906107679073ffffffffffffffffffffffffffffffffffffffff167f07287d2aeacf66eb7d9855979cb9ec53bafe8819b3168616167659c1087cbe82612074565b7f4250341db0b18fc0ae00a738f16aeb77fe5059ea1e4098b78488b807d408d56e60001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168460008151811061138257611382612bbe565b60200260200101516040518263ffffffff1660e01b81526004016113a891815260200190565b602060405180830381865afa1580156113c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113e99190612bed565b0361147a57600080546114329073ffffffffffffffffffffffffffffffffffffffff167fbf38348b83d45b84f2b57fbdae696c9e53672fb7174959806fdd3336470fe8a4612074565b60008054919250906108ef9073ffffffffffffffffffffffffffffffffffffffff167fcc39c89142d83bc7392985df65ce41a0a8c7005e4485b37904e332d19f472aae612074565b7f13a481631ba1249ac750d2ad108f78a8c956c66fd1d62cd2c0b446a3c865bb2b60001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106114d1576114d1612bbe565b60200260200101516040518263ffffffff1660e01b81526004016114f791815260200190565b602060405180830381865afa158015611514573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115389190612bed565b036115c957600080546115819073ffffffffffffffffffffffffffffffffffffffff167f500b89d0d42372bc30164776b7f73c7b40c7739be2ff6847390b50a6df30ef04612074565b60008054919250906108ef9073ffffffffffffffffffffffffffffffffffffffff167f6be232756bbf00c33eabc74acda1c3360a8711ebd2ea6daadf7c63a4b074d504612074565b7f32e6f87aceaa4c2d319159525e4fac7cd17c3e4ceede167599303bd1d5f7729e60001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168460008151811061162057611620612bbe565b60200260200101516040518263ffffffff1660e01b815260040161164691815260200190565b602060405180830381865afa158015611663573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116879190612bed565b0361179157600080546116d09073ffffffffffffffffffffffffffffffffffffffff167f6be232756bbf00c33eabc74acda1c3360a8711ebd2ea6daadf7c63a4b074d504612074565b60008054919250906117189073ffffffffffffffffffffffffffffffffffffffff167fcc39c89142d83bc7392985df65ce41a0a8c7005e4485b37904e332d19f472aae612074565b60008054919250906117609073ffffffffffffffffffffffffffffffffffffffff167ff5a0458017f3fa66c591b128df9a165121194030456baa8b1adcf1a6e9602a09612074565b905060008560008151811061177757611777612bbe565b6020026020010151905061079784846005600a86866122f8565b7fcfb56e2ea348454073fc6d4fe422a5963dc9b1be76c7f4e4e6bc8cfde39ad2b960001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106117e8576117e8612bbe565b60200260200101516040518263ffffffff1660e01b815260040161180e91815260200190565b602060405180830381865afa15801561182b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061184f9190612bed565b0361195957600080546118989073ffffffffffffffffffffffffffffffffffffffff167f6be232756bbf00c33eabc74acda1c3360a8711ebd2ea6daadf7c63a4b074d504612074565b60008054919250906118e09073ffffffffffffffffffffffffffffffffffffffff167f8ffb3ea5426544cc2974f7b2a963e8b36d1136a295fe59e4713c00881cc1e288612074565b60008054919250906119289073ffffffffffffffffffffffffffffffffffffffff167f68c5de33a475b7813a9f2742c6e5f771a555c65abf66d57c42d86e481ae2be82612074565b905060008560008151811061193f5761193f612bbe565b602002602001015190506107978484600a600586866122f8565b7fc29111c1b03ec36b7ed76742c49be3e45c7472f5cdc4036eb832638f3d23f5ad60001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106119b0576119b0612bbe565b60200260200101516040518263ffffffff1660e01b81526004016119d691815260200190565b602060405180830381865afa1580156119f3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a179190612bed565b03611af05760008054611a609073ffffffffffffffffffffffffffffffffffffffff167ff5a0458017f3fa66c591b128df9a165121194030456baa8b1adcf1a6e9602a09612074565b6000805491925090611aa89073ffffffffffffffffffffffffffffffffffffffff167f68c5de33a475b7813a9f2742c6e5f771a555c65abf66d57c42d86e481ae2be82612074565b60008054919250906107679073ffffffffffffffffffffffffffffffffffffffff167ff730e703f7010272dbf7d18203abbf9ca71d948effd568b95759454538d623de612074565b7f289820e95a6c3cf395995d62838f0bbba15a6ec752a76e93cb97b7987a6c693560001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c91684600081518110611b4757611b47612bbe565b60200260200101516040518263ffffffff1660e01b8152600401611b6d91815260200190565b602060405180830381865afa158015611b8a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bae9190612bed565b03611cb85760008054611bf79073ffffffffffffffffffffffffffffffffffffffff167f07287d2aeacf66eb7d9855979cb9ec53bafe8819b3168616167659c1087cbe82612074565b6000805491925090611c3f9073ffffffffffffffffffffffffffffffffffffffff167ff730e703f7010272dbf7d18203abbf9ca71d948effd568b95759454538d623de612074565b6000805491925090611c879073ffffffffffffffffffffffffffffffffffffffff167fa1b93d4f03ce40dca2cfb87e973b4740061c64542ab3297db2636aa1e59ad09e612074565b9050600085600081518110611c9e57611c9e612bbe565b602002602001015190506107978484600a600186866122f8565b7f8354814bff380a814aa9c24aa870ea78a3087fff7347465e1c0cfc24cea1013360001c846020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c91684600081518110611d0f57611d0f612bbe565b60200260200101516040518263ffffffff1660e01b8152600401611d3591815260200190565b602060405180830381865afa158015611d52573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d769190612bed565b03611e075760008054611dbf9073ffffffffffffffffffffffffffffffffffffffff167fbe8428e998d5d7c1ae38af5c80bff5ffee83321284ca39471b8a5b781a950b07612074565b60008054919250906108ef9073ffffffffffffffffffffffffffffffffffffffff167fa417599b38e6583b46336250c0829bf4923a36c4b830c503f3787ea85fb75a3c612074565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f5b437261667453797374656d5d2043616e6e6f742063726166742066726f6d2060448201527f61206e6f6e2d666163746f72792074696c65000000000000000000000000000060648201526084016103e7565b604080516000602082015201604051602081830303815290604052945050505050919050565b6000611ef57f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b6060611f3d82604051602001611f2991908151600390810b8252602092830151900b9181019190915260400190565b6040516020818303038152906040526100cf565b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314611fb3576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611fbc816126af565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa1580156120e4573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261212a9190810190612b18565b90508051600003612197576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f74207265676973746572656400000000000000000000000000000060448201526064016103e7565b6121b8816000815181106121ad576121ad612bbe565b602002602001015190565b949350505050565b6040517fcccf7a8e00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015612230573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122549190612c06565b61225f5760646122ee565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa1580156122ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122ee9190612bed565b1515949350505050565b600061230487836126b8565b9050600061231287846126b8565b9050600061232085856126b8565b9050600061232e8885612c57565b9050600061233c8885612c57565b905060008183111561234e5781612350565b825b9050600061235e8b83612c92565b9050600061236c8b84612c92565b905073ffffffffffffffffffffffffffffffffffffffff8e16631ab06ee58a612395858c612ca9565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b1580156123eb57600080fd5b505af11580156123ff573d6000803e3d6000fd5b505050508c73ffffffffffffffffffffffffffffffffffffffff16631ab06ee58a838a61242c9190612ca9565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561248257600080fd5b505af1158015612496573d6000803e3d6000fd5b505050508973ffffffffffffffffffffffffffffffffffffffff16631ab06ee58a85896124c39190612cbc565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561251957600080fd5b505af115801561252d573d6000803e3d6000fd5b505050505050505050505050505050505050565b600061254d85836126b8565b9050600061255b84846126b8565b905060006125698684612c57565b905060006125778783612c92565b905073ffffffffffffffffffffffffffffffffffffffff8816631ab06ee5866125a08488612ca9565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b1580156125f657600080fd5b505af115801561260a573d6000803e3d6000fd5b505050508573ffffffffffffffffffffffffffffffffffffffff16631ab06ee58684866126379190612cbc565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561268d57600080fd5b505af11580156126a1573d6000803e3d6000fd5b505050505050505050505050565b611fbc816127eb565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015612726573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061274a9190612c06565b6127555760006127e4565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa1580156127c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127e49190612bed565b9392505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156128e9576128e9612897565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561293657612936612897565b604052919050565b6000602080838503121561295157600080fd5b823567ffffffffffffffff8082111561296957600080fd5b818501915085601f83011261297d57600080fd5b81358181111561298f5761298f612897565b6129bf847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016128ef565b915080825286848285010111156129d557600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015612a1e57858101830151858201604001528201612a02565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b8060030b8114611fbc57600080fd5b600060408284031215612a7e57600080fd5b612a866128c6565b8235612a9181612a5d565b81526020830135612aa181612a5d565b60208201529392505050565b600060208284031215612abf57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146127e457600080fd5b600060408284031215612af557600080fd5b612afd6128c6565b8251612b0881612a5d565b81526020830151612aa181612a5d565b60006020808385031215612b2b57600080fd5b825167ffffffffffffffff80821115612b4357600080fd5b818501915085601f830112612b5757600080fd5b815181811115612b6957612b69612897565b8060051b9150612b7a8483016128ef565b8181529183018401918481019088841115612b9457600080fd5b938501935b83851015612bb257845182529385019390850190612b99565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215612bff57600080fd5b5051919050565b600060208284031215612c1857600080fd5b815180151581146127e457600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082612c8d577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b8082028115828204841417611f3d57611f3d612c28565b81810381811115611f3d57611f3d612c28565b80820180821115611f3d57611f3d612c2856fea26469706673582212205c7cc8c416822a796624aac067bb81fe521183b0971c276d111bb697328a0c6e64736f6c63430008110033";

type CraftSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CraftSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CraftSystem__factory extends ContractFactory {
  constructor(...args: CraftSystemConstructorParams) {
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
  ): Promise<CraftSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<CraftSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): CraftSystem {
    return super.attach(address) as CraftSystem;
  }
  override connect(signer: Signer): CraftSystem__factory {
    return super.connect(signer) as CraftSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CraftSystemInterface {
    return new utils.Interface(_abi) as CraftSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CraftSystem {
    return new Contract(address, _abi, signerOrProvider) as CraftSystem;
  }
}
