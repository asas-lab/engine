docker login azure

docker context create aci azurecontext --subscription-id 51a1bfba-054f-4baa-a7c4-4737a4424bb4 --resource-group asas-engin

wget -O docker-compose.yaml https://raw.githubusercontent.com/argilla-io/argilla/main/docker/docker-compose.yaml && docker-compose up -d
