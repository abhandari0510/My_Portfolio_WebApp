import config from '~/config.json';

const { name, url, linkedin } = config;
const defaultOgImage = `${url}/social-image.png`;

export function baseMeta({
  title,
  description,
  prefix = name,
  ogImage = defaultOgImage,
}) {
  const titleText = [prefix, title].filter(Boolean).join(' | ');

  return [
    { title: titleText },
    { name: 'description', content: description },
    { name: 'author', content: name },
    {
      name: 'keywords',
      content:
        'Grafana consultant, Grafana technical specialist, observability engineer, OpenTelemetry, LGTM stack, Grafana Alloy, Grafana Faro, Prometheus, Loki, Tempo, AWS DevOps engineer, Kubernetes monitoring, telemetry pipelines, Mumbai',
    },
    { name: 'robots', content: 'index, follow, max-image-preview:large' },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:alt', content: 'Banner for the site' },
    { property: 'og:image:width', content: '1280' },
    { property: 'og:image:height', content: '800' },
    { property: 'og:title', content: titleText },
    { property: 'og:site_name', content: name },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: url },
    { property: 'og:description', content: description },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:description', content: description },
    { property: 'twitter:title', content: titleText },
    { property: 'twitter:site', content: url },
    { property: 'twitter:creator', content: `https://www.linkedin.com/in/${linkedin}` },
    { property: 'twitter:image', content: ogImage },
  ];
}
