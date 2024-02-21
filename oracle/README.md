# Job Market Oracle: Vara Smart Contract

## Getting Started

Before you begin, ensure that you have Rust installed on your system. This is essential for running and managing the dependencies of this subproject.

## Installation

To set up contract on your local machine, follow these steps:

- Clone the repository to your local machine (if you haven't already done so).
- Navigate to the folder directory from your terminal.
- Run the following command to install all the necessary dependencies:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Or follow the offical documentation of rust.

## Deploying and Dev

To deploy this project, you will need to run:

```
cargo build --release
```

It's important to note, that this release binaries are going to be built inside "target/wasm32-unknown-unknown/release" and in case of testing and building without the release flag, it will be saved under the same path but instead of "release" it would be "debug".
To be able to generate a debug binaries, you can use:

```
cargo build
```

## Take in consideration

Make sure once the binaries are correctly generated, and you are deploying into Vara, you add the metadata into the smart contract which would be allocated aside of the binaries of the smart contract.

## Support

If you encounter any issues or have questions about this contract, please refer to the project's documentation or contact the development team for assistance.
