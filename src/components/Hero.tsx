import React from 'react';
import styles from 'scss/components/Hero.module.scss';

interface Props {
  title: string;
  id?: string;
  bgImage?: string;
  buttonText?: string;
  buttonURL?: string;
  button2Text?: string;
  button2URL?: string;
  children?: React.ReactNode;
  overlayColor?:string;
}

function Hero({
  title = 'Hero Title',
  id,
  bgImage,
  buttonText,
  buttonURL,
  button2Text,
  button2URL,
  children,overlayColor
}: Props): JSX.Element {

  const getOverlayColor = () => {
    if (overlayColor) return styles[overlayColor];
    else return styles.bg_1;
  };

  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(id && { id })}
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
      className={styles.hero}>
        <div className={`${styles.overlay} ${getOverlayColor()}`}></div>
      <div className={styles.wrap}>
        <h1>{title}</h1>
        {children ? (
        <div className={styles.intro}>
          <div className={styles.children}>{children}</div>
          {buttonText && buttonURL && (
            <p>
              <a href={buttonURL} className="button">
                {buttonText}
              </a>
            </p>
          )}
          {button2Text && button2URL && (
            <p>
              <a href={button2URL} className="button button-secondary">
                {button2Text}
              </a>
            </p>
          )}
        </div> ) :""}
      </div>
    </section>
  );
}

export default Hero;
