import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "scss/components/Footer.module.scss";
import Image from "next/image";
import { client, MenuLocationEnum } from "client";
import Heading from "components/Heading";
import { useRouter } from "next/router";
import Cf7FormWrapper from "./FlexibleComponents/cf7-form-wrapper";

interface Props {
  copyrightHolder?: string;
}
interface Form{ 
  handler: any; 
  isLoading: Boolean;
  isSent:Boolean;
  hasError: any;
  inputData:any;
}
export const Form = function Form({ handler, isLoading, isSent, hasError }) {
  const [formState, setFormState] = useState({})

  
//   const FieldData = (item,key) => {
//    const {name,type,placeholder,value} = item;
//     const inputName = name;
//       const inputType = type;  
//       const placeh = placeholder;
//       const val = value;
//       console.log(inputName,inputType,placeh,val,key);
//     return ( (inputType == "textarea" ? (<textarea name={inputName} onChange={(e) => handleFieldChange(inputName, e)} className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"/>) : inputType == "submit" ? (<button type="submit" className="commonButton commonButtonOutlined form-submit-button">{item.values}</button>) : (<input onChange={(e) => handleFieldChange({inputName}, e)} type={`${inputType}`} placeholder={`${item.labels}`} className="outline-style"/>)))
//  }

  const handleFieldChange = (field, e) => {
  // console.log(formState[field]);
    setFormState({
      ...formState,
      [field]: e.target.value,
    })
  }

  const handleFileChange = (field, e) => {
    setFormState({
      ...formState,
      [field]: e.target.files[0],
    })
  }
  const handleFormSubmit = (e) => {
    handler(e, formState)
  }
  

  return (
<>
    <form onSubmit={handleFormSubmit} className={`${styles.websitecheckup} ${styles.siteanalysisreport}`}>

              <div className="pos-rel">
                <i className="fas fa-globe"></i>
                <input
                  className="footer-input"
                  type="text"
                  name="website-link"
                  placeholder="Website URL"
                  onChange={(e) => handleFieldChange('website-link', e)}
                />
              </div>
              <div className="pos-rel">
                <i className="fas fa-at"></i>
                <input
                  className={`${styles.footerinput} ${styles.lastinput}`}
                  type="email"
                  name="your-email"
                  placeholder="Your Email ID"
                  onChange={(e) => handleFieldChange('your-email', e)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-default form-submit-button"
              >
                <i className="fa fa-long-arrow-alt-right"></i>
              </button>
    <div className="form-status">
      {isLoading ? ( <div>{isLoading ? "Loading" : "false"}</div>): ""}
      {isSent ? ( <div className="success form-status-info">{isSent ? "Your enquiry has been received at Myriad Solutionz. We will get back to you with 2 business days. Thank you!" : "false"}</div>):""}
      {hasError ? (<div className="alert form-status-info">Please Try Again.</div>) :""}
      
      </div>
    </form>

    </>
  )
}

function Footer({ copyrightHolder = "Company Name" }: Props): JSX.Element {
  const { menuItems } = client.useQuery();
  const router = useRouter();
  const os_links = menuItems({
    where: { location: MenuLocationEnum.OUR_SERVICES },
  }).nodes;
  const footer_links = menuItems({
    where: { location: MenuLocationEnum.FOOTER },
  }).nodes;
  const year = new Date().getFullYear();

  const { useQuery } = client;
  const address = useQuery().themeGeneralSettings?.generalThemeSettings?.address;
  const emailAddress = useQuery().themeGeneralSettings?.generalThemeSettings?.emailAddress;
  const phone1 = useQuery().themeGeneralSettings?.generalThemeSettings?.phone1;
  const phone2 = useQuery().themeGeneralSettings?.generalThemeSettings?.phone2;
  const socialMediaList = useQuery().themeGeneralSettings?.generalThemeSettings?.socialMediaList;
  const logo = useQuery().themeGeneralSettings?.generalThemeSettings?.logo.sourceUrl();
  const Width = useQuery().themeGeneralSettings?.generalThemeSettings?.logo?.mediaDetails?.width;
  const height = useQuery().themeGeneralSettings?.generalThemeSettings?.logo?.mediaDetails?.height;
  const freeReportFooterFormId = useQuery().themeGeneralSettings?.generalThemeSettings?.freeReportFooterFormId;
  const footerBgImage = useQuery().themeGeneralSettings?.generalThemeSettings?.footerBgImage.sourceUrl();

  const [formInput,setFormInputs] = useState({});
  useEffect(() => {
    
    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${freeReportFooterFormId}`,{
      method:"GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFormInputs(data)})
  }, [])

  return (
    <footer
      className={`${styles.main} ${styles.mainfooter} ${router.asPath == "/contact" ? 'd-none' : ""}`}
      style={{
        backgroundImage:
          `url(${footerBgImage})`,
      }}
    >
      <div className={`${styles.footerinner} container`}>
        <div className={`${styles.footertop} d-flex`}>
          <div className={`${styles.footercolone} col`}>
            <Link href="/">
              <a className={styles.footerlogo}>
                {Width ? (<Image
                  src={logo}
                  alt="logo"
                  width={Width}
                  height={height}
                />):""}
                
              </a>
            </Link>
            {address || emailAddress || phone1 || phone2  ? (
            <ul className={styles.companyinfo}>
              {address ? (<li>
                <Link href="/">
                  <a>
                    <i className="fas fa-map-marker-alt"></i>
                    {address}
                  </a>
                </Link>
              </li>):""}
              {emailAddress ? (<li>
                <Link href={`mailto:${emailAddress}`}>
                  <a>
                    <i className="far fa-envelope"></i>{emailAddress}
                  </a>
                </Link>
              </li>):""}
              {phone1 ? (<li>
                <Link href={`tel:+${phone1.replace(/-|\s/g,"")}`}>
                  <a>
                    <i className="fas fa-headset"></i>+{phone1}
                  </a>
                </Link>
              </li>):""}
            </ul>
            ):""
}
          </div>
          <div className={`${styles.footercoltwo} col`}>
            <Heading level={"h3"} className={styles.footercoltitle}>
              Our Services
            </Heading>
            <ul className={styles.footerservicelink}>
              {os_links?.map((oslink) => (
                <li key={`${oslink.label}1`}>
                  <Link href={oslink.url ?? ""}>
                    <a
                      href={oslink.url}
                      className={oslink.url === router.pathname ? "active" : ""}
                    >
                      {oslink.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.footercolthree} col`}>
            <Heading level={"h3"} className={styles.footercoltitle}>
              Site Analysis Report
            </Heading>
            <Cf7FormWrapper url={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${freeReportFooterFormId}/feedback`}>
              <Form handler={undefined} isLoading={false} isSent={false} hasError={false} />
            </Cf7FormWrapper>
          </div>
        </div>
        <div className={`${styles.footerbottom} container`}>
          <div className="row d-flex justify-space align-center">
            <div className="col">
              {socialMediaList ? (
              <ul className={styles.socialmedia}>
                {socialMediaList.map((link,index) => (
                <li key={index}>
                  <Link href={String(link.socialLink)}>
                    <a className={styles[link.socialName]} target="_blank">
                    <i className={link.socialIcon}></i>
                    </a>
                  </Link>
                </li>
                ))}
              </ul>
              ): ""}
            </div>
            <div className="col">
              <ul className={`${styles.footermenulink} d-flex`}>
                {footer_links?.map((flink) => (
                  <li key={`${flink.label}$-menu-flink`}>
                    <Link href={flink.url ?? ""}>
                      <a
                        href={flink.url}
                        className={
                          flink.url === router.pathname ? "active" : ""
                        }
                      >
                        {flink.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={`${styles.copyright} text-center`}>
          <p className={styles.copyrighttxt}>
            {`© Copyright ${year} Myriad Solutionz | All Rights Reserved`}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
