#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NewVpcStack } from '../lib/new-vpc-stack';
import {RDSStack} from "../lib/rds-stack";


const app = new cdk.App();
const vpcStackEntity  = new NewVpcStack(app, 'NewVpcStack');

new RDSStack(app, 'RDSStack', {
    vpc: vpcStackEntity.vpc
});
app.synth();