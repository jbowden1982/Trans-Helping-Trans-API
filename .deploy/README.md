External DNS Kubernetes Service

Must create cluster user with admin binding.

    kubectl create clusterrolebinding aria-cluster-admin --clusterrole=cluster-admin --user=ariadoneright@gmail.com

gcloud iam service-accounts keys create external-dns-gcloud-credentials.json --iam-account service-account-name@project-id.iam.gserviceaccount.com
