import { getNextStaticProps, is404 } from '@faustjs/next';
import { client, MenuLocationEnum, ServiceIdType} from 'client';
import { Footer, Header, ServicesBanner,ContentWithSidebar,FullWidthCTA,RelatedProjects} from 'components';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

export interface PostProps {
  post: any
}

export function PostComponent({ post }: PostProps) {
  const { useQuery } = client;
  const query = useQuery()
  const generalSettings = useQuery().generalSettings;
  const sLayoutOptions = post?.fieldLayoutOptions?.flexibleLayouts;
  
  return (
    <>
       <Header
          title={generalSettings.title}
          description={generalSettings.description}
        />

      <Head>
        <title>
    
        </title>
      </Head>

       <main className="content content-single">
        {sLayoutOptions?.map((Layout, index) => {
          var sComponentsName = Layout.__typename;
          var sComponentsData = Layout.$on[sComponentsName];
          if (typeof sComponentsData !== "undefined") {
           // console.log(ComponentsName);
           return (
            <div key={index}>
              {sComponentsName ==
              "Service_Fieldlayoutoptions_FlexibleLayouts_ServicesBannerSection" ? (
                <ServicesBanner QueryData={sComponentsData} />
              ) : sComponentsName ==
              "Service_Fieldlayoutoptions_FlexibleLayouts_ContentWithSidebar" ? (
                <ContentWithSidebar QueryData={sComponentsData} menuData={query} />
              ) : sComponentsName ==
              "Service_Fieldlayoutoptions_FlexibleLayouts_FullWidthCta" ? (
                <FullWidthCTA QueryData={sComponentsData} />
              ) : sComponentsName ==
              "Service_Fieldlayoutoptions_FlexibleLayouts_RelatedProjects" ? (
                <RelatedProjects QueryData={sComponentsData} />
              ) : (
                ""
              )}
              
            </div>
          );
        }
        // fallback if the component doesn't exist
return (
<p key={index}>
The component <strong>{sComponentsName}</strong> has not been created yet.
</p>
);
        })}
    </main>

    <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export default function Page() {
  const { useQuery } = client;
  const router = useRouter();

  const { serviceSlug } = router.query;

  const Servicepost = useQuery().service({
    id: String(serviceSlug),
    idType: ServiceIdType.SLUG,
  });
 
  return <PostComponent post={Servicepost} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    //notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
