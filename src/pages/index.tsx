import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import { Parallax, Background } from "react-parallax";
import {
  AkasakiFeatures,
  Feature,
  FeatureList,
} from "../components/AkasakFeatures";
import { inject } from '@vercel/analytics';
inject();

import { ResponsiveBar } from "@nivo/bar";
import Typical from "react-typical";
import * as config from "./_index.config";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useMediaQuery } from "react-responsive";
import {
  WakatimeEditors,
  WakatimeFeatures,
  WakatimeLanguages,
} from "../components/WakatimeFeatures";
import { GithubFeatures } from "../components/GithubFeatures";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  useThemeConfig,
  useColorMode,
  useHideableNavbar,
  useLockBodyScroll,
  useWindowSize,
  
} from '@docusaurus/theme-common';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Zoom,
  EffectCreative,
} from "swiper";
import { useWakatimeData } from "../hooks/useWakatimeData";

SwiperCore.use([
  Zoom,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  EffectCreative,
]);

function BlurBackgroundImage(){
  const { isDarkTheme } = useColorMode();
  const anotherImgurl = isDarkTheme?"/img/indexbackground_light.jpg":"/img/indexbackground_dark.jpg";
  const imgurl = !isDarkTheme?"/img/indexbackground_light.jpg":"/img/indexbackground_dark.jpg";
  return (
      <div
        // src={isDarkTheme?"/img/indexbackground_light.jpg":"/img/indexbackground_dark.jpg"}
        // alt="background"
        style={{
          backgroundImage: `url(${imgurl})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          filter: `blur(10px) brightness(${isDarkTheme ? .7:1})`,
          transform: 'scale(1.2)',
          position: "absolute",
          zIndex: 0,
          height: "100%",
          width: '100%',
        }}
      >
        {/* Keep another image loaded */}
        <img src={anotherImgurl} alt="" style={{display: 'none'}} />
      </div>
  );
}

function HomepageBackground() {
  const { siteConfig } = useDocusaurusContext();
  const { isDarkTheme } = useColorMode();
  const [subtitlesAndDelays, setSubtitlesAndDelays] = useState(config.subtitles_and_delays);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.gametools.network/bf2042/stats/?raw=false&format_values=true&name=visualdust&platform=pc&skip_battlelog=true");
      const json = await response.json();
      const { killDeath } = json;
      // !!! DANGER !!!
      let end = Number(setInterval(function () { }, 100000));
      for (let i = 1; i <= end; i++) {
        clearInterval(i);
      }
      // !!! DANGER !!!
      setSubtitlesAndDelays([...subtitlesAndDelays, { text: `KD ${killDeath} !`, delay: 1000 }]);
    })();
  }, []);

  return (
    <header
      className={clsx("hero themedHead", styles.heroBanner)}
      style={{
        minHeight: "calc(100vh - var(--ifm-navbar-height))",
        backgroundAttachment : "fixed",
        backgroundColor: isDarkTheme ? "#4E1F7A" : "#EB8B68",
        // background: ``,
        // backgroundPosition: 'bottom',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat'
      }}
    >
      <BrowserOnly>{BlurBackgroundImage}</BrowserOnly>
      <div className="container" style={{zIndex: 1}}>
        <div className="row">
          <div
            className={clsx(
              "col",
              "col--" + config.title_width,
              styles.centerChild
            )}
            style={{
              alignSelf: "center",
              marginBottom: "50px",
              minHeight: "30em",
            }}
          >
            <p
              className={`hero__title ${styles.focusin}`}
              style={{
                textShadow: `0px 0px 2px ${isDarkTheme?"#000000":"#FFFFFF"}`,
                // animationName: "focusin",
                // animationDuration: "3s",
                // animationIterationCount: "infinite",
                // animationDirection: "alternate-reverse",
              }}
            >
              {siteConfig.title}
            </p>
            <p className="hero__subtitle">
              <Typical
                steps={subtitlesAndDelays.flatMap((x) => [
                  x.text,
                  x.delay,
                ])}
                loop={Infinity}
                wrapper="span"
              />
            </p>
            <div>
              <a
                className="button button--outline"
                style={{ 
                  border: "solid 2px",
                  // textShadow: `0px 0px 3px ${isDarkTheme?"#000000":"#FFFFFF"}`,
                }}
                href="#functionals"
                onClick={(e) => {
                  e.preventDefault();
                  const target = (e.target as HTMLElement).getAttribute("href");
                  const yLocation = (
                    document.querySelector(target) as HTMLElement
                  ).offsetTop;
                  // console.log(element)
                  window.scrollTo({
                    left: 0,
                    top: yLocation - 60,
                  });
                }}
              >
                Things Fun
              </a>
            </div>
          </div>
          <div
            className={clsx(
              "col",
              "col--" + (12 - config.title_width),
              styles.centerChild
            )}
          >
            {/* <img
              src={
                config.illustrations[
                  Math.floor(Math.random() * config.illustrations.length)
                ]
              }
              alt="Programmer"
            /> */}
            <BrowserOnly>{RandomImage}</BrowserOnly>
          </div>
        </div>
      </div>
    </header>
  );
}

function RandomImage() {
  const [loaded, setLoaded] = useState(false);
  const [imgsrc] = useState(() => config.illustrations[Math.floor(Math.random()*config.illustrations.length)]);
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  return (
    // <Carousel
    //   axis={isTabletOrMobile ? "horizontal" : "vertical"}
    //   autoPlay
    //   showArrows={false}
    //   showIndicators={false}
    //   showStatus={false}
    //   showThumbs={false}
    //   swipeable={false}
    // >
    //   {config.illustrations.map((item) => (
    //     <img key={item} src={item} />
    //   ))}
    // </Carousel>
    <img src={imgsrc}
      className={clsx(
        styles.randomImage,
        loaded && styles.loaded,
      )}
      style={{
        width:isMobile?"70%":"100%",
        alignSelf:"center"   
      }}
      onLoad={() => {
        setLoaded(true);
      }}
    />
  );
}

function WhereAndWhat() {
  return (
    <div
      className={clsx("container", "hero")}
      style={{
        height: "500px",
      }}
    >
      <div className="row" style={{ width: "inherit" }}>
        <div className="col col--7">
          <img src="/img/illustrations/worldmap.svg" alt="where am i" />
          <div style={{ textAlign: "center" }}>
            <Typical
              loop={Infinity}
              wrapper="span"
              steps={["Where am I", 1000, "CHINA!", 1000]}
            ></Typical>
          </div>
        </div>
      </div>
    </div>
  );
}

function useHidingFooter() {
  useEffect(() => {
    const footer = document.querySelector(".footer") as HTMLElement;
    const docEle = document.documentElement;
    footer.style.transition = "opacity .3s";
    footer.style.opacity = "0";

    footer.style.display = "none";

    let shown = false;
    let wheelPaused = false;

    function pauseWheel() {
      wheelPaused = true;
      setTimeout(() => {
        wheelPaused = false;
      }, 500);
    }

    const onWheel = (e: WheelEvent) => {
      if (wheelPaused) {
        e.preventDefault();
        return;
      }
      if (
        !shown &&
        docEle.scrollTop > docEle.scrollHeight - window.innerHeight - 2 &&
        e.deltaY > 0
      ) {
        e.preventDefault();
        shown = true;
        footer.style.display = "";
        footer.style.opacity = "1";
        docEle.scrollTo({
          top: docEle.scrollHeight,
          behavior: "smooth",
        });
        pauseWheel();
      }
      if (shown && e.deltaY < 0) {
        e.preventDefault();
        shown = false;
        footer.style.opacity = "0";
        docEle.scrollTo({
          top: footer.offsetTop - window.innerHeight + 1,
          behavior: "smooth",
        });
        setTimeout(() => {
          footer.style.display = "none";
        }, 500);
        pauseWheel();
      }
    };

    window.addEventListener("mousewheel", onWheel, {
      passive: false,
      capture: true,
    });
    return () => {
      window.removeEventListener("mousewheel", onWheel, false);
    };

    // let hasScrolledToMostBottom = false;
    // let hasReachedFooter = false;
    // const onScroll = function (e: Event) {
    //   if (!hasReachedFooter)
    //     setTimeout(() => {
    //       hasReachedFooter = true;
    //     }, 500);
    //   else if (
    //     docEle.scrollTop == footer.offsetTop - window.innerHeight ||
    //     docEle.scrollTop > footer.offsetTop - window.innerHeight + 100
    //   ) {
    //     if (!hasScrolledToMostBottom) {
    //       e.preventDefault();
    //       hasScrolledToMostBottom = true;
    //       footer.style.opacity = "1";
    //       docEle.scrollTo({
    //         top: footer.offsetTop,
    //         behavior: "smooth",
    //       });
    //     }
    //   }
    // };

    // window.addEventListener("scroll", onScroll);
    // return () => {
    //   window.removeEventListener("scroll", onScroll);
    // };
  }, []);
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  useHidingFooter();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Gavin Gong (aka VisualDust) and his coding life"
    >
      <HomepageBackground />
      <main
        id="functionals"
        style={{
          display: "flex",
          minHeight: "calc(100vh - var(--ifm-navbar-height))",
        }}
      >
        <BrowserOnly>{FeatureSwiper}</BrowserOnly>
        {/* <Parallax bgImage={bgimg} strength={500}>
          <div style={{ height: 500 }}>
            <GithubFeatures></GithubFeatures>
          </div>
        </Parallax> */}
        {/* <WhereAndWhat /> */}
      </main>
    </Layout>
  );
}

function FeatureSwiper(): JSX.Element {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 997 });
  const waka = useWakatimeData();
  return (
    <Swiper
      className={clsx("hero")}
      style={{ display: "flex", alignContent: "center" }}
      spaceBetween={50}
      slidesPerView={1}
      autoHeight
      autoplay={{ delay: 3000 }}
      // autoHeight={true}
      pagination={{
        dynamicBullets: true,
      }}
      navigation={true}
      keyboard={true}
      // mousewheel={true}
      effect={"cards"}
      zoom={true}
    >
      {isTabletOrMobile ? (
        <>
          {FeatureList.map((props, idx) => (
            <SwiperSlide style={{ padding: "20px" }}>
              <Feature key={idx} {...props} />
            </SwiperSlide>
          ))}
          <SwiperSlide style={{ padding: "20px" }}>
            <WakatimeLanguages data={waka} />
          </SwiperSlide>
          <SwiperSlide style={{ padding: "20px" }}>
            <WakatimeEditors data={waka} />
          </SwiperSlide>
          <SwiperSlide style={{ padding: "100px 20px" }}>
            <GithubFeatures />
          </SwiperSlide>
        </>
      ) : (
        <>
          <SwiperSlide>
            <AkasakiFeatures />
          </SwiperSlide>
          <SwiperSlide>
            <WakatimeFeatures data={waka} />
          </SwiperSlide>
          <SwiperSlide>
            <GithubFeatures />
          </SwiperSlide>
        </>
      )}
    </Swiper>
  );
}
