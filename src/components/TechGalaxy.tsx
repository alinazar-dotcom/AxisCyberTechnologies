import { Brain, Blocks, Code2, Cloud, Smartphone, Layers, Shield, Database, Network, Zap, Cpu, Sparkles, TrendingUp, Activity, Globe, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// Comprehensive tech stack data matching all 12 services
const techCategories = [
  {
    id: 'ai-ml',
    name: 'AI & ML',
    fullName: 'AI & Machine Learning',
    icon: Brain,
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    description: 'Advanced AI/ML infrastructure for intelligent automation and predictive analytics',
    stats: { label: 'ML Models', value: '500+', sublabel: 'Projects', subvalue: '150+' },
    techStack: [
      { category: 'Frameworks & Libraries', techs: [
        { name: 'TensorFlow', version: '2.15+', desc: 'End-to-end ML platform' },
        { name: 'PyTorch', version: '2.1+', desc: 'Deep learning framework' },
        { name: 'scikit-learn', version: '1.4+', desc: 'Classical ML algorithms' },
        { name: 'Keras', version: '3.0+', desc: 'High-level neural networks' },
        { name: 'XGBoost', version: '2.0+', desc: 'Gradient boosting' },
        { name: 'LightGBM', version: '4.1+', desc: 'Fast gradient boosting' }
      ]},
      { category: 'LLMs & Generative AI', techs: [
        { name: 'OpenAI GPT-4', version: 'API', desc: 'Advanced language models' },
        { name: 'Anthropic Claude', version: '3+', desc: 'Constitutional AI' },
        { name: 'Hugging Face', version: 'Transformers', desc: 'Open-source LLMs' },
        { name: 'LangChain', version: '0.1+', desc: 'LLM orchestration' },
        { name: 'LlamaIndex', version: '0.9+', desc: 'Data framework for LLMs' },
        { name: 'Vertex AI', version: 'GCP', desc: 'Google ML platform' }
      ]},
      { category: 'Computer Vision', techs: [
        { name: 'OpenCV', version: '4.9+', desc: 'Computer vision library' },
        { name: 'YOLO', version: 'v8', desc: 'Object detection' },
        { name: 'MediaPipe', version: '0.10+', desc: 'ML pipelines' },
        { name: 'Detectron2', version: 'Meta', desc: 'Object detection' }
      ]},
      { category: 'MLOps & Infrastructure', techs: [
        { name: 'MLflow', version: '2.9+', desc: 'ML lifecycle management' },
        { name: 'Kubeflow', version: '1.8+', desc: 'ML on Kubernetes' },
        { name: 'Weights & Biases', version: 'Cloud', desc: 'Experiment tracking' },
        { name: 'SageMaker', version: 'AWS', desc: 'ML platform' },
        { name: 'Pinecone', version: 'Cloud', desc: 'Vector database' },
        { name: 'Weaviate', version: '1.23+', desc: 'Vector search engine' }
      ]}
    ]
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    fullName: 'Blockchain & Web3',
    icon: Blocks,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    description: 'Decentralized systems, smart contracts, and blockchain infrastructure',
    stats: { label: 'Contracts', value: '200+', sublabel: 'Networks', subvalue: '15+' },
    techStack: [
      { category: 'Smart Contract Languages', techs: [
        { name: 'Solidity', version: '0.8.24+', desc: 'EVM smart contracts' },
        { name: 'Rust', version: '1.75+', desc: 'Solana/Near development' },
        { name: 'Vyper', version: '0.4+', desc: 'Pythonic smart contracts' },
        { name: 'Move', version: 'Sui/Aptos', desc: 'Next-gen smart contracts' }
      ]},
      { category: 'Blockchain Networks', techs: [
        { name: 'Ethereum', version: 'Mainnet/L2', desc: 'Leading smart contract platform' },
        { name: 'Solana', version: 'Mainnet', desc: 'High-performance blockchain' },
        { name: 'Polygon', version: 'PoS/zkEVM', desc: 'Ethereum scaling solution' },
        { name: 'Avalanche', version: 'C-Chain', desc: 'Multi-chain platform' },
        { name: 'Arbitrum', version: 'One/Nova', desc: 'Optimistic rollup L2' },
        { name: 'Base', version: 'Coinbase L2', desc: 'Ethereum Layer 2' }
      ]},
      { category: 'Development Tools', techs: [
        { name: 'Hardhat', version: '2.19+', desc: 'Ethereum dev environment' },
        { name: 'Foundry', version: '0.2+', desc: 'Fast Solidity toolkit' },
        { name: 'Truffle Suite', version: '5.11+', desc: 'Smart contract tools' },
        { name: 'Anchor', version: '0.29+', desc: 'Solana framework' },
        { name: 'Remix IDE', version: 'Web', desc: 'Browser-based IDE' }
      ]},
      { category: 'Web3 Libraries', techs: [
        { name: 'ethers.js', version: '6.10+', desc: 'Ethereum library' },
        { name: 'web3.js', version: '4.3+', desc: 'Ethereum JavaScript API' },
        { name: 'viem', version: '2.0+', desc: 'TypeScript for Ethereum' },
        { name: 'wagmi', version: '2.2+', desc: 'React hooks for Ethereum' },
        { name: 'The Graph', version: 'Subgraphs', desc: 'Blockchain indexing' },
        { name: 'IPFS', version: 'Protocol', desc: 'Decentralized storage' },
        { name: 'Alchemy', version: 'API', desc: 'Blockchain infrastructure' },
        { name: 'Infura', version: 'API', desc: 'Ethereum node provider' }
      ]}
    ]
  },
  {
    id: 'fullstack',
    name: 'Full-Stack',
    fullName: 'Enterprise Software Engineering',
    icon: Code2,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Modern full-stack development with cutting-edge frameworks and tools',
    stats: { label: 'Applications', value: '300+', sublabel: 'Active Users', subvalue: '10M+' },
    techStack: [
      { category: 'Frontend Frameworks', techs: [
        { name: 'React', version: '18.2+', desc: 'Modern UI library' },
        { name: 'Next.js', version: '14+', desc: 'React framework with SSR/SSG' },
        { name: 'Vue.js', version: '3.4+', desc: 'Progressive JavaScript framework' },
        { name: 'Nuxt', version: '3.9+', desc: 'Vue.js framework' },
        { name: 'Svelte', version: '4.2+', desc: 'Compiled JavaScript framework' },
        { name: 'SvelteKit', version: '2.0+', desc: 'Full-stack Svelte framework' },
        { name: 'Astro', version: '4.0+', desc: 'Content-focused framework' }
      ]},
      { category: 'Backend & Runtime', techs: [
        { name: 'Node.js', version: '20 LTS', desc: 'JavaScript runtime' },
        { name: 'Bun', version: '1.0+', desc: 'Fast all-in-one JavaScript runtime' },
        { name: 'Deno', version: '1.40+', desc: 'Secure TypeScript runtime' },
        { name: 'Express.js', version: '4.18+', desc: 'Minimal web framework' },
        { name: 'Fastify', version: '4.25+', desc: 'Fast web framework' },
        { name: 'NestJS', version: '10.3+', desc: 'Enterprise Node.js framework' },
        { name: 'Python', version: '3.12+', desc: 'General-purpose language' },
        { name: 'Django', version: '5.0+', desc: 'High-level Python framework' },
        { name: 'FastAPI', version: '0.109+', desc: 'Modern async Python API' },
        { name: 'Go', version: '1.22+', desc: 'High-performance language' },
        { name: 'Rust', version: '1.75+', desc: 'Systems programming language' }
      ]},
      { category: 'Databases', techs: [
        { name: 'PostgreSQL', version: '16+', desc: 'Advanced relational database' },
        { name: 'MongoDB', version: '7.0+', desc: 'NoSQL document database' },
        { name: 'Redis', version: '7.2+', desc: 'In-memory data store' },
        { name: 'MySQL', version: '8.0+', desc: 'Popular relational database' },
        { name: 'Supabase', version: 'Cloud', desc: 'Open-source Firebase alternative' },
        { name: 'PlanetScale', version: 'Cloud', desc: 'Serverless MySQL platform' }
      ]},
      { category: 'API & Data Layer', techs: [
        { name: 'GraphQL', version: '16+', desc: 'Query language for APIs' },
        { name: 'Apollo', version: '3.8+', desc: 'GraphQL implementation' },
        { name: 'tRPC', version: '10.45+', desc: 'End-to-end type-safe APIs' },
        { name: 'Prisma', version: '5.8+', desc: 'Next-generation ORM' },
        { name: 'Drizzle', version: '0.29+', desc: 'TypeScript ORM' }
      ]},
      { category: 'Modern Tooling', techs: [
        { name: 'TypeScript', version: '5.3+', desc: 'Typed JavaScript superset' },
        { name: 'Tailwind CSS', version: '3.4+', desc: 'Utility-first CSS framework' },
        { name: 'shadcn/ui', version: 'Latest', desc: 'Re-usable components' },
        { name: 'Vite', version: '5.0+', desc: 'Next-gen build tool' },
        { name: 'Turbopack', version: 'Next.js', desc: 'Rust-powered bundler' }
      ]}
    ]
  },
  {
    id: 'cloud-devops',
    name: 'Cloud/DevOps',
    fullName: 'Cloud Infrastructure & DevOps',
    icon: Cloud,
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    description: 'Cloud-native infrastructure, automation, and deployment pipelines',
    stats: { label: 'Deployments', value: '10K+', sublabel: 'Uptime', subvalue: '99.99%' },
    techStack: [
      { category: 'Cloud Platforms', techs: [
        { name: 'AWS', version: 'Cloud', desc: 'Amazon Web Services' },
        { name: 'Google Cloud', version: 'GCP', desc: 'Google Cloud Platform' },
        { name: 'Microsoft Azure', version: 'Cloud', desc: 'Azure cloud services' },
        { name: 'DigitalOcean', version: 'Cloud', desc: 'Developer-friendly cloud' },
        { name: 'Cloudflare', version: 'Workers', desc: 'Edge computing platform' },
        { name: 'Vercel', version: 'Platform', desc: 'Frontend cloud platform' }
      ]},
      { category: 'Containers & Orchestration', techs: [
        { name: 'Docker', version: '25+', desc: 'Container platform' },
        { name: 'Kubernetes', version: '1.29+', desc: 'Container orchestration' },
        { name: 'Helm', version: '3.14+', desc: 'Kubernetes package manager' },
        { name: 'K3s', version: '1.28+', desc: 'Lightweight Kubernetes' },
        { name: 'Nomad', version: '1.7+', desc: 'Workload orchestrator' }
      ]},
      { category: 'Infrastructure as Code', techs: [
        { name: 'Terraform', version: '1.7+', desc: 'Infrastructure provisioning' },
        { name: 'Pulumi', version: '3.100+', desc: 'Modern IaC with code' },
        { name: 'AWS CDK', version: '2.120+', desc: 'Cloud Development Kit' },
        { name: 'Ansible', version: '2.16+', desc: 'Configuration management' },
        { name: 'CloudFormation', version: 'AWS', desc: 'AWS infrastructure as code' }
      ]},
      { category: 'CI/CD Pipelines', techs: [
        { name: 'GitHub Actions', version: 'Cloud', desc: 'Automated workflows' },
        { name: 'GitLab CI/CD', version: '16+', desc: 'Complete DevOps platform' },
        { name: 'Jenkins', version: '2.440+', desc: 'Automation server' },
        { name: 'CircleCI', version: 'Cloud', desc: 'Continuous integration' },
        { name: 'ArgoCD', version: '2.9+', desc: 'GitOps continuous delivery' },
        { name: 'Flux', version: '2.2+', desc: 'GitOps toolkit' }
      ]},
      { category: 'Monitoring & Observability', techs: [
        { name: 'Prometheus', version: '2.48+', desc: 'Metrics & monitoring' },
        { name: 'Grafana', version: '10.3+', desc: 'Visualization & dashboards' },
        { name: 'Datadog', version: 'Cloud', desc: 'Full-stack monitoring' },
        { name: 'New Relic', version: 'Cloud', desc: 'Application performance' },
        { name: 'ELK Stack', version: '8.12+', desc: 'Elasticsearch, Logstash, Kibana' },
        { name: 'OpenTelemetry', version: '1.22+', desc: 'Observability framework' }
      ]}
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile',
    fullName: 'Mobile & Cross-Platform',
    icon: Smartphone,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
    description: 'Native and cross-platform mobile app development for iOS & Android',
    stats: { label: 'Mobile Apps', value: '100+', sublabel: 'Downloads', subvalue: '50M+' },
    techStack: [
      { category: 'Cross-Platform', techs: [
        { name: 'React Native', version: '0.73+', desc: 'JavaScript native apps' },
        { name: 'Flutter', version: '3.16+', desc: 'Dart cross-platform framework' },
        { name: 'Expo', version: '50+', desc: 'React Native platform & tools' },
        { name: 'Capacitor', version: '5.7+', desc: 'Native web runtime' },
        { name: 'Ionic', version: '7.6+', desc: 'Hybrid mobile toolkit' }
      ]},
      { category: 'Native iOS', techs: [
        { name: 'Swift', version: '5.9+', desc: 'Modern iOS language' },
        { name: 'SwiftUI', version: 'iOS 17+', desc: 'Declarative UI framework' },
        { name: 'UIKit', version: 'Legacy', desc: 'Traditional iOS UI framework' },
        { name: 'Xcode', version: '15+', desc: 'Apple development IDE' },
        { name: 'CocoaPods', version: '1.14+', desc: 'iOS dependency manager' }
      ]},
      { category: 'Native Android', techs: [
        { name: 'Kotlin', version: '1.9+', desc: 'Modern Android language' },
        { name: 'Jetpack Compose', version: 'Latest', desc: 'Modern declarative UI' },
        { name: 'Android Studio', version: 'Latest', desc: 'Official Android IDE' },
        { name: 'Gradle', version: '8.5+', desc: 'Android build system' }
      ]},
      { category: 'Backend Services', techs: [
        { name: 'Firebase', version: 'Cloud', desc: 'Google mobile platform' },
        { name: 'Supabase', version: 'Cloud', desc: 'Open-source backend' },
        { name: 'AWS Amplify', version: 'Cloud', desc: 'AWS mobile backend' },
        { name: 'OneSignal', version: 'Cloud', desc: 'Push notifications' }
      ]},
      { category: 'State & Libraries', techs: [
        { name: 'Redux', version: '5.0+', desc: 'Predictable state container' },
        { name: 'MobX', version: '6.12+', desc: 'Simple reactive state' },
        { name: 'React Navigation', version: '6.1+', desc: 'Routing & navigation' },
        { name: 'Reanimated', version: '3.6+', desc: 'Powerful animations' }
      ]}
    ]
  },
  {
    id: 'gaming-3d',
    name: '3D/Gaming',
    fullName: '3D, WebGL & Interactive Gaming',
    icon: Layers,
    color: 'purple',
    gradient: 'from-purple-500 to-fuchsia-600',
    description: 'Immersive 3D experiences, real-time rendering, and game development',
    stats: { label: 'Games Built', value: '50+', sublabel: 'Active Users', subvalue: '5M+' },
    techStack: [
      { category: 'Game Engines', techs: [
        { name: 'Unity', version: '2023.2+', desc: 'Cross-platform game engine' },
        { name: 'Unreal Engine', version: '5.3+', desc: 'AAA game development' },
        { name: 'Godot', version: '4.2+', desc: 'Open-source game engine' },
        { name: 'Bevy', version: '0.12+', desc: 'Rust-based game engine' }
      ]},
      { category: 'WebGL & 3D Web', techs: [
        { name: 'Three.js', version: 'r160+', desc: 'JavaScript 3D library' },
        { name: 'React Three Fiber', version: '8.15+', desc: 'React renderer for Three.js' },
        { name: 'Babylon.js', version: '6.40+', desc: 'Powerful 3D engine' },
        { name: 'PlayCanvas', version: 'Latest', desc: 'WebGL game engine' },
        { name: 'PixiJS', version: '8.0+', desc: '2D rendering engine' }
      ]},
      { category: 'Graphics & Shaders', techs: [
        { name: 'GLSL', version: 'OpenGL', desc: 'OpenGL shading language' },
        { name: 'HLSL', version: 'DirectX', desc: 'High-level shader language' },
        { name: 'WebGPU', version: 'Modern', desc: 'Next-gen graphics API' },
        { name: 'ShaderToy', version: 'Community', desc: 'Shader playground' }
      ]},
      { category: '3D Modeling Tools', techs: [
        { name: 'Blender', version: '4.0+', desc: 'Open-source 3D suite' },
        { name: 'Maya', version: '2024+', desc: 'Professional 3D software' },
        { name: 'Houdini', version: '20+', desc: 'Procedural 3D animation' },
        { name: 'Substance Painter', version: '2024+', desc: '3D texture painting' }
      ]},
      { category: 'Physics & Audio', techs: [
        { name: 'Rapier', version: '0.18+', desc: '2D/3D physics engine' },
        { name: 'Cannon.js', version: '0.6+', desc: 'Physics library for web' },
        { name: 'Ammo.js', version: 'Latest', desc: 'Bullet physics port' },
        { name: 'Howler.js', version: '2.2+', desc: 'Web audio library' },
        { name: 'Tone.js', version: '14.7+', desc: 'Web Audio framework' }
      ]}
    ]
  },
  {
    id: 'security',
    name: 'Security',
    fullName: 'Cybersecurity & Compliance',
    icon: Shield,
    color: 'red',
    gradient: 'from-red-500 to-orange-600',
    description: 'Enterprise security, penetration testing, and compliance frameworks',
    stats: { label: 'Audits Done', value: '500+', sublabel: 'Compliance', subvalue: '100%' },
    techStack: [
      { category: 'Security Testing', techs: [
        { name: 'OWASP ZAP', version: '2.14+', desc: 'Security testing tool' },
        { name: 'Burp Suite', version: 'Pro', desc: 'Web security testing' },
        { name: 'Snyk', version: 'Cloud', desc: 'Developer security platform' },
        { name: 'SonarQube', version: '10.3+', desc: 'Code quality & security' },
        { name: 'Trivy', version: '0.48+', desc: 'Vulnerability scanner' }
      ]},
      { category: 'Authentication & IAM', techs: [
        { name: 'Auth0', version: 'Cloud', desc: 'Identity platform' },
        { name: 'Okta', version: 'Cloud', desc: 'Enterprise identity' },
        { name: 'Keycloak', version: '23+', desc: 'Open-source IAM' },
        { name: 'AWS Cognito', version: 'Cloud', desc: 'User authentication' },
        { name: 'OAuth 2.0', version: 'Standard', desc: 'Authorization protocol' },
        { name: 'OpenID Connect', version: 'OIDC', desc: 'Identity layer' }
      ]},
      { category: 'Secrets Management', techs: [
        { name: 'HashiCorp Vault', version: '1.15+', desc: 'Secrets management' },
        { name: 'AWS Secrets Manager', version: 'Cloud', desc: 'Rotate & manage secrets' },
        { name: 'Doppler', version: 'Cloud', desc: 'SecretOps platform' },
        { name: 'SOPS', version: '3.8+', desc: 'Encrypted configuration' }
      ]},
      { category: 'Compliance Standards', techs: [
        { name: 'ISO 27001', version: 'Standard', desc: 'Information security mgmt' },
        { name: 'SOC 2 Type II', version: 'Audit', desc: 'Security compliance' },
        { name: 'GDPR', version: 'EU Regulation', desc: 'Data protection law' },
        { name: 'HIPAA', version: 'Healthcare', desc: 'Health data security' },
        { name: 'PCI DSS', version: '4.0', desc: 'Payment card security' }
      ]},
      { category: 'Network Security', techs: [
        { name: 'Cloudflare WAF', version: 'Cloud', desc: 'Web application firewall' },
        { name: 'Fail2ban', version: '1.0+', desc: 'Intrusion prevention' },
        { name: 'ModSecurity', version: '3.0+', desc: 'WAF engine' },
        { name: 'Wireshark', version: '4.2+', desc: 'Network protocol analyzer' }
      ]}
    ]
  },
  {
    id: 'data',
    name: 'Data Eng',
    fullName: 'Data Engineering & Analytics',
    icon: Database,
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-600',
    description: 'Big data processing, ETL pipelines, and business intelligence',
    stats: { label: 'Data Pipelines', value: '200+', sublabel: 'Data Processed', subvalue: '100PB+' },
    techStack: [
      { category: 'Data Warehouses', techs: [
        { name: 'Snowflake', version: 'Cloud', desc: 'Cloud data platform' },
        { name: 'BigQuery', version: 'GCP', desc: 'Serverless data warehouse' },
        { name: 'Redshift', version: 'AWS', desc: 'Cloud data warehouse' },
        { name: 'Databricks', version: 'Cloud', desc: 'Lakehouse platform' },
        { name: 'ClickHouse', version: '23.12+', desc: 'OLAP database' }
      ]},
      { category: 'Big Data Processing', techs: [
        { name: 'Apache Spark', version: '3.5+', desc: 'Distributed computing' },
        { name: 'Apache Flink', version: '1.18+', desc: 'Stream processing' },
        { name: 'Apache Kafka', version: '3.6+', desc: 'Event streaming platform' },
        { name: 'Apache Airflow', version: '2.8+', desc: 'Workflow orchestration' },
        { name: 'Prefect', version: '2.14+', desc: 'Modern data workflows' },
        { name: 'Dagster', version: '1.6+', desc: 'Data orchestration' }
      ]},
      { category: 'ETL & Transformation', techs: [
        { name: 'dbt', version: '1.7+', desc: 'Data build tool' },
        { name: 'Airbyte', version: '0.50+', desc: 'Data integration platform' },
        { name: 'Fivetran', version: 'Cloud', desc: 'Automated data integration' },
        { name: 'Talend', version: '8.0+', desc: 'Data integration suite' }
      ]},
      { category: 'Analytics & BI', techs: [
        { name: 'Tableau', version: '2023.3+', desc: 'Visual analytics platform' },
        { name: 'Power BI', version: 'Cloud', desc: 'Microsoft business intelligence' },
        { name: 'Looker', version: 'Cloud', desc: 'Data exploration platform' },
        { name: 'Metabase', version: '0.48+', desc: 'Open-source BI' },
        { name: 'Apache Superset', version: '3.1+', desc: 'Modern data exploration' }
      ]},
      { category: 'Data Quality', techs: [
        { name: 'Great Expectations', version: '0.18+', desc: 'Data validation' },
        { name: 'Monte Carlo', version: 'Cloud', desc: 'Data observability' },
        { name: 'Apache Atlas', version: '2.3+', desc: 'Data governance' },
        { name: 'Amundsen', version: '4.3+', desc: 'Data discovery' }
      ]}
    ]
  },
  {
    id: 'api',
    name: 'API/Integration',
    fullName: 'API Development & Integration',
    icon: Network,
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-600',
    description: 'RESTful APIs, GraphQL, microservices, and system integrations',
    stats: { label: 'APIs Built', value: '1K+', sublabel: 'Daily Requests', subvalue: '1B+' },
    techStack: [
      { category: 'API Technologies', techs: [
        { name: 'REST', version: 'Standard', desc: 'RESTful API architecture' },
        { name: 'GraphQL', version: '16+', desc: 'Query language for APIs' },
        { name: 'gRPC', version: '1.60+', desc: 'High-performance RPC' },
        { name: 'WebSocket', version: 'RFC 6455', desc: 'Real-time bidirectional' },
        { name: 'tRPC', version: '10.45+', desc: 'End-to-end type safety' },
        { name: 'Server-Sent Events', version: 'SSE', desc: 'Server push technology' }
      ]},
      { category: 'API Gateways', techs: [
        { name: 'Kong', version: '3.5+', desc: 'Cloud-native API gateway' },
        { name: 'AWS API Gateway', version: 'Cloud', desc: 'Managed API gateway' },
        { name: 'Apigee', version: 'Google', desc: 'Full lifecycle API mgmt' },
        { name: 'Tyk', version: '5.2+', desc: 'Open-source gateway' },
        { name: 'NGINX', version: '1.25+', desc: 'Reverse proxy & gateway' }
      ]},
      { category: 'API Documentation', techs: [
        { name: 'OpenAPI 3.1', version: 'Spec', desc: 'API specification standard' },
        { name: 'Swagger UI', version: '5.10+', desc: 'API documentation' },
        { name: 'Postman', version: 'Cloud', desc: 'API development platform' },
        { name: 'Insomnia', version: '2023.9+', desc: 'API client & design' },
        { name: 'Redoc', version: '2.1+', desc: 'OpenAPI documentation' }
      ]},
      { category: 'Integration Platforms', techs: [
        { name: 'Zapier', version: 'Cloud', desc: 'Workflow automation' },
        { name: 'Make (Integromat)', version: 'Cloud', desc: 'Visual automation' },
        { name: 'n8n', version: '1.21+', desc: 'Fair-code automation' },
        { name: 'Apache Camel', version: '4.3+', desc: 'Integration framework' }
      ]},
      { category: 'Message Queues', techs: [
        { name: 'RabbitMQ', version: '3.12+', desc: 'Message broker' },
        { name: 'Apache Kafka', version: '3.6+', desc: 'Distributed streaming' },
        { name: 'Redis Streams', version: '7.2+', desc: 'Stream processing' },
        { name: 'AWS SQS', version: 'Cloud', desc: 'Message queuing service' },
        { name: 'NATS', version: '2.10+', desc: 'Cloud-native messaging' }
      ]}
    ]
  },
  {
    id: 'performance',
    name: 'Performance',
    fullName: 'Performance Optimization',
    icon: Zap,
    color: 'yellow',
    gradient: 'from-yellow-500 to-amber-600',
    description: 'Speed optimization, caching strategies, and performance monitoring',
    stats: { label: 'Sites Optimized', value: '500+', sublabel: 'Avg Speedup', subvalue: '10x' },
    techStack: [
      { category: 'Caching Solutions', techs: [
        { name: 'Redis', version: '7.2+', desc: 'In-memory data structure' },
        { name: 'Memcached', version: '1.6+', desc: 'Distributed memory caching' },
        { name: 'Varnish', version: '7.4+', desc: 'HTTP accelerator' },
        { name: 'Cloudflare CDN', version: 'Cloud', desc: 'Global content delivery' },
        { name: 'Fastly', version: 'Cloud', desc: 'Edge cloud platform' }
      ]},
      { category: 'Performance Testing', techs: [
        { name: 'k6', version: '0.48+', desc: 'Modern load testing' },
        { name: 'Apache JMeter', version: '5.6+', desc: 'Performance testing' },
        { name: 'Gatling', version: '3.10+', desc: 'Load testing tool' },
        { name: 'Locust', version: '2.20+', desc: 'Python load testing' },
        { name: 'Artillery', version: '2.0+', desc: 'Cloud-scale testing' }
      ]},
      { category: 'Frontend Performance', techs: [
        { name: 'Lighthouse', version: 'Chrome', desc: 'Web performance audits' },
        { name: 'WebPageTest', version: 'Cloud', desc: 'Website performance' },
        { name: 'Bundle Analyzer', version: 'Tool', desc: 'JavaScript bundle analysis' },
        { name: 'Next.js Image', version: 'Built-in', desc: 'Automatic image optimization' },
        { name: 'Turbopack', version: 'Beta', desc: 'Rust-powered bundler' }
      ]},
      { category: 'APM & Monitoring', techs: [
        { name: 'New Relic', version: 'Cloud', desc: 'Application monitoring' },
        { name: 'Datadog APM', version: 'Cloud', desc: 'Performance monitoring' },
        { name: 'Dynatrace', version: 'Cloud', desc: 'Software intelligence' },
        { name: 'Sentry', version: 'Cloud', desc: 'Error tracking & monitoring' },
        { name: 'LogRocket', version: 'Cloud', desc: 'Frontend monitoring' }
      ]},
      { category: 'Database Optimization', techs: [
        { name: 'Query Optimization', version: 'PostgreSQL', desc: 'EXPLAIN & ANALYZE' },
        { name: 'PgBouncer', version: '1.21+', desc: 'Connection pooling' },
        { name: 'ProxySQL', version: '2.5+', desc: 'MySQL load balancer' },
        { name: 'Percona Toolkit', version: 'Latest', desc: 'MySQL tools' }
      ]}
    ]
  },
  {
    id: 'iot',
    name: 'IoT/Edge',
    fullName: 'IoT & Edge Computing',
    icon: Cpu,
    color: 'indigo',
    gradient: 'from-indigo-500 to-purple-600',
    description: 'Connected devices, edge computing, and real-time IoT solutions',
    stats: { label: 'Devices Connected', value: '1M+', sublabel: 'Daily Messages', subvalue: '100M+' },
    techStack: [
      { category: 'IoT Platforms', techs: [
        { name: 'AWS IoT Core', version: 'Cloud', desc: 'IoT connectivity & mgmt' },
        { name: 'Azure IoT Hub', version: 'Cloud', desc: 'IoT messaging hub' },
        { name: 'Google Cloud IoT', version: 'GCP', desc: 'IoT device management' },
        { name: 'ThingsBoard', version: '3.6+', desc: 'Open-source IoT platform' },
        { name: 'Particle', version: 'Cloud', desc: 'IoT device platform' }
      ]},
      { category: 'IoT Protocols', techs: [
        { name: 'MQTT', version: '5.0', desc: 'Lightweight messaging' },
        { name: 'CoAP', version: 'RFC 7252', desc: 'Constrained app protocol' },
        { name: 'LoRaWAN', version: '1.1', desc: 'Long-range wide area' },
        { name: 'Zigbee', version: '3.0', desc: 'Low-power mesh network' },
        { name: 'BLE', version: '5.4', desc: 'Bluetooth Low Energy' }
      ]},
      { category: 'Edge Computing', techs: [
        { name: 'K3s', version: '1.28+', desc: 'Lightweight Kubernetes' },
        { name: 'AWS Greengrass', version: '2.0+', desc: 'Edge runtime & cloud' },
        { name: 'Azure IoT Edge', version: 'Cloud', desc: 'Edge computing service' },
        { name: 'EdgeX Foundry', version: '3.1+', desc: 'Open IoT edge platform' }
      ]},
      { category: 'Time-Series Databases', techs: [
        { name: 'InfluxDB', version: '2.7+', desc: 'Time-series database' },
        { name: 'TimescaleDB', version: '2.13+', desc: 'PostgreSQL for time-series' },
        { name: 'QuestDB', version: '7.3+', desc: 'Fast time-series SQL' },
        { name: 'Prometheus', version: '2.48+', desc: 'Monitoring & time-series' }
      ]},
      { category: 'Visualization & Control', techs: [
        { name: 'Grafana', version: '10.3+', desc: 'Observability dashboards' },
        { name: 'Node-RED', version: '3.1+', desc: 'Flow-based programming' },
        { name: 'Home Assistant', version: '2024.1+', desc: 'Smart home automation' },
        { name: 'Telegraf', version: '1.29+', desc: 'Server agent for metrics' }
      ]}
    ]
  },
  {
    id: 'product-ux',
    name: 'Product/UX',
    fullName: 'Product Strategy & UX Design',
    icon: Sparkles,
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    description: 'User research, product design, prototyping, and analytics',
    stats: { label: 'Products', value: '150+', sublabel: 'Avg NPS Score', subvalue: '85+' },
    techStack: [
      { category: 'Design Tools', techs: [
        { name: 'Figma', version: 'Cloud', desc: 'Collaborative design platform' },
        { name: 'Sketch', version: '100+', desc: 'Digital design toolkit' },
        { name: 'Adobe XD', version: 'Cloud', desc: 'UX/UI design solution' },
        { name: 'Framer', version: 'Cloud', desc: 'Interactive design tool' },
        { name: 'Penpot', version: '2.0+', desc: 'Open-source design' }
      ]},
      { category: 'Prototyping & Animation', techs: [
        { name: 'ProtoPie', version: '7.0+', desc: 'High-fidelity prototyping' },
        { name: 'Principle', version: '6.30+', desc: 'Animated design tool' },
        { name: 'Lottie', version: 'Bodymovin', desc: 'Animation library' },
        { name: 'Rive', version: '2.0+', desc: 'Real-time interactive design' }
      ]},
      { category: 'User Research', techs: [
        { name: 'UserTesting', version: 'Cloud', desc: 'Human insight platform' },
        { name: 'Maze', version: 'Cloud', desc: 'Rapid product research' },
        { name: 'Hotjar', version: 'Cloud', desc: 'Behavior analytics' },
        { name: 'Optimal Workshop', version: 'Cloud', desc: 'UX research platform' }
      ]},
      { category: 'Product Analytics', techs: [
        { name: 'Mixpanel', version: 'Cloud', desc: 'Product analytics platform' },
        { name: 'Amplitude', version: 'Cloud', desc: 'Digital analytics' },
        { name: 'Segment', version: 'Cloud', desc: 'Customer data platform' },
        { name: 'PostHog', version: 'Cloud', desc: 'Open-source analytics' },
        { name: 'Google Analytics', version: 'GA4', desc: 'Web & app analytics' }
      ]},
      { category: 'Design Systems', techs: [
        { name: 'Storybook', version: '7.6+', desc: 'UI component development' },
        { name: 'Chromatic', version: 'Cloud', desc: 'Visual testing & review' },
        { name: 'Zeroheight', version: 'Cloud', desc: 'Design documentation' },
        { name: 'Supernova', version: 'Cloud', desc: 'Design system platform' }
      ]},
      { category: 'Collaboration', techs: [
        { name: 'Miro', version: 'Cloud', desc: 'Visual collaboration' },
        { name: 'FigJam', version: 'Figma', desc: 'Online whiteboard' },
        { name: 'Notion', version: 'Cloud', desc: 'Connected workspace' },
        { name: 'Linear', version: 'Cloud', desc: 'Issue tracking' }
      ]}
    ]
  }
];

export function TechGalaxy() {
  const [selectedCategory, setSelectedCategory] = useState('ai-ml');

  const currentTech = techCategories.find(cat => cat.id === selectedCategory)!;
  const Icon = currentTech.icon;

  const colorMap: any = {
    violet: { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/10', glow: 'rgba(139,92,246,0.3)' },
    cyan: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'rgba(6,182,212,0.3)' },
    emerald: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'rgba(16,185,129,0.3)' },
    blue: { border: 'border-blue-500/30', text: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'rgba(59,130,246,0.3)' },
    pink: { border: 'border-pink-500/30', text: 'text-pink-400', bg: 'bg-pink-500/10', glow: 'rgba(236,72,153,0.3)' },
    purple: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'rgba(168,85,247,0.3)' },
    red: { border: 'border-red-500/30', text: 'text-red-400', bg: 'bg-red-500/10', glow: 'rgba(239,68,68,0.3)' },
    amber: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10', glow: 'rgba(245,158,11,0.3)' },
    teal: { border: 'border-teal-500/30', text: 'text-teal-400', bg: 'bg-teal-500/10', glow: 'rgba(20,184,166,0.3)' },
    yellow: { border: 'border-yellow-500/30', text: 'text-yellow-400', bg: 'bg-yellow-500/10', glow: 'rgba(234,179,8,0.3)' },
    indigo: { border: 'border-indigo-500/30', text: 'text-indigo-400', bg: 'bg-indigo-500/10', glow: 'rgba(99,102,241,0.3)' },
    rose: { border: 'border-rose-500/30', text: 'text-rose-400', bg: 'bg-rose-500/10', glow: 'rgba(244,63,94,0.3)' }
  };

  const colors = colorMap[currentTech.color];
  const totalTechs = currentTech.techStack.reduce((acc, cat) => acc + cat.techs.length, 0);

  return (
    <section id="tech-stack" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-[#0A0A14] via-[#0D0D1A] to-[#0A0A14] relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/6 to-transparent rounded-full blur-[140px] animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/6 to-transparent rounded-full blur-[140px] animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}}></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.015)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40"></div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-emerald-500/10 border border-violet-500/20 rounded-full backdrop-blur-md mb-6">
            <Cpu className="w-4 h-4 text-violet-400" />
            <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">Technology Arsenal</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Enterprise-Grade{' '}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed">
            293 cutting-edge technologies across 12 domains powering world-class solutions
          </p>
        </div>

        {/* Category Tabs - Grid Layout */}
        <div className="mb-12 md:mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {techCategories.map((category) => {
              const CategoryIcon = category.icon;
              const isActive = selectedCategory === category.id;
              const catColors = colorMap[category.color];
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative p-4 md:p-5 border-2 rounded-xl transition-all duration-500 cursor-pointer ${ 
                    isActive 
                      ? `${catColors.bg} ${catColors.border} scale-105 shadow-2xl` 
                      : `bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12] hover:scale-102`
                  }`}
                  style={{
                    boxShadow: isActive ? `0 10px 40px ${catColors.glow}` : 'none'
                  }}
                >
                  {/* Glow effect */}
                  {isActive && (
                    <div className={`absolute -inset-1 bg-gradient-to-br ${category.gradient} opacity-20 blur-xl rounded-xl`}></div>
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center ${isActive ? 'scale-110' : 'group-hover:scale-105'} transition-transform duration-300`}>
                      <CategoryIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'} transition-colors duration-300`}>
                        {category.name}
                      </div>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className={`w-2 h-2 rounded-full ${catColors.bg} border-2 ${catColors.border} animate-pulse`}></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 md:space-y-10">
          {/* Category Header Card */}
          <div 
            className={`relative p-6 md:p-8 lg:p-10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] border-2 ${colors.border} rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-700`}
            style={{
              boxShadow: `0 20px 60px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
            }}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentTech.gradient} opacity-5`}></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              {/* Left - Icon & Info */}
              <div className="lg:col-span-8 flex items-start gap-6">
                <div className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${currentTech.gradient} flex items-center justify-center shadow-2xl`}>
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${colors.text} mb-2`}>
                      {currentTech.fullName}
                    </h3>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">
                      {currentTech.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bg} border ${colors.border} rounded-lg`}>
                      <TrendingUp className={`w-4 h-4 ${colors.text}`} />
                      <span className={`text-sm font-bold ${colors.text}`}>{totalTechs} Technologies</span>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bg} border ${colors.border} rounded-lg`}>
                      <Activity className={`w-4 h-4 ${colors.text}`} />
                      <span className={`text-sm font-bold ${colors.text}`}>Production Ready</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right - Stats */}
              <div className="lg:col-span-4">
                <div className={`grid grid-cols-2 gap-4 p-5 bg-white/[0.02] border ${colors.border} rounded-xl backdrop-blur-sm`}>
                  <div className="text-center">
                    <div className={`text-3xl md:text-4xl font-black ${colors.text} mb-1`}>
                      {currentTech.stats.value}
                    </div>
                    <div className="text-xs text-white/60 uppercase tracking-wide font-semibold">
                      {currentTech.stats.label}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl md:text-4xl font-black ${colors.text} mb-1`}>
                      {currentTech.stats.subvalue}
                    </div>
                    <div className="text-xs text-white/60 uppercase tracking-wide font-semibold">
                      {currentTech.stats.sublabel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Grid */}
          <div className="space-y-8">
            {currentTech.techStack.map((stackCategory, catIndex) => (
              <div key={catIndex} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                  <div className={`w-2 h-2 rounded-full ${colors.bg} border-2 ${colors.border}`}></div>
                  <h4 className="text-lg md:text-xl font-bold text-white">
                    {stackCategory.category}
                  </h4>
                  <div className={`ml-auto px-3 py-1 ${colors.bg} border ${colors.border} rounded-lg text-xs font-bold ${colors.text}`}>
                    {stackCategory.techs.length} tools
                  </div>
                </div>
                
                {/* Tech Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stackCategory.techs.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className={`group relative p-5 bg-white/[0.02] border ${colors.border} rounded-xl hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
                      style={{
                        animation: 'fadeInUp 0.6s ease-out forwards',
                        animationDelay: `${techIndex * 0.05}s`,
                        opacity: 0
                      }}
                    >
                      {/* Hover glow */}
                      <div className={`absolute -inset-[1px] bg-gradient-to-br ${currentTech.gradient} opacity-0 group-hover:opacity-10 blur-xl rounded-xl transition-opacity duration-300`}></div>
                      
                      <div className="relative z-10 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <h5 className="text-base font-bold text-white group-hover:text-white transition-colors duration-300 flex-1">
                            {tech.name}
                          </h5>
                          <div className={`flex-shrink-0 px-2 py-1 ${colors.bg} border ${colors.border} rounded text-xs font-semibold ${colors.text}`}>
                            {tech.version}
                          </div>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/75 transition-colors duration-300">
                          {tech.desc}
                        </p>
                      </div>
                      
                      {/* Status dot */}
                      <div className={`absolute bottom-3 right-3 w-2 h-2 rounded-full ${colors.bg} opacity-60 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300`}></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={`text-center p-8 md:p-10 bg-gradient-to-r ${currentTech.gradient} bg-opacity-5 border-2 ${colors.border} rounded-2xl backdrop-blur-sm`}>
            <Globe className={`w-12 h-12 ${colors.text} mx-auto mb-4`} />
            <h4 className="text-xl md:text-2xl font-bold text-white mb-3">
              Ready to leverage {currentTech.fullName}?
            </h4>
            <p className="text-sm md:text-base text-white/70 mb-6 max-w-2xl mx-auto">
              Our expert team has deep experience across all these technologies. Let's build something amazing together.
            </p>
            <a 
              href="#contact"
              className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${currentTech.gradient} text-white font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-2xl`}
              style={{
                boxShadow: `0 10px 40px ${colors.glow}`
              }}
            >
              <Sparkles className="w-5 h-5" />
              Start Your Project
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}