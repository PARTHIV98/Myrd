import Head from 'next/head';
import { Header, Footer, Hero } from '../../components';
import { client } from '../../client';
import styles from "scss/components/FlexibleComponentStyles/PortfolioSection.module.scss";
import Link from "next/link";
import Heading from "components/Heading";
import { useRouter } from 'next/router';

export default function Page() {	
  const { useQuery,usePosts, useCategory } = client;
  const { generalSettings } = client.useQuery();
  const portfolioItems = useQuery().allPortfolio()?.nodes;
  const portfolioCategories = useQuery().portfolioCategories()?.nodes;
  const router= useRouter();
  const {portfolioCatSlug} = router.query;
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
      {portfolioCategories ? (
          
          <ul className="category-link">
             <li key="show_all"><Link href="/portfolio/" key="show_all"><a className={router.pathname == "/portfolio" ? "active" : ""}>Show all</a></Link></li>
            {portfolioCategories.map((link,index) => (
            <li key={index}><Link href={link.link ?? ""}><a className={portfolioCatSlug == link.link ? "active" : ""}>{link?.name}</a></Link></li> ))}
          </ul>
              ) : "" }
      <section
        className={`${styles.portfoliosection} portfolioSection commonPadding`}
      >
        <div className="container">
          <div className="portfolio-block">
          <div className={`${styles.portfolioList}`}>
              <div className="row d-flex">
              {portfolioItems.map((item, index) => {
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
                    
                     <div className={`${styles.portfolioCategory}`}>
                    {item?.portfolioCategories()?.nodes?.map((cat,i) => {
                      return (
                        <Link href={String(cat?.link)} key={i}>
                        <a className={`${styles.categorylink}`}>
                          {cat?.name}
                        </a>
                      </Link>
                      );
                    })
                  }
                      
                    </div> 

                    <Link href={String(prtitmImage)}>
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


