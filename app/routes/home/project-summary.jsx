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
    const model = deviceModels.laptop;
    const texture = isPipeline
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
        {isPhone ? (
          <PhoneDashboard />
        ) : (
          <Model
            className={styles.deviceModel}
            cameraPosition={{ x: 0, y: 0, z: 8 }}
            show={visible}
            showDelay={300}
            alt={
              isPipeline
                ? 'Laptop showing a Jenkins CI/CD pipeline'
                : 'Laptop showing a Grafana dashboard'
            }
            models={[{ ...model, position: { x: 0, y: 0, z: 0 }, texture }]}
          />
        )}
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

function PhoneDashboard() {
  const [tilt, setTilt] = useState({ x: 2, y: -9 });

  const handlePointerMove = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -14;
    setTilt({ x: y, y: x });
  };

  return (
    <div
      className={styles.phoneDashboard}
      aria-label="Interactive Grafana mobile incident dashboard"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 2, y: -9 })}
      style={{ '--phone-rotate-x': `${tilt.x}deg`, '--phone-rotate-y': `${tilt.y}deg` }}
    >
      <div className={styles.phoneSpeaker} aria-hidden />
      <div className={styles.phoneScreen}>
        <div className={styles.phoneTopline}>
          <span className={styles.phoneMark} aria-hidden />
          <span>Grafana OnCall</span>
          <span className={styles.phoneLive}>Live</span>
        </div>
        <div className={styles.phoneAlert}>
          <span>Investigating</span>
          <strong>Checkout API latency</strong>
          <small>P95 above 450 ms for 8 min</small>
        </div>
        <div className={styles.phoneMetrics}>
          <div><small>P95 latency</small><strong>482<span>ms</span></strong></div>
          <div><small>Success rate</small><strong>99.94<span>%</span></strong></div>
        </div>
        <div className={styles.phoneChart} aria-hidden>
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <div className={styles.phoneFooter}>
          <span>Tempo trace linked</span>
          <strong>View incident →</strong>
        </div>
      </div>
    </div>
  );
}
