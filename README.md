** Please be patient while the chart is being deployed **

MongoDB can be accessed via port 27017 on the following DNS name from within your cluster:

    mongodb.tht.svc.cluster.local

To get the root password run:

    export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace tht mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 --decode)

To connect to your database run the following command:

    kubectl run --namespace tht mongodb-client --rm --tty -i --restart='Never' --image bitnami/mongodb --command -- mongo admin --host mongodb --authenticationDatabase admin -u root -p $MONGODB_ROOT_PASSWORD

To connect to your database from outside the cluster execute the following commands:

    kubectl port-forward --namespace tht svc/mongodb 27017:27017 &
    mongo --host 127.0.0.1 --authenticationDatabase admin -p $MONGODB_ROOT_PASSWORD

To connect to prisma server execute the following command while authenticated with kubectl:

    kubectl port-forward --nespace tht svc/prisma 4467:4466
    
Then hit 
    
    http://localhost:4467

To connect to the graphql playground execute the following command:

    kubectl port-forward --namespace tht svc/tht-api 4001:4000
    
Then hit

    http://localhost:4001
    
To connect to weave scope execute the following command:

    kubectl port-forward -n weave "$(kubectl get -n weave pod --selector=weave-scope-component=app -o jsonpath='{.items..metadata.name}')" 4040
    
Then hit

    http://localhost:4040
