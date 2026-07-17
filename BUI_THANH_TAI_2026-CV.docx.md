**BUI THANH TAI**

Senior DevOps Engineer

| ✉ thanhtai18021994@gmail.com | ☎ 0931994104 | 📍 Da Nang, Vietnam |
| :---- | :---: | ----: |

**PROFESSIONAL SUMMARY**

DevOps Engineer with 5+ years of hands-on experience managing cloud-native infrastructures on AWS and multi-cloud environments. Currently overseeing 20+ production projects on GitLab with ownership of CI/CD pipelines, Kubernetes orchestration, and observability platforms. Experienced in building EKS clusters, implementing GitOps workflows with ArgoCD, and designing OpenTelemetry-based SLO/error-budget monitoring. Familiar with integrating DevSecOps practices (SonarQube, Snyk, Trivy) into CI/CD pipelines. Proven production incident response and troubleshooting skills. Also capable of contributing to full-stack development (Java/Spring Boot, React/Next.js) when project needs arise.

**TECHNICAL SKILLS**

**Cloud Platforms:** AWS (EC2, EKS, RDS, ALB, S3, CloudFront, ElastiCache, OpenSearch, SQS, SNS, WAF, IAM, CloudWatch), GCP (GKE, Pub/Sub), Azure (AKS, DevOps), Alibaba Cloud

**Containers & Orchestration:** Docker, Docker Compose, Kubernetes (EKS, GKE, AKS), Helm Charts

**CI/CD & GitOps:** Jenkins (Shared Libraries), ArgoCD, GitLab CI, AWS CodePipeline, Azure DevOps

**IaC & Configuration:** Terraform, Ansible, Ansible \+ SSM (Windows Server), Salt Stack

**Observability:** OpenTelemetry, Prometheus, Grafana (SLO/Error Budget, Burn Rate Alerting), ELK Stack, Loki, Fluent Bit, PostHog (Self-hosted)

**Security & DevSecOps:** SonarQube (SAST), Snyk (SCA), Trivy (Container Scanning), Gitleaks, HashiCorp Vault, Azure Key Vault, AWS WAF, VPC/Security Groups, OWASP Top 10 awareness

**Data & Messaging:** MySQL, PostgreSQL, MariaDB, MongoDB, SQL Server, Redis, OpenSearch/Elasticsearch, ActiveMQ, Kafka, AWS SQS/SNS

**Languages & Frameworks:** Shell/Bash, Groovy, YAML, Java 17, Spring Boot 3.x, React 18, Next.js 14, TypeScript, Vite. Artifact repositories: Nexus, JFrog, GCP Artifact Registry

**PROFESSIONAL EXPERIENCE**

| Senior DevOps Engineer *MTL Technology* | 08/2024 – Present Da Nang, Vietnam |
| :---- | ----: |

*Lead DevOps for the organization managing 20+ active projects across GitLab, serving multiple product lines including gaming platforms, fintech, e-commerce, and internal tools.*

* Manage and operate 20+ production projects on GitLab with full CI/CD pipeline ownership using Jenkins, ArgoCD, and GitLab CI across multiple AWS accounts and environments (dev/staging/production).

* Architect and maintain AWS EKS clusters with advanced networking configurations including TargetGroupBinding for NLB sharing across namespaces, auto-scaling node groups, and cost-optimized spot instance strategies.

* Design and implement comprehensive observability stack using OpenTelemetry, Prometheus, and Grafana with SLO/error-budget dashboards and burn-rate alerting for proactive incident detection.

* Deploy and manage self-hosted services: PostHog (analytics with S3/MinIO storage), ActiveMQ, Redis clusters, OpenSearch with custom ingest pipelines and highlighting configurations.

* Identified and remediated a legacy security gap where a MySQL database on EKS was exposed via NLB (ap-northeast-1); executed recovery using binary logs and EBS snapshots, then hardened the environment with ClusterIP conversion and Security Group lockdown.

* Build and maintain Helm charts for all microservices deployments, standardizing deployment patterns across the organization.

* Automate Windows Server configuration using Ansible \+ AWS SSM for hybrid infrastructure management.

* Develop infrastructure-as-code automation with a custom aws-ops/ project featuring three-tier permission model, auto-discovery scripts, and MCP integrations (GitLab, Google Docs, DBHub for MySQL).

* Mentor junior DevOps team members, lead reviews on infrastructure and pipeline changes, and help establish CI/CD and GitOps standards across the organization.

* **Shift-Left Security:** DevSecOps pipeline integration:

  * Integrated SonarQube (SAST), Snyk (SCA), and Trivy (container image scanning) into CI/CD pipelines with automated gates for critical findings.

  * Configured Gitleaks in pre-commit hooks and CI stages to prevent secrets leakage across repositories.

  * Applied OWASP Top 10 awareness when reviewing pipeline configurations and deployment patterns.

* **Full-Stack:** Cross-functional contributions:

  * Led CRA-to-Next.js 14 migration for INFAXIA/MGA gaming platform (Web3Auth, MetaMask, WalletConnect, ethers, Redux with 14 slices, styled-components, antd v4).

  * Co-developed BibleQuiz – non-profit Vietnamese Bible quiz app (Java 17 \+ Spring Boot 3.3 \+ React 18 \+ Vite 5 \+ TypeScript, \~75 endpoints, \~30 DB tables, \~370 tests).

| DevOps Engineer *Rikkei Software* | 02/2024 – 07/2024 Da Nang, Vietnam |
| :---- | ----: |

*DevOps engineer responsible for setting up and operating multi-environment infrastructure on both on-premises and Alibaba Cloud for client projects.*

**▸ SMP**  *·  Microservice Platform · 70+ team · Java/Python/ReactJS*

*Multi-environment microservices project deployed across on-premises infrastructure and Alibaba Cloud, supporting development, testing, UAT, and production workloads.*

* Consulted and designed architectural solutions for multi-environment deployment strategies (on-prem and Alibaba Cloud).

* Provisioned and managed Kubernetes clusters, storage providers, and configured Jenkins on K8s, Nexus, SonarQube, ArgoCD, Prometheus, Grafana, and ELK stack.

* Authored Dockerfiles for all services and created standardized Helm charts for Kubernetes deployments.

* Set up MongoDB replica sets on VMs, MySQL databases, and Alibaba Container Kubernetes with GitLab CI pipelines.

* Developed Jenkins shared libraries to standardize build/deploy workflows across the 70+ member team.

| DevOps Engineer *Synodus* | 12/2022 – 01/2024 Ha Noi, Vietnam (Onsite) |
| :---- | ----: |

*DevOps engineer supporting multiple concurrent client projects spanning blockchain, government, fintech, and logistics domains. Owned end-to-end CI/CD, cloud infrastructure (AWS / GCP / Azure), and observability stacks.*

**▸ XECA**  *·  Primary Project · Logistics Platform · 35+ garages · GCP/GKE*

*Garage management platform with 20+ microservices serving 35+ bus garages across Vietnam. Team of 35\.*

* Provisioned GKE clusters, Pub/Sub messaging, and MariaDB infrastructure using Terraform.

* Set up Jenkins on GKE with cloud agents (Linux/Windows), developed shared libraries and Helm charts for all services.

* Built end-to-end CI/CD pipelines: code scanning, image building, and ArgoCD-based deployment to GKE.

* Configured Vault for secrets management, set up DNS, Ingress controller, and backend configurations.

* Identified and resolved performance bottlenecks, achieving 20% performance improvement and 15% downtime reduction.

**▸ BANCA**  *·  Blockchain Platform · 25+ microservices · Azure/AKS*

*Blockchain microservices project with HashiCorp Vault, Kafka, Redis, and MongoDB. High-security requirements; 20-member team.*

* Architected server infrastructure and provisioned AKS clusters, PostgreSQL Flexible Server using Terraform.

* Configured HashiCorp Vault for secrets management and ArgoCD for GitOps-based deployments on AKS.

* Created Helm charts for all 25+ microservices and built CI/CD pipelines with Azure DevOps.

* Deployed full observability stack: ELK for logging, Prometheus \+ Grafana for monitoring and alerting.

* Implemented OWASP-aligned security scanning in Azure DevOps pipelines: SonarQube SAST, Snyk for dependency vulnerabilities, and container image scanning before registry push.

* Enforced network policies and pod security standards on AKS to meet blockchain compliance requirements.

**▸ CLEO**  *·  Fintech Platform · Bank/VNPAY/Momo integrations · AWS*

*High-security commercial platform with bank, VNPAY, and Momo payment integrations serving large user base. Team of 26\.*

* Designed and deployed complex AWS architectures using Terraform: EC2, ECS, Lambda, VPC, WAF, with multi-account governance via AWS Control Tower.

* Built multi-environment CI/CD pipelines using AWS CodePipeline and CodeDeploy with automated rollback strategies.

* Implemented comprehensive monitoring with CloudWatch, CloudTrail audit logging, and custom alerting for compliance.

* Managed RDS databases with automated backup/recovery strategies, Redis caching layer, and SQS/SNS messaging infrastructure.

**▸ DTC**  *·  Government · Vietnam Ministry of Finance · Windows/SharePoint*

*Government project for Vietnam's Ministry of Finance. Windows Server \+ SharePoint \+ SQL Server cluster model with high HA requirements. 15-member team.*

* Designed architectural solutions for high-security government infrastructure on Windows Server platform.

* Installed and configured SharePoint Server 2019 multi-server farm, SQL Server Always-On clusters, and IIS.

* Built Jenkins CI/CD pipelines for .NET applications with SonarQube integration and automated deployment to SharePoint/IIS.

* Developed backup/recovery procedures reducing data loss risk and improving system recovery time.

| DevOps Engineer *FPT Software* | 01/2021 – 12/2022 Da Nang, Vietnam |
| :---- | ----: |

*Large-scale US banking platform serving 200K+ customers. 150+ VMs, 100+ K8s nodes with auto-scaling (90→150 nodes). Multi-team (70+) across global locations.*

* Created Salt Stack configuration management for Zookeeper, HBase, Hadoop, Tomcat, MongoDB, Elasticsearch, and Filebeat.

* Provisioned cloud resources using Terraform across AWS and GCP environments.

* Set up and maintained technology stack: Jenkins, Nexus/JFrog, SonarQube, ELK, Prometheus, Grafana.

* Automated build/test/deploy processes with Jenkinsfiles and wrote Helm charts for Kubernetes workloads.

* Troubleshot complex production issues across EKS, WAF, SQS, SNS, ECS, and AWS networking components.

* Ensured zero-downtime during peak-hour scaling events (90 to 150+ nodes).

| Software Developer *Freelance / Various Projects* | 2019 – 2020 Da Nang, Vietnam |
| :---- | ----: |

* Developed web applications using Java, Spring Boot, Angular, and JavaScript.

* Built REST APIs and integrated with MySQL, PostgreSQL databases.

* Contributed to frontend development with HTML, CSS, JavaScript, and Bootstrap.

* Gained foundational understanding of deployment workflows that led to transition into DevOps engineering.

**EDUCATION**

| Bachelor of Engineering *Da Nang University of Science and Technology* | 2012 – 2017 Da Nang, Vietnam |
| :---- | ----: |

**CONTINUOUS LEARNING & PROFESSIONAL DEVELOPMENT**

* Currently pursuing AWS Solutions Architect – Associate and Certified Kubernetes Administrator (CKA).

* Hands-on practitioner of OpenTelemetry observability: SLO/error-budget design and burn-rate alerting strategies.

* Active adopter of AI-assisted development workflows (Claude Code, MCP integrations) for infrastructure automation.

* Applied DevSecOps practices in production pipelines (SonarQube, Snyk, Trivy, Gitleaks) with OWASP Top 10 awareness.

**KEY STRENGTHS**

* Managing 20+ concurrent production projects across AWS infrastructure with responsibility for availability, CI/CD, and observability.

* Incident response: identified and remediated a production security exposure on MySQL database, executing recovery and defense-in-depth hardening with no data loss.

* Shift-left security: integrated SAST (SonarQube), SCA (Snyk), container scanning (Trivy), and secrets detection (Gitleaks) into CI/CD pipelines.

* Standardized GitOps workflows organization-wide using ArgoCD \+ Helm chart patterns.

* Built custom infrastructure automation toolkit (aws-ops) to streamline multi-account AWS operations.

* Cross-functional contributor: shipped production code on both frontend (Next.js/React) and backend (Java/Spring Boot) projects alongside DevOps responsibilities.

**LANGUAGES**

| Vietnamese: Native | English: Intermediate — Proficient in technical reading and writing; developing verbal communication |
| :---- | :---- |

