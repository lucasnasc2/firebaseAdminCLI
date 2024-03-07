#!/bin/bash

# Get the current directory
firebaseAdminCLI_path="$PWD"

# Create the symbolic link
sudo ln -s "$firebaseAdminCLI_path/firebaseAdminCLI.sh" /usr/local/bin/firebaseAdmin
sudo ln -s "$firebaseAdminCLI_path/index.js" /usr/local/bin/firebaseAdminIndex

echo "Symbolic links created successfully."
