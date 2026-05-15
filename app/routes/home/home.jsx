import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Grafana Observability Specialist',
    description: `${config.name} is a Grafana-focused observability specialist building telemetry pipelines, dashboards, alerts, and AWS DevOps automation for production systems.`,
  });
};

const projects = [
  {
    title: 'Project Inspire Observability',
    description:
      'Enabled front-end, container, Kubernetes, and legacy-system observability for HDFC Life with Faro, Alloy, OpenTelemetry, Loki, Tempo, Prometheus, and Grafana alerting.',
    buttonText: 'Discuss observability',
    buttonLink: '/contact',
    visual: {
      device: 'laptop',
      eyebrow: 'HDFC Life',
      metric: 'Unified RCA',
      status: 'IRM workflows live',
      stack: ['Faro', 'Alloy', 'OTel', 'Loki', 'Tempo', 'Prometheus'],
    },
  },
  {
    title: 'Cloud DevOps Automation',
    description:
      'Architected AWS infrastructure using Terraform, VPC isolation, RDS, Jenkins deployments, AMI autoscaling, SonarQube gates, and high-availability release flows.',
    buttonText: 'See my stack',
    buttonLink: '/#details',
    visual: {
      device: 'pipeline',
      eyebrow: 'AWS + CI/CD',
      metric: 'HA workloads',
      status: 'Automated deploys',
      stack: ['Terraform', 'Jenkins', 'RDS', 'ECR', 'ASG', 'SonarQube'],
    },
  },
  {
    title: 'Production Monitoring Systems',
    description:
      'Built Prometheus and Grafana monitoring for APIs, databases, Docker Swarm workloads, and security pipelines with Trivy reporting in CI/CD.',
    buttonText: 'Start a conversation',
    buttonLink: '/contact',
    visual: {
      device: 'phone',
      eyebrow: 'Monitoring',
      metric: 'Latency + resource SLOs',
      status: 'Security scans automated',
      stack: ['Docker', 'Prometheus', 'Grafana', 'Trivy', 'Nginx', 'Tomcat'],
    },
  },
];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();
  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      {projects.map((project, index) => {
        const sectionRef = [projectOne, projectTwo, projectThree][index];

        return (
          <ProjectSummary
            key={project.title}
            id={`project-${index + 1}`}
            alternate={index === 1}
            sectionRef={sectionRef}
            visible={visibleSections.includes(sectionRef.current)}
            index={index + 1}
            {...project}
          />
        );
      })}
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
