import grafanaAlertTexture from '~/assets/grafana-alert.svg';
import grafanaDashboardTexture from '~/assets/grafana-dashboard.svg';
import jenkinsPipelineTexture from '~/assets/jenkins-pipeline.svg';
import { Button } from '~/components/button';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Model } from '~/components/model';
import { deviceModels } from '~/components/model/device-models';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useState } from 'react';
import katakana from './katakana.svg';
import styles from './project-summary.module.css';

export function ProjectSummary({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  description,
  visual,
  buttonText,
  buttonLink,
  alternate,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;
  const indexText = index < 10 ? `0${index}` : index;

  function renderDetails(visible) {
    return (
      <div className={styles.details}>
        <div aria-hidden className={styles.index}>
          <Divider
            notchWidth="64px"
            notchHeight="8px"
            collapsed={!visible}
            collapseDelay={1000}
          />
          <span className={styles.indexNumber} data-visible={visible}>
            {indexText}
          </span>
        </div>
        <Heading
          level={3}
          as="h2"
          className={styles.title}
          data-visible={visible}
          id={titleId}
        >
          {title}
        </Heading>
        <Text className={styles.description} data-visible={visible} as="p">
          {description}
        </Text>
        <div className={styles.button} data-visible={visible}>
          <Button iconHoverShift href={buttonLink} iconEnd="arrow-right">
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }

  function renderPreview(visible) {
    const isPhone = visual.device === 'phone';
    const isPipeline = visual.device === 'pipeline';
    const model = isPhone ? deviceModels.phone : deviceModels.laptop;
    const texture = isPhone
      ? {
          srcSet: `${grafanaAlertTexture} 374w`,
          placeholder: grafanaAlertTexture,
        }
      : isPipeline
        ? {
            srcSet: `${jenkinsPipelineTexture} 1280w`,
            placeholder: jenkinsPipelineTexture,
          }
      : {
          srcSet: `${grafanaDashboardTexture} 1280w`,
          placeholder: grafanaDashboardTexture,
        };

    return (
      <div
        className={styles.preview}
        data-device={visual.device}
        data-visible={visible}
      >
        <svg className={styles.katakana} aria-hidden viewBox="0 0 751 136">
          <use href={`${katakana}#katakana-project`} />
        </svg>
        <Model
          className={styles.deviceModel}
          cameraPosition={isPhone ? { x: 0, y: 0, z: 11.5 } : { x: 0, y: 0, z: 8 }}
          show={visible}
          showDelay={300}
          alt={
            isPhone
              ? 'Phone showing a Grafana alert'
              : isPipeline
                ? 'Laptop showing a Jenkins CI/CD pipeline'
                : 'Laptop showing a Grafana dashboard'
          }
          models={[
            {
              ...model,
              position: isPhone ? { x: 0, y: 0, z: 0 } : { x: 0, y: 0, z: 0 },
              texture,
            },
          ]}
        />
        <div className={styles.visualCaption}>
          <span>{visual.eyebrow}</span>
          <strong>{visual.metric}</strong>
          <span>{visual.status}</span>
        </div>
        <div className={styles.stack}>
          {visual.stack.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={sectionVisible || focused}>
          {({ visible }) => (
            <>
              {!alternate && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              )}
              {alternate && (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
}
