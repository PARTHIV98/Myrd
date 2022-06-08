import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, ServiceIdType} from 'client';
import { Footer, Header, ServicesBanner,ContentWithSidebar,FullWidthCTA,RelatedProjects} from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';


export default function Page() {

  const router= useRouter();
  const {serviceSlug} = router.query;
  const { usePosts, useQuery } = client;

  const query = useQuery();

  const movie = query.service({
    id: String(serviceSlug),
    idType: ServiceIdType.SLUG,
  })[0];
  const menuItems  = useQuery();
console.log(movie);


  const generalSettings = useQuery().generalSettings;
  const LayoutOptions = movie?.fieldLayoutOptions?.flexibleLayouts;

  return (
    <>
    <Header
      title={generalSettings.title}
      description={generalSettings.description}
    />

    <Head>
      <title>
        {movie?.title()} - {generalSettings.title}
      </title>
    </Head>

    <main className="content content-single">
    {LayoutOptions.map((Layout, index) => {
          var ComponentsName = Layout.__typename;
          var ComponentsData = Layout.$on[ComponentsName];
          if (typeof ComponentsData !== "undefined") {
           // console.log(ComponentsName);
           return (
            <div key={index}>
              {ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_ServicesBannerSection" ? (
                <ServicesBanner QueryData={ComponentsData} />
              ) : ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_ContentWithSidebar" ? (
                <ContentWithSidebar QueryData={ComponentsData} menuData={menuItems} />
              ) : ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_FullWidthCta" ? (
                <FullWidthCTA QueryData={ComponentsData} />
              ) : ComponentsName ==
              "Page_Fieldlayoutoptions_FlexibleLayouts_RelatedProjects" ? (
                <RelatedProjects QueryData={ComponentsData} />
              ) : (
                ""
              )}
              
            </div>
          );
        }
        // fallback if the component doesn't exist
return (
<p key={index}>
The component <strong>{ComponentsName}</strong> has not been created yet.
</p>
);
        })}
    </main>

    <Footer copyrightHolder={generalSettings.title} />
  </>
  );
} 
