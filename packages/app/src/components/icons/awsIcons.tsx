import React from 'react';
import S3Icon from '../icons/amazon-s3-simple-storage-service.svg';
import APIGatewayIcon from '../icons/Arch_Amazon-API-Gateway_32.svg';
import DynamoDBIcon from '../icons/Arch_Amazon-DynamoDB_32.svg';
import EC2Icon from '../icons/Arch_Amazon-EC2_32.svg';
import EC2ImageIcon from '../icons/Arch_Amazon-EC2-Image-Builder_32.svg';
import ECSIcon from '../icons/Arch_Amazon-Elastic-Container-Service_32.svg';
import EKSIcon from '../icons/Arch_Amazon-Elastic-Kubernetes-Service_32.svg';
import RDSIcon from '../icons/Arch_Amazon-RDS_32.svg';
import LambdaIcon from '../icons/Arch_AWS-Lambda_32.svg';
import EBSVolumeIcon from '../icons/Elastic Block Store.svg';
import SnapshotIcon from '../icons/Res_Amazon-Elastic-Block-Store_Snapshot_48.svg';
import VPCIcon from '../icons/Virtual-private-cloud-VPC_32.svg';


export const awsIcons: { [key: string]: React.ReactNode } = {
  s3Buckets: <img src={S3Icon} alt="S3" />,
  apiGateways: <img src={APIGatewayIcon} alt="API Gateway" />,
  databases: <img src={RDSIcon} alt="RDS" />,
  dynamoDBTables: <img src={DynamoDBIcon} alt="DynamoDB" />,
  ec2Instances: <img src={EC2Icon} alt="EC2" />,
  ebsVolumes: <img src={EBSVolumeIcon} alt="EBS Volume" />,
  ecsClusters: <img src={ECSIcon} alt="ECS" />,
  kubernetes: <img src={EKSIcon} alt="EKS" />,
  lambdas: <img src={LambdaIcon} alt="Lambda" />,
  images: <img src={EC2ImageIcon} alt="EC2 Image" />,
  snapshots: <img src={SnapshotIcon} alt="Snapshot" />,
  vpcs: <img src={VPCIcon} alt="VPC" />,
};