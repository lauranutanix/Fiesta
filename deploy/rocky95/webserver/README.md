## System Info
- Validated on Rocky Linux 9.5
- 2 vCPU / 4GB RAM / 50GB disk

## Steps
1. Install MySQL
    ```
    bash install_packages.sh
    ```

1. Configure Fiesta to run as a system service
    ```
    bash install-fiesta-service.sh
    ```

1. Configure NGINX to serve the app
    ```
    bash configure-nginx.sh
    ```