# default.nix
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  # Specify packages to include in the environment
  buildInputs = [
    pkgs.nodejs        # Node.js package
    pkgs.pnpm          # pnpm package manager
  ];

  # Optional: Add a shell hook to confirm the setup
  shellHook = ''
    echo "Node.js and pnpm are available in this environment."
    echo "To confirm versions, run: node --version and pnpm --version."
  '';
}
