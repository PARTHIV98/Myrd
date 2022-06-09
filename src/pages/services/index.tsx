import Head from 'next/head';
import { Header, Footer, Hero } from '../../components';
import { client } from '../../client';
import styles from "scss/components/FlexibleComponentStyles/PortfolioSection.module.scss";
import Link from "next/link";
import Heading from "components/Heading";
import { useRouter } from 'next/router';


export default function Page() {	
  const { useQuery,usePosts, useCategory } = client;
  const { generalSettings } = useQuery();
  const serviceItems = useQuery().allService()?.nodes;
  const router= useRouter();


  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Portfolio - {generalSettings.title}</title>
      </Head>

      <Hero title="The web is our playground." bgImage="https://myriadsolutionz.com/wp-content/uploads/2019/10/work.jpg"/>

      <main className="content content-single">
      <section
        className={`${styles.portfoliosection} portfolioSection commonPadding`}
      >
        <div className="container">

          <div className="portfolio-block">
          <div className={`${styles.portfolioList}`}>
              <div className="row d-flex">
              {serviceItems.map((item, index) => {
                // console.log(item);

                const prtitmHeading = item?.title();
                const prtitmImage = item?.featuredImage?.node?.sourceUrl();

                return ( <div className={`${styles.portfolioItem} col`} key={index}>
                <div
                  className={`${styles.portfolioItemWrap}`}
                  style={{
                    backgroundImage:
                      `url(${prtitmImage})`
                  }} key={index}> 
                  <div className={`${styles.portfolioContent}`}>

                    <Heading level="h4" className={`${styles.h4}`}>
                    {prtitmHeading}
                    </Heading>


                    <Link href={String(item.uri)}>
                      <a className={`${styles.portfolioLink}`}>
                        <i className="fas fa-long-arrow-alt-right"></i>
                      </a>
                    </Link>
                  </div>
                </div> 
              </div>);
              })} 


              </div>
            </div>
        </div></div></section>
      </main>

      <Footer copyrightHolder={generalSettings.title} />
    </>
  );

}