import {App, Duration, Stack, StackProps} from "@aws-cdk/core";
import {DatabaseInstance, DatabaseInstanceEngine, StorageType} from '@aws-cdk/aws-rds';
import {ISecret, Secret} from '@aws-cdk/aws-secretsmanager';
import {InstanceClass, InstanceSize, InstanceType, Peer, SubnetType, Vpc} from "@aws-cdk/aws-ec2";


export interface RDSStackProps extends StackProps {
    vpc: Vpc;
}

export class RDSStack extends Stack {

    readonly secret: ISecret;
    readonly mySQLRDSInstance: DatabaseInstance;

    constructor(scope: App, id: string, props: RDSStackProps) {
        super(scope, id, props);

    // Authentication credentials (no needed)
    //this.secret = Secret.fromSecretAttributes(this, 'SamplePassword', {
    //   secretArn: 'arn:aws:secretsmanager:us-east-1:591155466814:secret:rds-pasword-x8nUYl',
    //});
       
    // RDS MySQL instance configuration
    // By default, the master password will be generated and stored in AWS Secrets Manager with auto-generated description
    // Refer: "https://docs.aws.amazon.com/cdk/api/latest/docs/aws-rds-readme.html"

    this.mySQLRDSInstance = new DatabaseInstance(this, 'mysql-rds-instance', {
        engine: DatabaseInstanceEngine.MYSQL,
        instanceClass: InstanceType.of(InstanceClass.T2, InstanceSize.SMALL),
        vpc: props.vpc,
        vpcPlacement: {subnetType: SubnetType.ISOLATED},
        storageEncrypted: true,
        multiAz: true,
        autoMinorVersionUpgrade: false,
        allocatedStorage: 25,
        storageType: StorageType.GP2,
        backupRetention: Duration.days(3),
        deletionProtection: false,
        masterUsername: 'Admin',
        databaseName: 'Reporting',
        //masterUserPassword: this.secret.secretValue,
        port: 3306
    });

    }
}