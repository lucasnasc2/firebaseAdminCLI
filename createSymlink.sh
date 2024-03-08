#!/bin/bash

# Get the current directory
firebaseAdminCLI_path="$PWD"

# Create the file and write the content
cat <<EOT >> firebaseAdminCLI.sh
#!/bin/bash

node "$firebaseAdminCLI_path/index.js"
EOT

chmod +x firebaseAdminCLI.sh

# Create the symbolic link
sudo ln -s "$firebaseAdminCLI_path/firebaseAdminCLI.sh" /usr/local/bin/firebaseAdmin

echo "Symbolic links created successfully."
