#!/bin/bash

# Get the current directory
firebaseAdminCLI_path="$PWD"

# Create the symbolic link
sudo ln -s "$firebaseAdminCLI_path/runFirebaseAdminCLI.sh" /usr/local/bin/firebaseAdmin

echo "Symbolic link created successfully."